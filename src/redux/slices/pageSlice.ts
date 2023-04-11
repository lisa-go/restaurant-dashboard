import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface PageState {
  current: string;
}

const initialState: PageState = {
  current: 'Overview',
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
  },
});

export const { change } = pageSlice.actions;

export const selectPage = (state: RootState) => state.page.current;

export default pageSlice.reducer;
