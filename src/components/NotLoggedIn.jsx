import { Link, Navigate } from "react-router-dom";

const NotLoggedIn = ()=>{
    return (
        <div className="main-container">
            <div className="h-1/2 w-1/2 bg-green-200 center-element-within-full">
                <div className="p-10">
                    <div className="text-2xl mb-10">
                        OOPS! You need to log in to continue using our services. 
                    </div>
                    <Link to={"/auth"}>
                        <p className="text-blue-800">
                            Please log in, or register here.
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}; 
export default NotLoggedIn ;