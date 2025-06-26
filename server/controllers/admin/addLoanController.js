 // Import your model
const LoanModel = require("../../models/Loan.model")
const {loanSchema} = require("../../validators/admin/loanValidationSchema")

const createLoan = async (req, res) => {
  try {
    // Validate request body
    const validatedData = loanSchema.parse(req.body);

    // Create new loan document
    const newLoan = new LoanModel({
      ...validatedData,
    });

    // Save to database
    const savedLoan = await newLoan.save();

    // Success response
    res.status(201).json({
      success: true,
      message: "Loan created successfully",
      data: savedLoan
    });

  } catch (error) {
    // Handle Zod validation errors
    if (error.name === "ZodError") {
      const errorMessages = error.errors.map((e) => e.message);
      return res
        .status(400)
        .json({ message: errorMessages, errors: errorMessages });
    }

    // Handle duplicate key errors (unique fields)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`,
        field: field
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: "Failed to create loan",
      error: error.message
    });
  }
};

module.exports = { createLoan };