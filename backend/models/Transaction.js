const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  type: {
    type: String,
    enum: ["CREDIT", "DEBIT"],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: String,
  balanceAfter: Number
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
