import React, { useState } from "react";
import {
  CreditCard,
  User,
  IndianRupee,
  Calendar,
  CheckCircle,
  AlertCircle,
  Search,
} from "lucide-react";
import { useDispatch } from "react-redux";
import {
  getLoanDetails,
  payLoan,
  verifyRazorpayPayment,
} from "../../store/user/payment-slice";
import { loadScript } from "../../lib/utils";

const Pay = () => {
  const [loanNumber, setLoanNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loanDetails, setLoanDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleFetchDetails = async () => {
    setIsLoading(true);
    setPaymentSuccess(false);

    try {
      dispatch(getLoanDetails(loanNumber)).then((data) => {
        if (data?.payload?.success) {
          setLoanDetails(data?.payload?.data[0]);
          console.log(loanDetails, "loanDetails");
        } else {
          console.log("error");
        }
      });
    } catch (error) {
      console.error("Error fetching loan details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async (e) => {
    if (!amount || !loanDetails || !loanNumber) return;

    try {
      await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      // 1. Create payment order
      dispatch(payLoan({ loanNumber, amount })).then((data) => {
        if (data?.payload?.success) {
          const { order, key } = data.payload;

          // 2. Open Razorpay checkout
          const options = {
            key: key,
            amount: order.amount,
            currency: order.currency,
            name: "Mario",
            description: "EMI Payment",
            order_id: order.id,
            handler: async function (paymentResponse) {
              // 3. Verify payment on your server
              dispatch(
                verifyRazorpayPayment({
                  ...paymentResponse,
                  loanNumber,
                  amount,
                })
              ).then((data) => {
                if(data?.payload?.success) {
                setPaymentSuccess(true) 
                }
              })
            },
            prefill: {
              name: loanDetails.user_name,
              email: loanDetails.user_email,
              contact: loanDetails.user_phone,
            },
            notes: {
              loanNumber: loanNumber.toString(),
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          setPaymentSuccess(false);
        }
      });
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const quickAmounts = [5000, 8500, 10000, 15000];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            EMI Payment Portal
          </h1>
          <p className="text-gray-600">Manage your loan payments with ease</p>
        </div>

        {/* Loan Number Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <Search className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              Find Your Loan
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="loanNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Loan Account Number
              </label>
              <input
                type="text"
                id="loanNumber"
                value={loanNumber}
                onChange={(e) => setLoanNumber(e.target.value)}
                placeholder="Enter your loan account number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <button
              onClick={handleFetchDetails}
              disabled={isLoading || !loanNumber}
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Fetching Details...
                </>
              ) : (
                "Get Loan Details"
              )}
            </button>
          </div>
        </div>

        {/* Loan Details */}
        {loanDetails && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Loan Information Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Loan Information
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Account Holder</span>
                  <span className="font-semibold text-gray-900">
                    {loanDetails.user_name}
                  </span>
                </div>

                {/* <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Loan Type</span>
                  <span className="font-semibold text-gray-900">{loanDetails.loanType}</span>
                </div> */}

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Original Amount</span>
                  <span className="font-semibold text-gray-900">
                    ₹{loanDetails.loan_amount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="font-semibold text-green-600">
                    ₹{loanDetails.paid_amount.toLocaleString()}
                  </span>
                </div>

                {/* <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Remaining Balance</span>
                  <span className="font-semibold text-orange-600">₹{loanDetails.remainingAmount.toLocaleString()}</span>
                </div> */}

                {/* <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Next Due Date</span>
                  <span className="font-semibold text-red-600">{loanDetails.nextDueDate}</span>
                </div> */}
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Loan Progress</span>
                  <span>
                    {Math.round(
                      (loanDetails.paid_amount / loanDetails.loan_amount) * 100
                    )}
                    % Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (loanDetails.paid_amount / loanDetails.loan_amount) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Payment Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-4">
                <IndianRupee className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Make Payment
                </h3>
              </div>

              {/* Monthly EMI Highlight */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly EMI Amount</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{loanDetails.emi_amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Due: 2nd</p>
                  </div>
                </div>
              </div>

              {/* Quick Payment Options */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Quick Payment Options
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                    >
                      ₹{quickAmount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Payment Amount
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      min="1"
                      className="w-full outline-none pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={!amount}
                  className="w-full cursor-pointer bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay Now
                </button>
              </div>

              {/* Payment Success Message */}
              {paymentSuccess && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-green-800 font-medium">
                      Payment of ₹{amount} submitted successfully!
                    </p>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-yellow-800">
                    Your payment is secured with 256-bit SSL encryption.
                    Transaction details will be sent to your registered mobile
                    number.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pay;
