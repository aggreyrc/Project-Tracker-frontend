// To store authentication state in Reduxc

// reference;
// login: https://dev.to/danielonugha0/building-a-login-system-using-redux-5ce3

import { createSlice } from '@reduxjs/toolkit'


const authSlice =createSlice({
    name: 'auth',                   //name of this slice store
    initialState:{                  
        user:null,                  //user data
        isAdmin:false,              //indicates if the user is an admin
        isAuthenticated: false,     //check if the user is authenticated
        error: null,                //authentication error messages
    },

    reducers:{
        // Action that handles successful login
        loginSuccess: (state, action) => {
            state.user = action.payload.user;          //store user data in the state
            state.isAdmin = action.payload.isAdmin;    //store user role(admin or not)
            state.isAuthenticated =true;               //mark the user as authenticated
            state.error = null;                        //clear any previous errors
        },
        // Action that handles login failure
        loginFailure: (state, action) =>{
            state.user =null;                           //clear user data
            state.isAdmin=false;                        //clear role data
            state.isAuthenticated=false;                //marks as user as not authenticated
            state.error =action.payload;                //store error message
        },
        // Action that handles logout
        logout: (state) =>{
            state.user = null;                          //clear user data
            state.isAdmin = false;                      //clear role data
            state.isAuthenticated = false;              //mark the user as logged out
            state.error = null;                         //clear any errors
        },
        // Checksession: Action to set user data after successful login
        setUser: (state, action) =>{
            state.user = action.payload.user;
            state.isAdmin = action.payload.isAdmin;
            state.isAuthenticated= !!action.payload.user  //ensures that state.isAuthenticated is set to true only if action.payload.user is a valid 
            state.error = null;                           //clear any errors
        },
        //Checksession: Action to clear user data(logout)
        clearUser: (state) =>{
            state.user = null;
            state.isAdmin = false;
            state.isAuthenticated = false;
            state.error = null;
        }

       

    },
});

//exporting actions
export const{loginSuccess,loginFailure,logout,setUser,clearUser} = authSlice.actions;

// export reducer to be used in the store
export default authSlice.reducer;