 // Import your model
const LoanModel = require("../../models/Loan.model")
const {loanSchema} = require("../../validators/admin/loanValidationSchema")
const generateLoanNumber = require('../../utils/loanNumber')

const createLoan = async (req, res) => {
  try {
    // Validate request body
    console.log(req.body)
    const validatedData = loanSchema.parse(req.body);

    // 2️⃣ Generate a unique 10-digit loan number
    let loan_number;
    do {
      loan_number = generateLoanNumber();
    } while (await LoanModel.exists({ loan_number })); // collision check


    // Create new loan document
    const newLoan = new LoanModel({
      ...validatedData,
      loan_number,
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