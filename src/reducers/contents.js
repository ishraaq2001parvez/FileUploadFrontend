import { createSlice } from "@reduxjs/toolkit";

export const contentSlice= createSlice({
    name: "contents", 
    initialState : {
        currentPath : [], 
        files : [], 
        directories: []
    }, 
    reducers : {
        goInside : (state, action) =>{
            state.currentPath = [...state.currentPath, action.payload] ;
        }, 
        goBack : (state)=>{
            state.currentPath = state.currentPath.slice(0,-1); 
        }, 
        setFiles : (state, action) =>{
            state.files = action.payload; 
        }, 
        setDirectories : (state, action) =>{
            state.directories = action.payload; 
        }, 
        addDirectory : (state, action) =>{
            state.directories = [...state.directories, action.payload]
        }, 
        uploadFile : (state, action) => {
            state.files = [...state.files, action.payload]
        }
    }
}); 

export const {goInside, goBack, setFiles, setDirectories, addDirectory} = contentSlice.actions; 
export default contentSlice; 