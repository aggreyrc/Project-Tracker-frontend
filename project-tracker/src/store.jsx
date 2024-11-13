import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Components/authSlice";  // Assuming you have an authSlice for login state

const store = configureStore({
  reducer: {
    auth: authReducer,  // Adding your auth reducer to the store
  },
});

export default store