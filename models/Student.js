const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true, maxLength: 30 },
  studentEmail: { type: String, required: true, unique: true, maxLength: 40 },
  studentPassword: { type: String, required: true, maxLength: 14 },
  studentRegNo: { type: String, required: true, unique: true, maxLength: 9 },
  studentGender: { type: String, maxLength: 6 }
});

module.exports = mongoose.model('Student', studentSchema);
