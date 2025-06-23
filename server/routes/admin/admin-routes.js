const express = require("express");
const { addEmployee, createUser, createLoan } = require("../../controllers/admin/addEmployeeController");
const router = express.Router();

router.post('/employee/register', addEmployee)
router.post('/users', createUser)
router.post('/create-loan', createLoan)

module.exports = router;