import { Task, TaskApi } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, addTask, statusFetch } from './TasksThunk.ts';

interface TasksState {
  tasks: Task[];
  form: TaskApi;
  fetchLoading: boolean;
  formLoading: boolean;
  statusLoading: boolean
}

const initialState: TasksState = {
  tasks: [],
  fetchLoading: false,
  formLoading: false,
  form: { title: '', status: false },
  statusLoading: false
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
      state.form = {...state.form, title: ''};
    });

    builder.addCase(addTask.rejected, (state) => {
      state.formLoading = false;
    });

    builder.addCase(statusFetch.pending, (state) => {
      state.statusLoading = true;
    });

    builder.addCase(statusFetch.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.id ? {...task, status: action.payload.status} : task
      );
    });

    builder.addCase(statusFetch.rejected, (state) => {
      state.statusLoading = false;
    });

  },
});

export const tasksReducer = tasksSlice.reducer;