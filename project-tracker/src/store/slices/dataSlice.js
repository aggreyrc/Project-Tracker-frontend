import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async actions for fetching each data type
export const fetchCohorts = createAsyncThunk('data/fetchCohorts', async () => {
  const response = await axios.get('http://localhost:5000/cohorts');
  return response.data;
});

export const fetchProjects = createAsyncThunk('data/fetchProjects', async () => {
  const response = await axios.get('http://localhost:5000/projects');
  return response.data;
});

export const fetchProjectMembers = createAsyncThunk('data/fetchProjectMembers', async () => {
  const response = await axios.get('http://localhost:5000/project_members');
  return response.data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    cohorts: [],
    projects: [],
    projectMembers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCohorts.pending, (state) => { state.loading = true; })
      .addCase(fetchCohorts.fulfilled, (state, action) => {
        state.loading = false;
        state.cohorts = action.payload;
      })
      .addCase(fetchCohorts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProjects.pending, (state) => { state.loading = true; })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProjectMembers.pending, (state) => { state.loading = true; })
      .addCase(fetchProjectMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.projectMembers = action.payload;
      })
      .addCase(fetchProjectMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default dataSlice.reducer;
