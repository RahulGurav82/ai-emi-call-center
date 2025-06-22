const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  loan_amount: {
    type: Number,
    required: true,
  },
  emi_amount: {
    type: Number,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "overdue", "closed"],
    default: "active",
  },
  overdue_days: {
    type: Number,
    default: 0,
  },
  last_payment_date: {
    type: Date,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Loan", loanSchema);
