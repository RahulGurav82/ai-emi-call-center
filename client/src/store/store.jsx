import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-Slice/index";
import employeeReducer from "./admin/Employee-Slice/index";


const store = configureStore({
  reducer: {
    auth: authReducer,
    employee : employeeReducer,
  },
});

export default store;
