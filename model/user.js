const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var userSchema = new Schema({
  userId: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String
  },
  password: {
    type: String,
  },
  isVerified:{
    type:Boolean,
    default: false
  },
  isActive:{
    type:Boolean,
    default: false
  },
  isBlocked:{
    type:Boolean,
    default: false
  },
  is2FAenabled:{
    type:Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);