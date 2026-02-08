import axios from "axios";


const BACKEND = "http://localhost:8080/api/file"
const TOKEN = window.localStorage.getItem("token"); 
const userAuthHeader = {
    "Authorization" : `Bearer ${TOKEN}`
}; 

export const uploadMetadata = async (fileMetaData)=>{
    try {
        const response = await axios.post(
            `${BACKEND}/create`, fileMetaData, {
                headers : userAuthHeader
            }
        ); 
        return response ;
    } catch (error) {
        console.error(error); 
        return  {
            status : 1403
        }; 
    }
    
}

export const uploadChunk = async (fileId, chunkData) => {
    try {
        const response = await axios.post(
            `${BACKEND}/upload/${fileId}`, chunkData, {
                headers : userAuthHeader
            }
        ); 
        return response ;
    } catch (error) {
        console.error(error); 
        return  {
            status : 1403
        }; 
    }
    
}

export const deleteFile = async (fileId) =>{
    try {
        const response =await axios.post(
            `${BACKEND}/delete/${fileId}`, {
                headers : userAuthHeader
            }
        ); 
        return response ;    
    } catch (error) {
        console.error(error); 
        return  {
            status: 1403
        }; 
    }
    
}