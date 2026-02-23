const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getWallet,
  addMoney,
  spendMoney
} = require("../controllers/walletController");

router.get("/", auth, getWallet);
router.post("/add", auth, addMoney);
router.post("/spend", auth, spendMoney);

module.exports = router;
