import axios from "axios";


const BACKEND = "http://localhost:8080/api/file"
const TOKEN = window.localStorage.getItem("token"); 
const userAuthHeader = {
    "Authorization" : `Bearer ${TOKEN}`
}; 

export const uploadMetadata = async (fileMetaData)=>{
    const response = await axios.post(
        `${BACKEND}/create`, fileMetaData, {
            headers : userAuthHeader
        }
    ); 
    return response ;
}

export const uploadChunk = async (fileId, chunkData) => {
    const response = await axios.post(
        `${BACKEND}/upload/${fileId}`, chunkData, {
            headers : userAuthHeader
        }
    ); 
    return response ;
}