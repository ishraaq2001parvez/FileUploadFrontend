import { createSlice } from "@reduxjs/toolkit";

export const contentSlice= createSlice({
    name: "contents", 
    initialState : {
        currentPath : [""], 
        files : [], 
        directories: []
    }, 
    reducers : {
        goInside : (state, action) =>{
            state.currentPath = [...state.currentPath, action.payload] ;
        }, 
        goBack : (state, action)=>{
            state.currentPath = state.currentPath.slice(0,-1); 
        }, 
        setFiles : (state, action) =>{
            state.files = action.payload; 
        }, 
        setDirectories : (state, action) =>{
            state.directories = action.payload; 
        }
    }
}); 

export const {setPath, setFiles, setDirectories} = contentSlice.actions; 
export default contentSlice; 