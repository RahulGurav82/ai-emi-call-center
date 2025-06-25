const mongoose = require("mongoose");
require("dotenv").config(); // Load variables from .env file

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;