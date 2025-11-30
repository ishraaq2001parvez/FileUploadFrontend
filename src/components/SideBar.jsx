import { FaPlus } from "react-icons/fa6";
import FileMenuContext from "./UploadMenu";

const SideBar = ({open, currentUser, setUploadType})=>{
    
    return (
        <div className="min-w-50 min-h-full p-5 bg-gray-50 flex flex-col w-auto">
            <FileMenuContext
                position={`bottom-start`}
                targetComponent={
                    <button
                            className="p-2 bg-white rounded-md shadow-lg hover:cursor-pointer hover:bg-gray-200 w-30"
                        >
                        <div className="flex flex-row p-3 content-center">
                            <div className="text-lg my-auto mr-2">
                                <FaPlus></FaPlus>
                            </div>
                            <p className="text-lg">New</p>
                        </div>
                    </button>
            }
                offset={-70}
                open={open}
                setUploadType={setUploadType}
                
            ></FileMenuContext>
            
            <div 
                className="p-2 hover:rounded-2xl hover:bg-gray-200 hover:cursor-pointer mt-10"

            >
                <div>
                    My drive
                </div>
            </div>
            <div>
                Storage
            </div>
            
            
        </div>
    ); 
}; 


export default SideBar; 