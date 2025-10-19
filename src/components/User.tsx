import { useEffect, useState } from "react";

type User = {
    id?: number, 
    userName?:string
}


const User = ()=>{
    const[user, setUser] = useState<User>({}); 
    useEffect(()=>{
        setUser({
            id: 0, userName : "u"
        }); 
    }, []); 
    console.log(user)
    return (
        <div>
            {user!.id==0 && <>
                
            </>}            
        </div>
    )
};
export default User; 
