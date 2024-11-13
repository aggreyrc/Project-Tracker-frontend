// To store authentication state in Redux

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
    },
});

//exporting actions
export const{loginSuccess,loginFailure,logout} = authSlice.actions;

// export reducer to be used in the store
export default authSlice.reducer;