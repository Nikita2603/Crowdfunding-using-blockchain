const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");

// CREATE campaign (SAVE permanently)
router.post("/create", async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    await campaign.save(); // 🔥 PERMANENT SAVE

    res.status(201).json({
      message: "Campaign saved successfully",
      campaign
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all campaigns
router.get("/", async (req, res) => {
  const campaigns = await Campaign.find();
  res.json(campaigns);
});

module.exports = router;
