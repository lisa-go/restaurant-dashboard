import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface DataPoint {
  name: string;
  value: number;
}

interface Stat {
  IOF: DataPoint[] | undefined;
  OPDW: DataPoint[] | undefined;
}

const initialState: Stat = {
  IOF: undefined,
  OPDW: undefined,
};

export const statSlice = createSlice({
  name: 'stat',
  initialState,
  reducers: {
    updateIOF: (state, action: PayloadAction<DataPoint[]>) => {
      state.IOF = action.payload;
    },
    updateOPDW: (state, action: PayloadAction<DataPoint[]>) => {
      state.OPDW = action.payload;
    },
  },
});

export const { updateIOF, updateOPDW } = statSlice.actions;

export default statSlice.reducer;
