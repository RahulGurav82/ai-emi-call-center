const { z } = require('zod');

// Zod validation schema
exports.loanSchema = z.object({
  // User fields
  user_name: z.string().min(2, "Name must be at least 2 characters"),
  user_phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long"),
  user_email: z.string()
    .email("Invalid email format")
    .nullable()
    .optional(),
  user_language: z.string().default("en"),
  user_location: z.string().nullable().optional(),

  // Loan fields
  loan_amount: z.number().positive("Loan amount must be positive"),
  emi_amount: z.number().positive("EMI amount must be positive"),
  due_date: z.coerce.date().min(new Date(), "Due date cannot be in the past"),
  loan_status: z.enum(["active", "overdue", "closed"]).default("active"),
  overdue_days: z.number().int().nonnegative().default(0),
  last_payment_date: z.coerce.date().nullable().optional()
});