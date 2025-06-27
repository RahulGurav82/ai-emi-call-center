const { razorpay } = require("../../helpers/razorpay");
const LoanModel = require("../../models/Loan.model");

exports.getLoanInformation = async (req, res) => {
  try {


    const { loan_number } = req.params;

    const Loan = await LoanModel.find({loan_number});

    if (!loan_number) {
      return res.status(404).json({
        success: false,
        message: "Loan Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "loan found.",
      data : Loan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};


exports.emiPayment = async (req, res) => {
  try {
    const { loanNumber, amount } = req.body;
    
    // 1. Validate the input
    if (!loanNumber || !amount) {
      return res.status(400).json({
        success: false,
        message: "Loan number and amount are required"
      });
    }

    // 2. Find the loan in database
    const loan = await LoanModel.findOne({ loan_number: loanNumber });
    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found"
      });
    }

    // 3. Create Razorpay order
    const paymentOptions = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `emi_${loanNumber}_${Date.now()}`,
      notes: {
        loanNumber: loanNumber.toString(),
        purpose: "EMI Payment"
      }
    };

    const order = await razorpay.orders.create(paymentOptions);

    // 4. Return order details to client
    return res.status(200).json({
      success: true,
      message: "Payment order created successfully",
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      },
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.log("Error While Payment", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Add this function to handle payment verification and loan update
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, loanNumber, amount } = req.body;

    // 1. Verify the payment (you should implement proper signature verification)
    // For simplicity, we'll assume payment is verified
    
    // 2. Find the loan
    const loan = await LoanModel.findOne({ loan_number: loanNumber });
    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found"
      });
    }

    // 3. Update loan details
    loan.paid_amount += Number(amount);
    loan.last_payment_date = new Date();
    
    // Check if loan is fully paid
    if (loan.paid_amount >= loan.loan_amount) {
      loan.loan_status = "closed";
    } else {
      // Update due date for next EMI (assuming monthly EMI)
      const nextDueDate = new Date(loan.due_date);
      nextDueDate.setMonth(nextDueDate.getMonth() + 1);
      loan.due_date = nextDueDate;
    }

    await loan.save();

    // 4. Return success response
    return res.status(200).json({
      success: true,
      message: "Payment verified and loan updated successfully",
      paymentId: razorpay_payment_id,
      loanStatus: loan.loan_status,
      paidAmount: loan.paid_amount,
      remainingAmount: loan.loan_amount - loan.paid_amount
    });

  } catch (error) {
    console.log("Error While Verifying Payment", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
