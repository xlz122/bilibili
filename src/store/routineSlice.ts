import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 本地存储容错处理
function faultTolerant(name: string) {
  if (typeof window === 'undefined') {
    return false;
  }

  if (localStorage.getItem(name) as string) {
    return JSON.parse(localStorage.getItem(name) as string);
  }

  return false;
}

export type RoutineState = {
  searchHistory: string[];
};

const initialState: RoutineState = {
  searchHistory: faultTolerant('searchHistory') || []
};

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    setSearchHistory: (
      state: RoutineState,
      action: PayloadAction<RoutineState['searchHistory']>
    ) => {
      state.searchHistory = action.payload;
      localStorage.setItem('searchHistory', JSON.stringify(action.payload));
    }
  }
});

export const { setSearchHistory } = routineSlice.actions;

export default routineSlice.reducer;
