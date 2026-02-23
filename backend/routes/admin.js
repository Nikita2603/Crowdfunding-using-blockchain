const express = require("express");
const Campaign = require("../models/Campaign");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/campaigns", auth, admin, async (req, res) => {
  const campaigns = await Campaign.find();
  res.json(campaigns);
});

router.post("/approve/:id", auth, admin, async (req, res) => {
  await Campaign.findByIdAndUpdate(req.params.id, { isApproved: true });
  res.json({ message: "Approved" });
});

module.exports = router;
