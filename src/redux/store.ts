import { configureStore } from '@reduxjs/toolkit';
import { api } from './slices/apiSlice';
import viewModeSlice from './slices/viewModeSlice';
import pageSlice from './slices/pageSlice';
import dataSlice from './slices/dataSlice';
import pageNumberSlice from './slices/pageNumberSlice';
import statSlice from './slices/statSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    data: dataSlice,
    viewMode: viewModeSlice,
    page: pageSlice,
    pageNumber: pageNumberSlice,
    stat: statSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
