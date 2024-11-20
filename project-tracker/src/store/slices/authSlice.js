// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
//   canAddProjects: false, // New field to track project creation permissions
// };

// // Thunk for user login
// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (loginData, { rejectWithValue }) => {
//     try {
//       const response = await fetch('https://phase-5-project-55r2.onrender.com/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(loginData),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to login');
//       }
//       return await response.json(); // Contains user details including role
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.canAddProjects = false; // Reset on logout
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload.user; // Store the user object
//         state.isAuthenticated = true;
//         state.loading = false;
//         // Check if the user can add projects (admin or student role)
//         state.canAddProjects =
//           action.payload.user.is_admin || action.payload.user.role === 'student';
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Retrieve user from localStorage
  isAuthenticated: !!localStorage.getItem('token'), // Check if a token exists
  loading: false,
  error: null,
  canAddProjects: JSON.parse(localStorage.getItem('canAddProjects')) || false, // Retrieve permissions
};

// Thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://phase-5-project-55r2.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to login');
      }
      return await response.json(); // Contains user details including role and token
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.canAddProjects = false;
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('canAddProjects');
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user; // Store user object
        state.isAuthenticated = true;
        state.loading = false;
        state.canAddProjects =
          action.payload.user.is_admin || action.payload.user.role === 'student';

        // Persist user data and permissions in localStorage
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token); // Assume token is part of response
        localStorage.setItem('canAddProjects', JSON.stringify(state.canAddProjects));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { logout, resetError } = authSlice.actions;
export default authSlice.reducer;


