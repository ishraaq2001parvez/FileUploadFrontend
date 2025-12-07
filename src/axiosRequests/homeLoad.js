import axios from "axios";

const BACKEND = "http://localhost:8080/api/dir"
const TOKEN = window.localStorage.getItem("token"); 

export const loadHomeDir = async (currentUserId, parentId)=>{
    const response = await axios.get(
        `${BACKEND}/getContents?userId=${currentUserId}&parentId=${parentId}`, {
            headers : {
                "Authorization" : `Bearer ${TOKEN}`
            }
        }
    ); 
    return response; 
}