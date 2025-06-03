import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RoutineState = {
  searchHistory: string[];
  viewHistory: ViewHistory[];
};

export type ViewHistory = {
  aid: number;
  pic: string;
  title: string;
  createTime: number;
};

const initialState: RoutineState = {
  searchHistory: getLocalStorage('searchHistory', []),
  viewHistory: getLocalStorage('viewHistory', [])
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
    },
    setViewHistory: (
      state: RoutineState,
      action: PayloadAction<ViewHistory>
    ) => {
      const viewHistory = getLocalStorage('viewHistory', []);

      // 去重
      const index = viewHistory.findIndex(
        (item: ViewHistory) => item.aid === action.payload.aid
      );
      if (index !== -1) {
        viewHistory.splice(index, 1);
      }
      viewHistory.unshift(action.payload);

      state.viewHistory = viewHistory;
      localStorage.setItem('viewHistory', JSON.stringify(viewHistory));
    }
  }
});

function getLocalStorage<T>(key: string, defaultValue: T) {
  if (typeof window === 'undefined') return;

  try {
    return JSON.parse(localStorage.getItem(key) ?? '');
  } catch {
    return defaultValue;
  }
}

export default routineSlice.reducer;
