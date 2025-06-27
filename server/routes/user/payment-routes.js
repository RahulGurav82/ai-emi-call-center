const express = require("express");
const { getLoanInformation, emiPayment, verifyPayment } = require("../../controllers/user/Payment-Controller");
const router = express.Router();

router.get("/:loan_number", getLoanInformation)
router.post("/createNewOrder", emiPayment)
router.post("/verify-razorpay", verifyPayment)

module.exports = router;