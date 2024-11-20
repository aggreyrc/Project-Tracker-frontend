

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  displayedProjects: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  filters: {
    cohort: null,    // Filter by cohort
    search: '',      // Filter by search query (name/description)
  },
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
    setFilter: (state, action) => {
      const { type, value } = action.payload;
      state.filters[type] = value;
      state.displayedProjects = state.projects
        .filter((project) => {
          // Filter by cohort if set
          if (state.filters.cohort && project.cohort_id !== state.filters.cohort) {
            return false;
          }
          // Filter by search query if set
          if (
            state.filters.search &&
            !(
              project.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
              project.description.toLowerCase().includes(state.filters.search.toLowerCase())
            )
          ) {
            return false;
          }
          return true;
        })
        .slice(0, state.pageSize);
      state.currentPage = 1;
    },
    loadMoreProjects: (state) => {
      const startIndex = state.currentPage * state.pageSize;
      const endIndex = startIndex + state.pageSize;
      const nextProjects = state.projects
        .filter((project) => {
          if (state.filters.cohort && project.cohort_id !== state.filters.cohort) {
            return false;
          }
          if (
            state.filters.search &&
            !(
              project.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
              project.description.toLowerCase().includes(state.filters.search.toLowerCase())
            )
          ) {
            return false;
          }
          return true;
        })
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
export const { setFilter, loadMoreProjects } = projectsSlice.actions;

export default projectsSlice.reducer;

