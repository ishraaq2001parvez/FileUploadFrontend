import { Navigate, Outlet } from "react-router-dom";
import NotLoggedIn from "./NotLoggedIn";
import MainLayout from "./mainLayout";

const ProtectedRoutes = ({ currentUser, isAuthenticated,logout})=>{
    if(!isAuthenticated){
        return (
            <Navigate to={`/auth`} replace></Navigate>
        )
    }

    return (
        <MainLayout currentUser={currentUser} logout={logout}>
            <Outlet></Outlet>
        </MainLayout>
    )
}; 

export default ProtectedRoutes; 