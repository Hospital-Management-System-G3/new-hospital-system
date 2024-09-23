//   doctorData.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../thunks/doctorThunk'; // Import the thunk

const   doctorData= createSlice({
    name: 'data',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })


            .addCase(fetchData.fulfilled, (state, action) => {
                console.log('Fetched data:', action.payload); // Check the structure here
                state.loading = false;
                state.items = action.payload;
            })
            
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default   doctorData.reducer;
