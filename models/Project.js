const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  author: {
    type: String,
    require: true,
    trim: true,
  },
  register: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Project', projectSchema);