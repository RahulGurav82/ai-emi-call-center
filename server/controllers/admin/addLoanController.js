const LoanModel = require("../../models/Loan.model");
const { loanValidationSchema } = require("../../validators/admin/loanValidationSchema");

// Create Loan Controller
exports.createLoan = async (req, res) => {
  try {
    // Validate request body
    const validatedData = loanValidationSchema.parse(req.body);

    // Create new loan
    const loan = new LoanModel(validatedData);
    await loan.save();

    return res.status(201).json({ success: true, loan });
  } catch (err) {
    // Zod validation error
    if (err.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: err.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};