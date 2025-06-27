const express = require("express");
const { addEmployee } = require("../../controllers/admin/addEmployeeController");
const { createLoan, fetchAllLoans } = require("../../controllers/admin/addLoanController");
const router = express.Router();

router.post('/employee/register', addEmployee)
router.post('/create-loan', createLoan)
router.get('/loan', fetchAllLoans)

module.exports = router;