const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: Object, index: true }
});


module.exports = mongoose.model("token", tokenSchema);
