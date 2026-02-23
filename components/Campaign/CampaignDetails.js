import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useAccount, useContractRead } from "wagmi";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { useContract } from "../../hooks/useContract";
import { getFromIPFS } from "../../utils/ipfs";
import {
  formatEther,
  formatAddress,
  calculateTimeLeft,
  calculateProgress,
  formatDate,
  copyToClipboard,
} from "../../utils/helpers";
import { CONTRACT_ADDRESS } from "../../constants";
import { CROWDFUNDING_ABI } from "../../constants/abi";

export default function CampaignDetails({ campaignId }) {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  const {
    useCampaign,
    useCampaignStats,
    useContributeToCampaignSimple,
    useWithdrawFunds,
    useGetRefund,
    useContribution,
  } = useContract();

  const [metadata, setMetadata] = useState(null);
  const [contributionAmount, setContributionAmount] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const { data: campaign, isLoading: campaignLoading } =
    useCampaign(campaignId);

  const { data: userContribution } = useContribution(
    campaignId,
    address
  );

  const { contribute, isLoading: contributing } =
    useContributeToCampaignSimple();
  const { withdrawFunds, isLoading: withdrawing } =
    useWithdrawFunds();
  const { getRefund, isLoading: refunding } =
    useGetRefund();

  const { data: contributions } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CROWDFUNDING_ABI,
    functionName: "getCampaignContributions",
    args: [campaignId],
    enabled: Boolean(campaignId && CONTRACT_ADDRESS),
    watch: true,
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      if (campaign?.metadataHash) {
        const result = await getFromIPFS(campaign.metadataHash);
        if (result.success) setMetadata(result.data);
      }
    };
    fetchMetadata();
  }, [campaign?.metadataHash]);

  if (campaignLoading) return <div>Loading...</div>;
  if (!campaign) return <div>Campaign Not Found</div>;

  // Safe conversions
  const raisedAmount = Number(formatEther(campaign.raisedAmount || 0));
  const targetAmount = Number(formatEther(campaign.targetAmount || 0));

  const progress =
    targetAmount > 0
      ? (raisedAmount / targetAmount) * 100
      : 0;

  const timeLeft = calculateTimeLeft(campaign.deadline);

  const isCreator =
    address?.toLowerCase() ===
    campaign.creator?.toLowerCase();

  const isSuccessful = raisedAmount >= targetAmount;

  const safeUserContribution =
    userContribution ? BigInt(userContribution.toString()) : 0n;

  const canWithdraw =
    isCreator &&
    timeLeft.expired &&
    isSuccessful &&
    !campaign.withdrawn;

  const canGetRefund =
    !isCreator &&
    timeLeft.expired &&
    !isSuccessful &&
    safeUserContribution > 0n;

  // Safe contribution processing
  const processedContributions = useMemo(() => {
    if (!Array.isArray(contributions)) return [];

    return contributions.map((c) => ({
      contributor: c.contributor,
      amount: BigInt(c.amount.toString()),
      timestamp: c.timestamp
        ? Number(c.timestamp.toString())
        : null,
    }));
  }, [contributions]);

  // Group contributors safely
  const uniqueContributors = useMemo(() => {
    const summary = {};

    processedContributions.forEach((c) => {
      if (!summary[c.contributor]) {
        summary[c.contributor] = {
          address: c.contributor,
          totalAmount: 0n,
          count: 0,
        };
      }
      summary[c.contributor].totalAmount += c.amount;
      summary[c.contributor].count++;
    });

    return Object.values(summary).sort((a, b) =>
      b.totalAmount > a.totalAmount ? 1 : -1
    );
  }, [processedContributions]);

  const handleContribute = async () => {
    if (!contributionAmount || Number(contributionAmount) <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    try {
      await contribute?.({
        args: [campaignId],
        value: ethers.parseEther(contributionAmount), // ethers v6 safe
      });

      setContributionAmount("");
      toast.success("Contribution successful");
    } catch (err) {
      console.error(err);
      toast.error("Transaction failed");
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdrawFunds?.({ args: [campaignId] });
      toast.success("Withdraw successful");
    } catch (err) {
      toast.error("Withdraw failed");
    }
  };

  const handleRefund = async () => {
    try {
      await getRefund?.({ args: [campaignId] });
      toast.success("Refund successful");
    } catch (err) {
      toast.error("Refund failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        {campaign.title}
      </h1>

      <p>{campaign.description}</p>

      <div>
        <p>
          {raisedAmount.toFixed(2)} ETH raised of{" "}
          {targetAmount.toFixed(2)} ETH
        </p>
        <p>{progress.toFixed(1)}% funded</p>
      </div>

      {!timeLeft.expired && !isCreator && isConnected && (
        <div className="space-y-3">
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={contributionAmount}
            onChange={(e) =>
              setContributionAmount(e.target.value)
            }
            placeholder="0.00 ETH"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleContribute}
            disabled={contributing}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {contributing ? "Processing..." : "Contribute"}
          </button>
        </div>
      )}

      {canWithdraw && (
        <button
          onClick={handleWithdraw}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Withdraw Funds
        </button>
      )}

      {canGetRefund && (
        <button
          onClick={handleRefund}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Get Refund
        </button>
      )}

      {safeUserContribution > 0n && (
        <p>
          Your Contribution:{" "}
          {formatEther(safeUserContribution)} ETH
        </p>
      )}
    </div>
  );
}

