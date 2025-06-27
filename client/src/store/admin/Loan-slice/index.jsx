import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loanDetails : null,
    isLoading : false,
}
 

export const getUser = createAsyncThunk(
    "/api/getLoan",
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/loan`)
        return response?.data
    }
);


const getLoansDetailsSlice = createSlice({
    name : "loanSlice",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true
        }).addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.loanDetails = action?.payload?.data
        }).addCase(getUser.rejected, (state) => {
            state.isLoading = false
            state.loanDetails = null
        })
    }
});


export default getLoansDetailsSlice.reducer