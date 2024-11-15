import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async actions for fetching each data type
export const fetchCohorts = createAsyncThunk('data/fetchCohorts', async () => {
  const response = await axios.get('https://phase-5-project-55r2.onrender.com/cohorts');
  return response.data;
});

export const fetchProjects = createAsyncThunk('data/fetchProjects', async () => {
  const response = await axios.get('https://phase-5-project-55r2.onrender.com/projects');
  return response.data;
});

export const fetchProjectMembers = createAsyncThunk('data/fetchProjectMembers', async () => {
  const response = await axios.get('https://phase-5-project-55r2.onrender.com/project_members');
  return response.data;
});

// CRUD actions for Cohorts
export const deleteCohort = createAsyncThunk('data/deleteCohort', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`https://phase-5-project-55r2.onrender.com/cohorts/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const editCohort = createAsyncThunk('data/editCohort', async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`https://phase-5-project-55r2.onrender.com/cohorts/${id}`, updatedData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// CRUD actions for Projects
export const deleteProject = createAsyncThunk('data/deleteProject', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`https://phase-5-project-55r2.onrender.com/projects/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const editProject = createAsyncThunk('data/editProject', async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`https://phase-5-project-55r2.onrender.com/projects/${id}`, updatedData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// CRUD actions for Project Members
export const deleteProjectMember = createAsyncThunk('data/deleteProjectMember', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`https://phase-5-project-55r2.onrender.com/project_members/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const editProjectMember = createAsyncThunk('data/editProjectMember', async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`https://phase-5-project-55r2.onrender.com/project_members/${id}`, updatedData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
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
      // Fetch handlers
      .addCase(fetchCohorts.fulfilled, (state, action) => {
        state.cohorts = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjectMembers.fulfilled, (state, action) => {
        state.projectMembers = action.payload;
        state.loading = false;
      })
      // Delete handlers
      .addCase(deleteCohort.fulfilled, (state, action) => {
        state.cohorts = state.cohorts.filter(cohort => cohort.id !== action.payload);
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(project => project.id !== action.payload);
      })
      .addCase(deleteProjectMember.fulfilled, (state, action) => {
        state.projectMembers = state.projectMembers.filter(member => member.id !== action.payload);
      })
      // Edit handlers
      .addCase(editCohort.fulfilled, (state, action) => {
        const index = state.cohorts.findIndex(cohort => cohort.id === action.payload.id);
        if (index !== -1) state.cohorts[index] = action.payload;
      })
      .addCase(editProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(project => project.id === action.payload.id);
        if (index !== -1) state.projects[index] = action.payload;
      })
      .addCase(editProjectMember.fulfilled, (state, action) => {
        const index = state.projectMembers.findIndex(member => member.id === action.payload.id);
        if (index !== -1) state.projectMembers[index] = action.payload;
      })
      // Error and Loading state handling
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default dataSlice.reducer;

