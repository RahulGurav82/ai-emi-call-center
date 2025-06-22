const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    default: null,
    unique: true,               // Must be unique
    match: /.+\@.+\..+/ 
  },
  language: {
    type: String,
    default: "en", // e.g., 'en', 'hi', 'mr'
  },
  location: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);