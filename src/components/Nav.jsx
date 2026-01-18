import { Image, Menu } from "@mantine/core";
import Search from "./Search";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

function Nav({currentUser, logout}){  
    // console.log(currentUser)  ;
    if(!currentUser){
        return (
            <div>Not found</div>
        )
    }
    // function to handle logout
    const handleLogout = (e)=>{
        e.preventDefault(); 
        logout(); 
    }
    return (
        <div className="w-full h-auto flex flex-row ">
            <div id="logo-nav" className="h-full w-1/10">
                <Image src={`src/assets/logo.png`} h={`100%`} w={`auto`}/>
            </div>
            <div id="search-nav" className="h-full w-2/3 pt-2">
                <Search></Search>
            </div>
            <div id="profile-nav" className="my-auto border-1">
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <button className=" p-3">
                            {`Logged in as ${currentUser.username}`}
                        </button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>
                            Profile
                        </Menu.Label>
                        <Link to={`/profile/me`}>
                            <Menu.Item leftSection={<CgProfile></CgProfile>}>
                                Profile
                            </Menu.Item>
                        </Link>
                        
                        <Menu.Divider></Menu.Divider>
                        <Menu.Item leftSection={<CiLogout></CiLogout>}>                           
                            <button onClick={handleLogout}>
                                Logout
                            </button>
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
        </div>
    )
}; 

export default Nav;