import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  cohorts: [],
  loading: false,
  error: null,
};

// Async Thunks for CRUD operations
export const fetchCohorts = createAsyncThunk('cohorts/fetchCohorts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://phase-5-project-55r2.onrender.com/cohorts');
    if (!response.ok) throw new Error('Failed to fetch cohorts');
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addCohort = createAsyncThunk('cohorts/addCohort', async (newCohortData, { rejectWithValue }) => {
  try {
    const response = await fetch('https://phase-5-project-55r2.onrender.com/cohorts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCohortData),
    });
    if (!response.ok) throw new Error('Failed to add cohort');
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const editCohort = createAsyncThunk('cohorts/editCohort', async (updatedCohortData, { rejectWithValue }) => {
  const { id, ...data } = updatedCohortData;
  try {
    const response = await fetch(`https://phase-5-project-55r2.onrender.com/cohorts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update cohort');
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteCohort = createAsyncThunk('cohorts/deleteCohort', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://phase-5-project-55r2.onrender.com/cohorts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete cohort');
    return id; // Return the ID of the deleted cohort to remove it from state
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice with extraReducers to handle each action
const cohortsSlice = createSlice({
  name: 'cohorts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCohorts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCohorts.fulfilled, (state, action) => {
        state.cohorts = action.payload;
        state.loading = false;
      })
      .addCase(fetchCohorts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCohort.fulfilled, (state, action) => {
        state.cohorts.push(action.payload);
      })
      .addCase(editCohort.fulfilled, (state, action) => {
        const index = state.cohorts.findIndex((cohort) => cohort.id === action.payload.id);
        if (index !== -1) state.cohorts[index] = action.payload;
      })
      .addCase(deleteCohort.fulfilled, (state, action) => {
        state.cohorts = state.cohorts.filter((cohort) => cohort.id !== action.payload);
      });
  },
});

export default cohortsSlice.reducer;

