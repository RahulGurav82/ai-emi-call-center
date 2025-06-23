const { z } = require("zod");

// Zod schema for validating loan data
exports.loanValidationSchema = z.object({
  user_id: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid user ID",
    }),
  loan_amount: z.number().positive("Loan amount must be positive"),
  emi_amount: z.number().positive("EMI amount must be positive"),
  due_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid due date format",
  }),
  status: z.enum(["active", "overdue", "closed"]).optional(),
  overdue_days: z.number().nonnegative().optional(),
  last_payment_date: z
    .string()
    .nullable()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid last payment date",
    }),
});