import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  displayedProjects: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  cohortFilter: null, // Cohort filter
};

// Thunk to fetch all projects from the backend
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://phase-5-project-55r2.onrender.com/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to add a new project
export const addProject = createAsyncThunk(
  'projects/addProject',
  async (newProjectData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://phase-5-project-55r2.onrender.com/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProjectData),
      });
      if (!response.ok) {
        throw new Error('Failed to add project');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCohortFilter: (state, action) => {
      state.cohortFilter = action.payload;
      state.displayedProjects = state.projects
        .filter(project => !state.cohortFilter || project.cohort_id === state.cohortFilter)
        .slice(0, state.pageSize);
      state.currentPage = 1;
    },
    loadMoreProjects: (state) => {
      const startIndex = state.currentPage * state.pageSize;
      const endIndex = startIndex + state.pageSize;
      const nextProjects = state.projects
        .filter(project => !state.cohortFilter || project.cohort_id === state.cohortFilter)
        .slice(startIndex, endIndex);
      state.displayedProjects = [...state.displayedProjects, ...nextProjects];
      state.currentPage += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.displayedProjects = action.payload.slice(0, state.pageSize);
        state.loading = false;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
        state.displayedProjects = [action.payload, ...state.displayedProjects].slice(0, state.pageSize);
        state.loading = false;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions
export const { setCohortFilter, loadMoreProjects } = projectsSlice.actions;

export default projectsSlice.reducer;




