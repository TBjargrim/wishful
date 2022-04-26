import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  count: 0
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
export const { userDetails } = userSlice.actions;

export default userSlice.reducer;
