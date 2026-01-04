import axios from "axios";

const BACKEND = "http://localhost:8080/api/dir"
const TOKEN = window.localStorage.getItem("token"); 
const userAuthHeader = {
    "Authorization" : `Bearer ${TOKEN}`
}; 
export const loadContentsByParent = async (currentUserId, parentId)=>{
    const response = await axios.get(
        `${BACKEND}/getContents?userId=${currentUserId}&parentId=${parentId}`, {
            headers : userAuthHeader
        }
    ); 
    return response; 
}

export const createDirectory = async (directoryName,accessType, parentId )=>{
    const response = await axios.post(
        `${BACKEND}/create`, {
            directory_name : directoryName, 
            parent_id : parentId, 
            accessType : accessType
        }, {
            headers : userAuthHeader
        }
    ); 
    return response ;
}
