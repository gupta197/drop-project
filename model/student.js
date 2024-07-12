const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Student Schema
 */
var studentSchema = new Schema({
  studentId: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  description : {
    type: String,
  },
  certificateId : {
    type: String,
  },
  course : {
    type: String,
  },
  isEnrolled:{
    type: Boolean,
    default:false
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

module.exports = mongoose.model('Student', studentSchema);