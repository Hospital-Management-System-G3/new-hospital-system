import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: null,
    success: null,
    user: {},
    record: {},
    bills: [],
};

export const getRecord = createAsyncThunk(
    "record/getRecord",
    async (_, { rejectWithValue }) => {
        try {
            // console.log("Starting API call");
            const response = await axios.get("http://localhost:5000/api/record/getRecord",{ withCredentials: true });
            // console.log("API Response:", response.data);
            return response.data;
        } catch (err) {
            console.error("API call failed:", err);
            return rejectWithValue(err.response?.data?.message || "Error fetching record");
        }
    }
);



const patientSlice = createSlice({
    name: 'patientRecord',
    initialState: {
        user: [],
        record: [],
        bills: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRecord.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRecord.fulfilled, (state, action) => {
                // console.log("Fulfilling getRecord action", action.payload);
                state.loading = false;
                state.user = action.payload.userData[0];  // Assuming you want the first (and only) user
                state.record = action.payload.userRecord[0];  // Assuming you want the first (and only) record
                state.bills = action.payload.userBills;
                // console.log("Updated state:", state);  // Add this log
            })
            .addCase(getRecord.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export default patientSlice.reducer;
