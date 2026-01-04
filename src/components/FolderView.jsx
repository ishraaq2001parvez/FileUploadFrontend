import { Container, Loader, Table } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../custom/contexts/authContext";
import { modalContext } from "../custom/contexts/modalContext";
import FileMenuContext from "./UploadMenu";
import { useDispatch, useSelector } from "react-redux";
import { loadContentsByParent } from "../axiosRequests/directory";
import { goBack, goInside, setDirectories } from "../reducers/contents";
import { FaFolderPlus } from "react-icons/fa6";
import { FaEllipsisH, FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";


// directory component
const Directory = ({directory, navigate}) =>{
    // console.log(directory)
    return (
        <Table.Tr key={directory.dir_id} onDoubleClick={()=> navigate(`/folder/${directory.dir_id}`)}>
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

const Directories = ({directories, navigate})=>{
    // console.log(directories) ;
    if(directories.length ===0 ){
        return (
            <Table.Tbody>
                <Table.Tr>
                    <Table.Td>
                        There are no items here .
                    </Table.Td>
                </Table.Tr>
            </Table.Tbody>
        )
    }
    return (
        <Table.Tbody>
            {directories.map((directory, index) =>{
                return <Directory directory={directory} key={index} navigate={navigate}></Directory>
            })}
        </Table.Tbody>
    )
}

const FolderView = ()=>{
    const { folderId } = useParams(); 
    // console.log(folderId)
    
// console.log("home");
    // context definitions
    const {currentUser} = useContext(authContext);
    const {open, setUploadType, setWorkingDirectory}= useContext(modalContext); 
    // console.log(currentUser)

    // react redux functions
    // use selector defined
    const {currentPath, files, directories} = useSelector(state => state.contents);
    const dispatch = useDispatch() ; 
    const navigate = useNavigate(); 
    // function to update directories to store
    const updateDirectories = (directories)=>{
        dispatch(setDirectories(directories)) ;
    }
    // function to go inside directory
    const goInside = (dirName) =>{
        dispatch(goInside(dirName)) ;
    }

    // function to go back up to parent
    const goBack = ()=>{
        dispatch(goBack()); 
    }

    // state definitions
    // get current directory for viewing
    const [currDir, setCurrDir] = useState({
        directory : null
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
    const getCurrentDirContents = async ()=>{
        setLoadStatus({...loadStatus, status: 1}); 
        
        const response = await loadContentsByParent(
            currentUser?.id, 
            folderId
        ) ; 
        // console.log(response); 
        if(response.status === 500){
            // if internal server error
            setLoadStatus({...loadStatus, status : 2}); 
            return ;
        }
        const {currentDirectory, directories, status} = response.data; 
        if(status=="NOT_FOUND"){
            setLoadStatus({...loadStatus, status : 3}); 
            return ;
        }
        setLoadStatus({...loadStatus, status: 0});
        setCurrDir({
            ...currDir, 
            directory : currentDirectory, 
        }) 
        setWorkingDirectory(currDir.directory) ;
        updateDirectories(directories); 
    }; 
    

    

    // use effect definitions
    useEffect(()=>{
        // console.log('folder view compoennt chnaged')
        getCurrentDirContents();
        
    },[folderId])

    
    

    if(loadStatus.status===1){
        return (
            <Container className="flex items-center justify-center mt-10">
                <Loader color="blue"></Loader>
            </Container>
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
                        <button className="border border-solid border-black p-2 disabled:text-stone-600 disabled:border-stone-600" 
                            disabled = {currDir.directory.parentId === null}
                            onClick={(e)=> {
                                e.preventDefault(); 
                                // console.log(currDir)
                                // goBack() ;
                                navigate(`/folder/${currDir?.directory.parentId}`) ;
                            }}
                        >
                            <FaEllipsisH></FaEllipsisH>
                        </button>
                    </div>
                    <div className="flex items-center mr-1 [&>button]:mr-1">
                        <button className="border border-solid border-black p-2" 
                            onClick={(e)=>{
                                e.preventDefault(); 
                                setUploadType(0); 
                                // console.log(currDir.directory)
                                setWorkingDirectory(currDir.directory) ;
                                open();
                            }}
                        >
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
                        <Directories directories={directories} navigate={navigate}></Directories>
                    </Table>
                </div>
                
            </div>
        </Container>
    )
}; 

export default FolderView ;