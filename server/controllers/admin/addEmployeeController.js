const LoginModel = require("../../models/Login.model");
const UserModel = require("../../models/User.model");
const LoanModel = require("../../models/Loan.model");
const { registerSchema } = require("../../validators/auth/authValidator");

// Register Controller
exports.addEmployee = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { name, email, password, role } = validatedData;

    // Check existing user
    const existingUser = await LoginModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new LoginModel({
      name,
      email,
      password: hashedPassword,
      role: role || "employee",
    });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    if (err.name === "ZodError") {
      const errorMessages = err.errors.map((e) => e.message);
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errorMessages });
    }
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: err.message,
    });
  }
};

// Create User Controller
exports.createUser = async (req, res) => {
  try {
    // Validate request body
    const validatedData = userValidationSchema.parse(req.body);

    // Create new user
    const user = new UserModel(validatedData);
    await user.save();

    return res.status(201).json({ success: true, user });
  } catch (err) {
    // Zod validation error
    if (err.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: err.errors,
      });
    }

    // Duplicate key error
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: `Duplicate value for: ${Object.keys(err.keyValue).join(", ")}`,
      });
    }

    // Other errors
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

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
