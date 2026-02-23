const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");

// GET WALLET
exports.getWallet = async (req, res) => {
  let wallet = await Wallet.findOne({ user: req.user.id });

  if (!wallet) {
    wallet = await Wallet.create({ user: req.user.id });
  }

  res.json(wallet);
};

// ADD MONEY
exports.addMoney = async (req, res) => {
  const { amount } = req.body;

  const wallet = await Wallet.findOne({ user: req.user.id });

  wallet.balance += amount;
  await wallet.save();

  await Transaction.create({
    user: req.user.id,
    type: "CREDIT",
    amount,
    description: "Money added",
    balanceAfter: wallet.balance
  });

  res.json({
    message: "Money added successfully",
    balance: wallet.balance
  });
};

// SPEND MONEY
exports.spendMoney = async (req, res) => {
  const { amount } = req.body;

  const wallet = await Wallet.findOne({ user: req.user.id });

  if (wallet.balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  wallet.balance -= amount;
  await wallet.save();

  await Transaction.create({
    user: req.user.id,
    type: "DEBIT",
    amount,
    description: "Money spent",
    balanceAfter: wallet.balance
  });

  res.json({
    message: "Money spent successfully",
    balance: wallet.balance
  });
};

