
import { createSlice } from '@reduxjs/toolkit';

const userRoleSlice = createSlice({
  name: 'userRole',
  initialState: {
    role: null,
  },
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
    clearUserRole: (state) => {
      state.role = null;
    },
  },
});

export const { setUserRole, clearUserRole } = userRoleSlice.actions;

export default userRoleSlice.reducer;
