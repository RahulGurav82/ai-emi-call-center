const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  // User fields
  loan_number : {
    type : Number,
    unique : true,
    required : true
  },
  user_name: {
    type: String,
    required: true
  },
  user_phone: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    default: null,
    match: /.+\@.+\..+/
  },
  user_language: {
    type: String,
    default: "english"
  },
  user_location: {
    type: String,
    default: null
  },

  // Loan fields
  loan_amount: {
    type: Number,
    required: true
  },
  paid_amount: {
    type: Number,
    required: true,
    default: 0
  },
  emi_amount: {
    type: Number,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  loan_status: {
    type: String,
    enum: ["active", "overdue", "closed"],
    default: "active"
  },
  overdue_days: {
    type: Number,
    default: 0
  },
  last_payment_date: {
    type: Date,
    default: null
  },

  // Common fields
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Loan", loanSchema);