import { configureStore } from '@reduxjs/toolkit';
import routineSlice from './routineSlice';

const store = configureStore({
  reducer: {
    routine: routineSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
