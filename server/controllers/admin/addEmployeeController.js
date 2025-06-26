const LoginModel = require("../../models/Login.model");
const bcrypt = require("bcryptjs");
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
