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
      const response = await fetch('http://localhost:5000/projects');
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
      });
  },
});

export const { setCohortFilter, loadMoreProjects } = projectsSlice.actions;

export default projectsSlice.reducer;

