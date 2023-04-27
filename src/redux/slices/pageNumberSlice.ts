import { createSlice } from '@reduxjs/toolkit';

interface PageNumberState {
  current: number;
}

const initialState: PageNumberState = {
  current: 1,
};

export const pageNumberSlice = createSlice({
  name: 'pageNumber',
  initialState,
  reducers: {
    reset: (state) => {
      state.current = 1;
    },
    increment: (state) => {
      state.current += 1;
    },
    decrement: (state) => {
      state.current -= 1;
    },
  },
});

export const { reset, increment, decrement } = pageNumberSlice.actions;

export default pageNumberSlice.reducer;
