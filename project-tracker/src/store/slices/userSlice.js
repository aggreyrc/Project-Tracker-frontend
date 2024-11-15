// src/store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://phase-5-project-55r2.onrender.com/users');
  return response.data;
});

// Add a new user
export const addUser = createAsyncThunk('users/addUser', async (userData) => {
  const response = await axios.post('https://phase-5-project-55r2.onrender.com/users', userData);
  return response.data;
});

// Update a user
export const updateUser = createAsyncThunk('users/updateUser', async ({ id, updatedData }) => {
  const response = await axios.put(`https://phase-5-project-55r2.onrender.com/users/${id}`, updatedData);
  return response.data;
});

// Delete a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await axios.delete(`https://phase-5-project-55r2.onrender.com/users/${userId}`);
  return userId;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.users = action.payload; state.loading = false; })
      .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(addUser.fulfilled, (state, action) => { state.users.push(action.payload); })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;

