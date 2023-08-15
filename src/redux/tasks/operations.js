import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AXIOS_BASE_URL } from 'constants/axiosBaseUrl';

axios.defaults.baseURL = AXIOS_BASE_URL;

export const fetchTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/tasks');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task, thunkAPI) => {
    try {
      const response = await axios.post('/api/tasks', task);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task, thunkAPI) => {
    try {
      const response = await axios.patch(`/api/tasks/${task.id}`, {
        title: task.title,
        priority: task.priority,
        category: task.category,
        start: task.start,
        end: task.end,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
