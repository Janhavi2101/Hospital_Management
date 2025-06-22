const mongoose = require('mongoose');

const InstituteSchema = new mongoose.Schema({
  'Login ID': { type: String, required: true },
  'Password': { type: String, required: true },
  // Add other fields if needed
}, { timestamps: true });

module.exports = mongoose.model('Institute', InstituteSchema);
