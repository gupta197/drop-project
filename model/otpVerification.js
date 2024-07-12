const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var otpVerificationSchema = new Schema({
  otp: {
    type: String,
  },
  verificaionAttempt: {
    type: Number,
  },
  resentAttempt: {
    type: Number,
  },
  userId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("otpVerification", otpVerificationSchema);
