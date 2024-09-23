import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: null,
    success: null,
    chats: [],
    messages_: [], // Add messages to the initial state
};

export const getChats = createAsyncThunk(
    "chats/getChats",
    async (userRole, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:5000/api/chats/getChats", { userRole },{ withCredentials: true });
            console.log(userRole);
            return response.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Error fetching chats"
            );
        }
    }
);

export const addMessage = createAsyncThunk(
    "chats/addMessage",
    async (message) => {
        try {
            console.log(message);
            const response = await axios.post("http://localhost:5000/api/chats/addMessage", { message },{ withCredentials: true });
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        clearChatError: (state) => {
            state.error = null;
        },
        setMessages: (state, action) => {
            state.messages_ = action.payload; // Action to set messages
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChats.fulfilled, (state, action) => {
                state.loading = false;
                state.chats = action.payload.chats; // Make sure to access chats correctly
                state.messages_ = action.payload.messages; // Ensure messages are also populated
            })
            .addCase(getChats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching chats";
            });
    },
});

export const { clearChatError, setMessages } = chatSlice.actions;

export default chatSlice.reducer;
