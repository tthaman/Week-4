const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  settings: {
    useDarkMode: Boolean,
    language: String
  }
});

module.exports = mongoose.model("user", userSchema);
