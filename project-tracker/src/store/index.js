// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectsReducer from './slices/projectsSlice';
import cohortsReducer from './slices/cohortsSlice';
import projectMembersReducer from './slices/projectMembersSlice';
import dataReducer from './slices/dataSlice';
import userReducer from './slices/userSlice'; // Import the new user slice

const store = configureStore({
  reducer: {
    auth: authReducer,               // Manages authentication state
    projects: projectsReducer,       // Manages CRUD operations for projects
    cohorts: cohortsReducer,         // Manages CRUD operations for cohorts
    projectMembers: projectMembersReducer, // Manages project member associations
    data: dataReducer,               // Manages additional data state if needed
    users: userReducer,              // Manages CRUD operations for users
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,       // Disable serializable check if using non-serializable values
    }),
});

export default store;



// // src/store/index.js
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
// import projectsReducer from './slices/projectsSlice';
// import cohortsReducer from './slices/cohortsSlice';
// import projectMembersReducer from './slices/projectMembersSlice';
// import dataReducer from './slices/dataSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,               // Manages authentication state
//     projects: projectsReducer,       // Manages CRUD operations for projects
//     cohorts: cohortsReducer,         // Manages CRUD operations for cohorts
//     projectMembers: projectMembersReducer, // Manages project member associations
//     data: dataReducer,               // Manages additional data state if needed
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,       // Disable serializable check if using non-serializable values
//     }),
// });

// export default store;



// // src/store/index.js
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
// import projectsReducer from './slices/projectsSlice';
// import cohortsReducer from './slices/cohortsSlice';
// import projectMembersReducer from './slices/projectMembersSlice';
// import dataReducer from './slices/dataSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     projects: projectsReducer,
//     cohorts: cohortsReducer,
//     projectMembers: projectMembersReducer, // Add projectMembers reducer
//     data: dataReducer, // Add general data reducer for DataTable if needed
//   },
// });

// export default store;



