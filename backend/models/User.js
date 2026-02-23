const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
    },

    // 🔐 KYC DETAILS (ADDED)
    kyc: {
      idType: {
        type: String, // aadhaar / pan / passport
      },
      idImage: {
        type: String, // uploaded ID image path
      },
      selfieImage: {
        type: String, // uploaded selfie path
      },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
