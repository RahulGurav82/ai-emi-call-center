import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-Slice/index";
import employeeReducer from "./admin/Employee-Slice/index";
import userReducer from "./admin/user-Slice/index";


const store = configureStore({
  reducer: {
    auth: authReducer,
    employee : employeeReducer,
    user : userReducer,
  },
});

export default store;
