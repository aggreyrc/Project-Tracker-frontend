// src/store/slices/projectMembersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch project members from the API
export const fetchProjectMembers = createAsyncThunk(
  'projectMembers/fetchProjectMembers',
  async () => {
    const response = await axios.get('http://localhost:5000/project_members');
    return response.data;
  }
);

const projectMembersSlice = createSlice({
  name: 'projectMembers',
  initialState: {
    projectMembers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjectMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projectMembers = action.payload;
      })
      .addCase(fetchProjectMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default projectMembersSlice.reducer;
