import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth.js";

export default configureStore({
    reducer : {
        // access by state.auth 
        auth : authSlice.reducer, 
    }, 
})