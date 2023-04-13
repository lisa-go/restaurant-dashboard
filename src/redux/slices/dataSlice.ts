import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { DrinkResponse, FoodResponse, TransactionResponse } from './apiSlice';

interface DataState {
  tData: TransactionResponse | undefined;
  fData: FoodResponse | undefined;
  dData: DrinkResponse | undefined;
}

const initialState: DataState = {
  tData: undefined,
  fData: undefined,
  dData: undefined,
};

export const dataSlice = createSlice({
  name: 'viewMode',
  initialState,
  reducers: {
    updateTransactions: (state, action: PayloadAction<TransactionResponse>) => {
      state.tData = action.payload;
    },
    updateFoods: (state, action: PayloadAction<FoodResponse>) => {
      state.fData = action.payload;
    },
    updateDrinks: (state, action: PayloadAction<DrinkResponse>) => {
      state.dData = action.payload;
    },
  },
});

export const { updateDrinks, updateFoods, updateTransactions } =
  dataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectData = (state: RootState) => state.data;

export default dataSlice.reducer;
