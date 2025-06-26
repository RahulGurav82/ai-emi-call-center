const UserModel = require("../../models/User.model");
const { userValidationSchema } = require("../../validators/admin/userValidationSchema");

// Create User Controller
exports.createUser = async (req, res) => {
  try {
    // Validate request body
    const validatedData = userValidationSchema.parse(req.body);

    // Create new user
    const user = new UserModel(validatedData);
    await user.save();

    return res.status(201).json({ success: true, message : "user added successfully", user });
  } catch (err) {
    // Zod validation error
    if (err.name === "ZodError") {
      const errorMessages = err.errors.map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: errorMessages,
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