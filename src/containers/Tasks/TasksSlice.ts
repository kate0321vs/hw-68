import { Task } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks } from './TasksThunk.ts';

interface TasksState {
  tasks: Task[];
  fetchLoading: boolean;
}

const initialState: TasksState = {
  tasks: [],
  fetchLoading: false,
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.tasks = action.payload;
    });

    builder.addCase(fetchTasks.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const tasksReducer = tasksSlice.reducer;