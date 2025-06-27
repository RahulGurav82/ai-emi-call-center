// utils/loanNumber.js
module.exports = generateLoanNumber = () =>
  Math.floor(1_000_000_000 + Math.random() * 9_000_000_000) // 1000000000-9999999999
    .toString(); // guarantees exactly 10 digits
