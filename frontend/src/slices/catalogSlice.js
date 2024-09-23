import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch doctors and nurses
export const fetchDoctorsAndNurses = createAsyncThunk(
  'users/fetchDoctorsAndNurses',
  async (role) => {
      const response = await axios.get('http://localhost:5000/api/users/doctors-nurses', {
          params: { role } // أرسل الدور كمعامل
      });
      return response.data;
  }
);

const CatalogReducer = createSlice({
  name: 'users',
  initialState: {
    doctorsNurses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorsAndNurses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsAndNurses.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorsNurses = action.payload;
      })
      .addCase(fetchDoctorsAndNurses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default CatalogReducer.reducer;
