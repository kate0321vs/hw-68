import { Task, TaskApi } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, addTask } from './TasksThunk.ts';

interface TasksState {
  tasks: Task[];
  form: TaskApi;
  fetchLoading: boolean;
  formLoading: boolean;
}

const initialState: TasksState = {
  tasks: [],
  fetchLoading: false,
  formLoading: false,
  form: { title: '', status: false }
};

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

    builder.addCase(addTask.pending, (state) => {
      state.formLoading = true;
    });

    builder.addCase(addTask.fulfilled, (state, action) => {
      state.formLoading = false;
      state.tasks = [action.payload, ...state.tasks];
      state.form = initialState.form
    });

    builder.addCase(addTask.rejected, (state) => {
      state.formLoading = false;
    })
  },
});

export const tasksReducer = tasksSlice.reducer;