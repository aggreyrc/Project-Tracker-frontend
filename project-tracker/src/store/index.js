// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectsReducer from './slices/projectsSlice';
import cohortsReducer from './slices/cohortsSlice';
import projectMembersReducer from './slices/projectMembersSlice';
import dataReducer from './slices/dataSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    cohorts: cohortsReducer,
    projectMembers: projectMembersReducer, // Add projectMembers reducer
    data: dataReducer, // Add general data reducer for DataTable if needed
  },
});

export default store;



