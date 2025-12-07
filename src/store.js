import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth.js";
import contentSlice from "./reducers/contents.js";

export default configureStore({
    reducer : {
        // access by state.auth 
        auth : authSlice.reducer, 
        contents : contentSlice.reducer, 
    }, 
})