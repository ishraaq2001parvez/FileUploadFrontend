import { createSlice } from "@reduxjs/toolkit";

export const authSlice=  createSlice({
    name : "auth", 
    initialState : {
        currentUser : null,
        token : window.localStorage.getItem("token") || null
    }, 
    reducers : {
        setMe : (state, action) =>{
            state.currentUser = action.payload;
        }, 
        setToken : (state, action) =>{
            state.token = action.payload; 
        }
    }
});

export const {setMe, setToken} = authSlice.actions ;
export default authSlice ;
