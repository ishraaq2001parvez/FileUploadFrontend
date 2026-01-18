import { useEffect } from "react";
import { getMe } from "../axiosRequests/auth";

const MyProfile = ()=>{

    const getCurrentProfile = async ()=>{
        const response = await getMe() ;
        
        
    }
    // useffect for getting current profile
    useEffect(()=>{
        getCurrentProfile(); 
    }, [])
    return (
        <div>

        </div>
    ); 
}; 

export default MyProfile ;