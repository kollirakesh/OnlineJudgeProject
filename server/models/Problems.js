const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  testCases: [
    {
      input: String,
      output: String,
    }
  ]
});

module.exports = mongoose.model('Problem', problemSchema);