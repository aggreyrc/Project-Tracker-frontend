import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Example initial state
const initialState = {
  cohortsList: [],
  loading: false,
  error: null,
};

// Define the slice
const cohortsSlice = createSlice({
  name: 'cohorts',
  initialState,
  reducers: {
    // Define reducers here if needed
  },
  extraReducers: (builder) => {
    // Handle additional actions if needed
  },
});

// Selector for cohorts list
const selectCohortsState = (state) => state.cohorts;

export const selectCohortsList = createSelector(
  [selectCohortsState],
  (cohortsState) => cohortsState.cohortsList || [] // Default to empty array if undefined
);

// Export the reducer as default
export default cohortsSlice.reducer;