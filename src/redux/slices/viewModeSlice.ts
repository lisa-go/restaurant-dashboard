import { createSlice } from '@reduxjs/toolkit';

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

export default viewModeSlice.reducer;
