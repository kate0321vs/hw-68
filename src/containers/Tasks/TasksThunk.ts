import axiosApi from '../../axiosApi.ts';
import { Task, TasksListApi } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async () => {
    const tasksResponse = await axiosApi<TasksListApi | null>('/tasks.json');
    const tasks = tasksResponse.data;
    let newTasks: Task[] = [];

    if (tasks) {
      newTasks = Object.keys(tasks).map((key) => {
        return {...tasks[key], id: key};
      });
    }
    return newTasks
  }
)