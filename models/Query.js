const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  studentIdInQuery: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseInQuery: { type: String, required: true, maxLength: 50 },
  courseCodeInQuery: { type: String, maxLength: 10 },
  slotInQuery: { type: String, maxLength: 10 },
  topicInQuery: { type: String, maxLength: 50 },
  doubtInQuery: { type: String, required: true },
  feedbackInQuery: { type: String, default: 'Not Replied...' },
  feedbackStatus: { type: String, maxLength: 1, default: 'N' } // 'N' for Not Replied, 'Y' for Replied
});

module.exports = mongoose.model('Query', querySchema);
