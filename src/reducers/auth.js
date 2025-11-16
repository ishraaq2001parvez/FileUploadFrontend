import { createSlice } from "@reduxjs/toolkit";

export const authSlice=  createSlice({
    name : "auth", 
    initialState : {
        userName : "null", 
        token : localStorage.getItem("token") || null
    }, 
    reducers : {
        setMe : (state, action) =>{
            state.userName = action.payload;
        }, 
        setToken : (state, action) =>{
            state.token = action.payload; 
        }
    }
});

export const {setMe, setToken} = authSlice.actions ;
export default authSlice ;
