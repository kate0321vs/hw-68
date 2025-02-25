import { Task } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, addTask, statusFetch, deleteFetch } from './TasksThunk.ts';

interface TasksState {
  tasks: Task[];
  fetchLoading: boolean;
  formLoading: boolean;
  statusLoading: boolean;
  deleteLoading: boolean
}

const initialState: TasksState = {
  tasks: [],
  fetchLoading: false,
  formLoading: false,
  statusLoading: false,
  deleteLoading: false
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
      state.tasks = action.payload.reverse();
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

    builder.addCase(deleteFetch.pending, (state) => {
      state.deleteLoading = true;
    });

    builder.addCase(deleteFetch.fulfilled, (state, action) => {
      state.deleteLoading = false;
        state.tasks = state.tasks.filter(task => task.id !== action.payload.id)
    });

    builder.addCase(deleteFetch.rejected, (state) => {
      state.deleteLoading = false;
    })
  },
});

export const tasksReducer = tasksSlice.reducer;