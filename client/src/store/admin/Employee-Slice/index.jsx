import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 📦 Async thunk for registering a new employee
export const registerEmployee = createAsyncThunk(
  "employee/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/employee/register`, formData); // adjust URL if needed
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetEmployeeState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerEmployee.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(registerEmployee.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to register employee";
      });
  },
});

export const { resetEmployeeState } = employeeSlice.actions;

export default employeeSlice.reducer;
