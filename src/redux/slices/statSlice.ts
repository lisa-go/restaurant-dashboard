import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DataPoint {
  name: string;
  value: number;
}

export interface DataTwoPoint {
  name: string;
  value1: number;
  value2: number;
}

interface Stat {
  IOF: DataPoint[] | undefined;
  OPDW: DataPoint[] | undefined;
  OPH: DataTwoPoint[] | undefined;
}

const initialState: Stat = {
  IOF: undefined,
  OPDW: undefined,
  OPH: undefined,
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
    updateOPH: (state, action: PayloadAction<DataTwoPoint[]>) => {
      state.OPH = action.payload;
    },
  },
});

export const { updateIOF, updateOPDW, updateOPH } = statSlice.actions;

export default statSlice.reducer;
