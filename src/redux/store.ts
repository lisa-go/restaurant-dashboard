import { configureStore } from '@reduxjs/toolkit';
import { api } from './slices/apiSlice';
import viewModeSlice from './slices/viewModeSlice';
import pageSlice from './slices/pageSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    viewMode: viewModeSlice,
    page: pageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
