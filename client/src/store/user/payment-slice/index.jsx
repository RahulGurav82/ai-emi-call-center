import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  Loan: null,
};

 

export const getLoanDetails = createAsyncThunk(
  "/api/loandetails",
  async (loanNumber, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/loan/${loanNumber}`,
      );

      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || "Error During Fetch Data.");
    }
  }
);

export const payLoan = createAsyncThunk(
  "/api/payloan",
  async ({loanNumber, amount} , thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/loan/createNewOrder`,
        { loanNumber, amount } 
      );

      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || "Error During Fetch Data.");
    }
  }
);

export const verifyRazorpayPayment = createAsyncThunk('/order/capturePayment', async (verificationData) => {
    console.log(verificationData, "verificationData")
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/loan/verify-razorpay`, verificationData);
    return response?.data;
});



const PaymentSlice = createSlice({
  name: "LoanPayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLoanDetails.pending, (state) => {
      state.isLoading = true;
    }).addCase(getLoanDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Loan = action?.payload?.data;
    }).addCase(getLoanDetails.rejected, (state) => {
      state.isLoading = false;
      state.Loan = null;
    }).addCase(payLoan.pending, (state) => {
      state.isLoading = true;
    }).addCase(payLoan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isPayment = action?.payload?.data;
    }).addCase(payLoan.rejected, (state) => {
      state.isLoading = false;
      state.isPayment = null;
    })
  },
});

export default PaymentSlice.reducer;