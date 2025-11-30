import { useContext, useState } from "react";
import { fileUploadContext } from "../custom/contexts/fileUploadContext";
import {authContext} from "../custom/contexts/authContext"; 
import { Container, TextInput } from "@mantine/core";


const FolderCreate = ()=>{
    const {fileUploader} = useContext(fileUploadContext) ;
    const {currentUser} = useContext(authContext); 
    // console.log(currentUser);
    const [folderState, setFolderState] = useState({
        name : fileUploader.getFolder() || null, 
        state: 0, 
        error : ""
    }) ;
    // console.log(currentUser, fileUploader)
    return (
        <Container>
            <p>Folder location : </p>
            <div className="flex flex-row align-items-center">
                <p>{`/home/${currentUser.username}/`}</p>
                <TextInput
                    onChange={(e)=>{
                        e.preventDefault(); 
                        setFolderState({...folderState, name: e.target.value})
                    }}
                ></TextInput>
            </div>
            <button>

            </button>
        </Container>
    )
};

export default FolderCreate ;