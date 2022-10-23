import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 本地存储容错处理
function faultTolerant(name: string) {
  if (typeof window === 'undefined') {
    return false;
  }

  if (localStorage.getItem(name) as string) {
    return JSON.parse(localStorage.getItem(name) as string);
  }
}

export type RoutineState = {
  msg: string;
};

const initialState: RoutineState = {
  msg: ''
};

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    setMsg: (
      state: RoutineState,
      action: PayloadAction<RoutineState['msg']>
    ) => {
      state.msg = action.payload;
    }
  }
});

export const { setMsg } = routineSlice.actions;

export default routineSlice.reducer;
