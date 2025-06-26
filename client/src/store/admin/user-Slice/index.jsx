import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 📦 Async thunk for registering a new employee
export const addUsers = createAsyncThunk(
  "user/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/users`, formData); // adjust URL if needed
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetUsersSliceState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUsers.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addUsers.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(addUsers.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to add user";
      });
  },
});

export const { resetUsersSliceState } = usersSlice.actions;

export default usersSlice.reducer;
