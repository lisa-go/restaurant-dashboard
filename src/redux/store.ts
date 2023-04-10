import { configureStore } from '@reduxjs/toolkit';
import { api } from './slices/apiSlice';
import counterReducer from './slices/counterSlice';
import viewModeSlice from './slices/viewModeSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    viewMode: viewModeSlice,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
