import { Image, Input } from "@mantine/core";
import Search from "./Search";
import { useSelector } from "react-redux";

function Nav({currentUser}){  
    // console.log(currentUser)  ;
    if(!currentUser){
        return (
            <div>Not found</div>
        )
    }
    return (
        
        <div className="w-full  h-20 flex flex-row ">
            <div id="logo-nav" className="h-full w-1/10">
                <Image src={`src/assets/logo.png`} h={`100%`} w={`auto`}/>
            </div>
            <div id="search-nav" className="h-full w-2/3 pt-2">
                <Search></Search>
            </div>
            <div id="profile-nav" className="my-auto">
                Logged in as {currentUser.username}
            </div>
        </div>
    )
}; 

export default Nav;