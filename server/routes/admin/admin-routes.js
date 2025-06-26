const express = require("express");
const { addEmployee } = require("../../controllers/admin/addEmployeeController");
const { createUser } = require("../../controllers/admin/addUserController");
const { createLoan } = require("../../controllers/admin/addLoanController");
const router = express.Router();

router.post('/employee/register', addEmployee)
router.post('/users', createUser)
router.post('/create-loan', createLoan)

module.exports = router;