import { Container, Table } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../custom/contexts/authContext";
import { modalContext } from "../custom/contexts/modalContext";
import FileMenuContext from "./UploadMenu";
import { useDispatch, useSelector } from "react-redux";
import { loadHomeDir } from "../axiosRequests/homeLoad";
import { goBack, goInside, setDirectories } from "../reducers/contents";
import { FaFolderPlus } from "react-icons/fa6";
import { FaEllipsisH, FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";


// directory component
const Directory = ({directory, goInside}) =>{
    // console.log(directory)
    return (
        <Table.Tr key={directory.id} onDoubleClick={()=> goInside(directory)}>
            <Table.Td>
                {directory.name}
            </Table.Td>
            <Table.Td>
                {directory.creator.username}
            </Table.Td>
            <Table.Td>

            </Table.Td>
            
        </Table.Tr>
    )
}

const Directories = ({directories, goInside})=>{
    return (
        <Table.Tbody>
            {directories.map((directory, index) =>{
                return <Directory directory={directory} key={index} goInside={goInside}></Directory>
            })}
        </Table.Tbody>
    )
}

const FolderView = ()=>{
    const { folderId } = useParams(); 
// console.log("home");
    // context definitions
    const {currentUser} = useContext(authContext);
    const {opened, open, close, setUploadType ,logout}= useContext(modalContext); 
    // console.log(currentUser)

    // react redux functions
    // use selector defined
    const {currentPath, files, directories} = useSelector(state => state.contents);
    const dispatch = useDispatch() ; 
    // function to update directories to store
    const updateDirectories = (directories)=>{
        dispatch(setDirectories(directories)) ;
    }
    // function to go inside particular directory
    const goInsideFolder = (directory)=>{
        console.log(directory)
        setCurrDir({
            ...currDir, 
            name : directory.name, 
            id : directory.dir_id
        }); 
        dispatch(goInside(directory?.name)); 
    }
    const goToParent = ()=>{
        dispatch(goBack()); 
    }

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

    // component function definitions
    // function to get directories in current parent
    const getContents = async ()=>{
        setLoadStatus({...loadStatus, status: 1}); 
        const response = await loadHomeDir(
            currentUser?.id, 
            currentPath.length==0?0:currDir.id
        ) ; 
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
        setLoadStatus({...loadStatus, status: 0}); 
        updateDirectories(directories); 
    }; 
    

    

    // use effect definitions
    useEffect(()=>{
        // console.log('home effect ran')
        getContents();
    },[currentPath])

    
    

    if(loadStatus.status!==0){
        return (
            <div className="">
                Load error 
            </div>
        )
    }
    
    return (
        <Container>
            <div className="text-lg">
                {`/home/${currentUser?.username}/`}

            </div>
            <div id="home-parent-view-all-files-with-modifier-buttons" className="mt-5">
                
                <div id="modifier-buttons" className="flex flex-row justify-between items-center text-lg hover:[&>*>*]:cursor-pointer">
                    <div className="flex-1">
                        <button className="border border-solid border-black p-2" 
                            onClick={goToParent}
                        >
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
                        <button className="border border-solid border-black p-2">
                            <MdDelete></MdDelete>
                        </button>
                    </div>
                </div>
                <div id="actual-directory-contents" className="mt-5">
                    <Table stickyHeader stickyHeaderOffset={60} highlightOnHover={true}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Creator</Table.Th>
                                <Table.Th>Size</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Directories directories={directories} goInside={goInsideFolder}></Directories>
                    </Table>
                </div>
                
            </div>
        </Container>
    )
}; 

export default FolderView ;