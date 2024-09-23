// dataThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
    const response = await axios.get('http://localhost:5000/api/doctorData',
        { withCredentials: true }

    );

    console.log(response.data);
    return response.data;  
});

 