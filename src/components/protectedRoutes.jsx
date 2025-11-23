import { Navigate, Outlet } from "react-router-dom";
import NotLoggedIn from "./NotLoggedIn";

const ProtectedRoutes = ({isAuthenticated})=>{
    return (
        isAuthenticated ? (
            <Outlet></Outlet>
        ) : (
            <NotLoggedIn></NotLoggedIn>
        )
    )
}; 

export default ProtectedRoutes; 