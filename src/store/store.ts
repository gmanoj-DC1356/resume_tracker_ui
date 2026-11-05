import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from '@/store/slices/candidateSlice';
import historyReducer from '@/store/slices/historySlice';

export const store = configureStore({
  reducer: {
    candidate: candidateReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
