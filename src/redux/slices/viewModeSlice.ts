import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface ViewModeState {
  mode: string;
}

const initialState: ViewModeState = {
  mode: 'light',
};

export const viewModeSlice = createSlice({
  name: 'viewMode',
  initialState,
  reducers: {
    toggle: (state) => {
      state.mode === 'light' ? (state.mode = 'dark') : (state.mode = 'light');
    },
  },
});

export const { toggle } = viewModeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectViewMode = (state: RootState) => state.viewMode.mode;

export default viewModeSlice.reducer;
