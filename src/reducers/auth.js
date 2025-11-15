import { createSlice } from "@reduxjs/toolkit";

export const authSlice=  createSlice({
    name : "auth", 
    initialState : {
        userName : "null"
    }, 
    reducers : {
        setMe : (state, action) =>{
            state.userName = action.payload;
        }, 
    }
});

export const {setMe} = authSlice.actions ;
export default authSlice ;
