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
    toast.success('Task was added Successfully!');
    return { ...newTask, id: response.data.name}
  }
)

export const statusFetch = createAsyncThunk(
  "tasks/statusFetch",
  async (newTask: Task) => {
      await axiosApi.put(`tasks/${newTask.id}.json`, {...newTask, status: !newTask.status});
      return {...newTask, status: !newTask.status}
  }
)

export const deleteFetch = createAsyncThunk(
  "tasks/deleteFetch",
    async (task: Task) => {
      if (window.confirm("Are you sure you want to delete this task?")) {
        await axiosApi.delete(`tasks/${task.id}.json`);
        toast.success('Task was deleted Successfully!');
        return task
      }
    }
)
;