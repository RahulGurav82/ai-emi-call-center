import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-Slice/index";
import employeeReducer from "./admin/Employee-Slice/index";
import userReducer from "./admin/user-Slice/index";
import userPaymentReducer from "./user/payment-slice/index"
import loanDetailsReducer from "./admin/Loan-slice/index"


const store = configureStore({
  reducer: {
    auth: authReducer,
    employee : employeeReducer,
    user : userReducer,
    payment : userPaymentReducer,
    loan : loanDetailsReducer,
  },
});

export default store;
