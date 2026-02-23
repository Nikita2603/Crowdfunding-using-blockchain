import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import CampaignDetails from "../../components/Campaign/CampaignDetails";

export default function CampaignPage() {
  const router = useRouter();

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  const { id } = router.query;

  return (
    <Layout>
      <CampaignDetails campaignId={id} />
    </Layout>
  );
}
 