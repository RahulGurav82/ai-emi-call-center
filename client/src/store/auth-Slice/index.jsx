import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get token from sessionStorage (used in checkAuth)
const token = sessionStorage.getItem("token");

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, formData);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Registration failed");
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, formData);
      const { token, user, success } = response.data;

      sessionStorage.setItem("token", token); // Token stored only for session
      return { user, token, success};
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || "Login failed");
    }
  }
);

// CHECK AUTH (on page reload or refresh)
export const checkAuth = createAsyncThunk(`/auth/check-auth`, async (_, thunkAPI) => {
  const token = sessionStorage.getItem("token");

  if (!token) return thunkAPI.rejectWithValue("No token found");

  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/check-auth`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { user: response.data, token };
  } catch (error) {
    return thunkAPI.rejectWithValue("Invalid session. Please login again.");
  }
});

// LOGOUT
export const logoutUser = createAsyncThunk(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, async () => {
  await axios.post("/api/logout"); // optional server notification
  sessionStorage.removeItem("token");
});

const initialState = {
  user: null,
  token: token || null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.isAuthenticated = action.payload.success;
      })

      // CHECK AUTH
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.token = null;
        state.user = null;
        state.isAuthenticated = action.payload.success;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;