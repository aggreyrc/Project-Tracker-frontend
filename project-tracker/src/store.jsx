import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Components/authSlice";  // Assuming you have an authSlice for login state

const store = configureStore({
  reducer: {
    auth: authReducer,  // Adding your auth reducer to the store
  },
  devTools: process.env.NODE_ENV !== 'production',  // Enable in development mode
});

export default store