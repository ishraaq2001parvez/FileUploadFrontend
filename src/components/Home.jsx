import { Container } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../custom/contexts/authContext";
import { modalContext } from "../custom/contexts/modalContext";
import FileMenuContext from "./UploadMenu";
import { useDispatch, useSelector } from "react-redux";
import { loadHomeDir } from "../axiosRequests/homeLoad";
import { setDirectories } from "../reducers/contents";
import { FaFolderPlus } from "react-icons/fa6";
import { FaEllipsisH, FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function Home(){
    const {currentUser} = useContext(authContext);
    const {opened, open, close, setUploadType ,logout}= useContext(modalContext); 
    // console.log(currentUser)

    // state definitions
    // get current directory for viewing
    const [currDir, setCurrDir] = useState({
        name : currentUser?.userName, 
        id : 0
    }); 
    // get the load status
    const [loadStatus, setLoadStatus] = useState({
        // 0 -> loaded, 1->loading, 2->server_error, 2->not_found
        status : 1,
    }); 
    // get current selected directories
    const [selectedDirectories, setSelectedDirectories] =useState([]); 

    // use selector defined
    const {currentPath, files, directories} = useSelector(state => state.contents);
    const dispatch = useDispatch() ; 


    // function to update directories to store
    const updateWorkingDirectory = (directories)=>{
        dispatch(setDirectories(directories)) ;
    }
    // function to get directories in current parent
    const getContents = async ()=>{
        const response = await loadHomeDir(currentUser?.id, currDir.name===currentUser?.userName?0:currDir.id) ; 
        // console.log(response); 
        if(response.status === 500){
            // if internal server error
            setLoadStatus({...loadStatus, status : 2}); 
            return ;
        }
        const {directories, status} = response.data; 
        if(status=="NOT_FOUND"){
            setLoadStatus({...loadStatus, status : 3}); 
            return ;
        }
        updateWorkingDirectory(directories); 
    }

    useEffect(()=>{
        // console.log('home effect ran')
        getContents();
    },[currentPath])
    
    return (
        <Container>
            <FileMenuContext
                position={`right-end`}
                targetComponent={
                    <button className="hover:cursor-pointer hover:bg-gray-100 rounded-lg p-2">
                        <p className="text-4xl">
                            My Drive
                        </p>
                    </button>
                }
                open={open}
                setUploadType={setUploadType}
            >

            </FileMenuContext>
            <div id="home-parent-view-all-files-with-modifier-buttons" className="mt-5">
                
                <div id="modifier-buttons" className="flex flex-row justify-between items-center text-lg">
                    <div className="flex-1">
                        <button className="border border-solid border-black p-2">
                            <FaEllipsisH></FaEllipsisH>
                        </button>
                    </div>
                    <div className="flex items-center mr-1 [&>button]:mr-1">
                        <button className="border border-solid border-black p-2">
                            <FaFolderPlus></FaFolderPlus>
                        </button>
                        <button className="border border-solid border-black p-2">
                            <FaFileUpload></FaFileUpload>
                        </button>
                        {selectedDirectories.length >0 &&<button className="border border-solid border-black p-2">
                            <MdDelete></MdDelete>
                        </button>}
                        <button className="border border-solid border-black p-2">
                            <FaFolderPlus></FaFolderPlus>
                        </button>
                    </div>
                </div>
                <div id="">

                </div>
                
            </div>
        </Container>
    )
}

export default Home; 