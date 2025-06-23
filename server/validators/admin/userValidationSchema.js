const { z } = require("zod");

// Zod schema for user input validation
exports.userValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone_number: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .nullable(),
  language: z.string().optional(),
  location: z.string().optional().nullable(),
});