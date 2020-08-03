const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: Object, index: true }
});

module.exports = mongoose.model("note", noteSchema);
