import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: null,
    success: null,
};

export const submitContact = createAsyncThunk(
    "contact/submitContact",
    async (formData, { rejectWithValue }) => {
        try {
            // console.log("inside try contact slice");
            // console.log(formData);
            const response = await axios.post("http://localhost:5000/api/contact/submit", {formData})
            .catch(err=>{console.log(err)});
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error submitting form"
            );
        }
    }
);

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.success = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitContact.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(submitContact.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message || "Message sent successfully!";
            })
            .addCase(submitContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error submitting form";
            });
    },
});

export const { clearMessage } = contactSlice.actions;

export default contactSlice.reducer;