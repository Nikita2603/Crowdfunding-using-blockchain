const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    targetAmount: Number,
    duration: Number,
    category: String,
    tags: [String],
    creatorWallet: String,
    contractAddress: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", CampaignSchema);
