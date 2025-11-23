import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import { getMe } from "../axiosRequests/auth";
import { useEffect } from "react";
import { setMe } from "../reducers/auth";
import SideBar from "./SideBar";
import MainContent from "./MainContent";

function Home({currentUser, logout}){
    
    return (
        <div className="main-container bg-gray-100 flex flex-col">
            <Nav currentUser={currentUser}></Nav>
            <div className="flex-grow flex flex-row h-130">
                <SideBar></SideBar>
                <MainContent currentUser={currentUser}></MainContent>
            </div>
        </div>
    )
}

export default Home; 