const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacherName: { type: String, required: true, maxLength: 30 },
  teacherEmail: { type: String, required: true, unique: true, maxLength: 40 },
  teacherPassword: { type: String, required: true, maxLength: 14 },
  teacherGender: { type: String, maxLength: 6 }
});

module.exports = mongoose.model('Teacher', teacherSchema);
