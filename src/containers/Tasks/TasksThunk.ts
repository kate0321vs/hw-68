import axiosApi from '../../axiosApi.ts';
import { Task, TaskApi, TasksListApi } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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

export const addTask = createAsyncThunk(
  "tasks/onSubmit",
  async (newTask: TaskApi) => {
    const response = await axiosApi.post<Task>('/tasks.json', newTask);
    console.log(response.data.name)
    toast.success('Meal was added Successfully!');

    return { ...newTask, id: response.data.name}
  }
)
