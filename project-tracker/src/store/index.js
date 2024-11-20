import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectsReducer from './slices/projectsSlice';
import cohortsReducer from './slices/cohortsSlice';
import projectMembersReducer from './slices/projectMembersSlice';
import dataReducer from './slices/dataSlice';
import userReducer from './slices/userSlice'; // Manages CRUD operations for users
import feedbackReducer from './slices/feedbackSlice'; // Import the feedback slice

const store = configureStore({
  reducer: {
    auth: authReducer,               // Manages authentication state
    projects: projectsReducer,       // Manages CRUD operations for projects
    cohorts: cohortsReducer,         // Manages CRUD operations for cohorts
    projectMembers: projectMembersReducer, // Manages project member associations
    data: dataReducer,               // Manages additional data state if needed
    users: userReducer,              // Manages CRUD operations for users
    feedback: feedbackReducer,       // Manages user feedback
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,       // Disable serializable check if using non-serializable values
    }),
});

export default store;
