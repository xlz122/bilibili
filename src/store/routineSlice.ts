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
  viewHistory: ViewHistory[];
};

type ViewHistory = {
  aid: number;
  pic: string;
  title: string;
  createTime: number;
};

const initialState: RoutineState = {
  searchHistory: faultTolerant('searchHistory') || [],
  viewHistory: faultTolerant('viewHistory') || []
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
      const viewHistory = faultTolerant('viewHistory') || [];

      // 去重
      if (viewHistory) {
        const index = viewHistory.findIndex(
          (item: ViewHistory) => item.aid === action.payload.aid
        );

        if (index !== -1) {
          viewHistory.splice(index, 1);
        }
      }

      viewHistory.unshift(action.payload);

      state.viewHistory = viewHistory;
      localStorage.setItem('viewHistory', JSON.stringify(viewHistory));
    }
  }
});

export const { setSearchHistory, setViewHistory } = routineSlice.actions;

export default routineSlice.reducer;
