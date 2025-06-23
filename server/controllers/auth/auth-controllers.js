const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const LoginModel = require("../../models/Login.model"); // Your login schema model
const {
  loginSchema,
  registerSchema,
} = require("../../validators/auth/authValidator");
require("dotenv").config();

// Environment secret
const JWT_SECRET = process.env.JWT_SECRET || "asdfmmghjklqwertyuiopzxcvbnm";

// Register Controller
exports.register = async (req, res) => {
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

// Login Controller
exports.login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await LoginModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      JWT_SECRET,
      {
        expiresIn: "1h", // sessionStorage will control actual expiration on tab close
      }
    );

    res.status(200).json({
      success: true,
      token,
      user: { 
        name: user.name, 
        email: user.email, 
        role: user.role 
      },
    });
  } catch (err) {
    if (err.name === "ZodError") {
      const errorMessages = err.errors.map((e) => e.message);
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errorMessages });
    }
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: err.message });
  }
};

// Protect routes
exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // You can access `req.user.id`, `req.user.role`, etc.
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.logout = (req, res) => {
  // Client should clear token from sessionStorage
  res.status(200).json({
    message: "Logged out successfully. Clear session token on client side.",
  });
};
