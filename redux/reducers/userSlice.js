import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    update: (state, action) => action.payload,
  },
});

export const { update } = userSlice.actions;

export default userSlice.reducer;
