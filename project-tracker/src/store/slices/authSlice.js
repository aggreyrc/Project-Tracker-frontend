// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// Thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to login');
      }
      return await response.json(); // Contains user details including role
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
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user; // Store the user object from the response
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   role: 'student', // Default role
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// // Thunk for user login
// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (loginData, { rejectWithValue }) => {
//     try {
//       const response = await fetch('http://localhost:5000/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(loginData),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to login');
//       }
//       return await response.json(); // Assume this contains user details and role
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.role = action.payload.is_admin ? 'admin' : 'student'; // Set role based on admin status
//       state.isAuthenticated = true;
//       state.error = null;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.role = 'student';
//       state.isAuthenticated = false;
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
//         state.user = action.payload;
//         state.role = action.payload.is_admin ? 'admin' : 'student';
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setUser, logout } = authSlice.actions;
// export default authSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null
// };

// // Thunk for user registration
// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await fetch('http://localhost:5000/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userData)
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to register');
//       }
//       return await response.json();
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Thunk for user login
// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (loginData, { rejectWithValue }) => {
//     try {
//       const response = await fetch('http://localhost:5000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(loginData)
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to login');
//       }
//       return await response.json();
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//       state.error = null;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.error = null;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register user
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Login user
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { setUser, logout, setLoading, setError } = authSlice.actions;
// export default authSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//       state.error = null;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.error = null;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     }
//   }
// });

// export const { setUser, logout, setLoading, setError } = authSlice.actions;
// export default authSlice.reducer;