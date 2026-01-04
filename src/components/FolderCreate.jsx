import { Container, Input, InputWrapper, NativeSelect, TextInput } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { fileUploadContext } from "../custom/contexts/fileUploadContext";


const FolderCreate = ()=>{
    // console.log(folderId)
    // define file uploader object from main layout
    const {fileUploader} = useContext(fileUploadContext) ;
    
    // state definitions for directory create input
    const [createdDirectory, setCreatedDirectory] = useState({
        directory_name : "",
        accessType : 0
    }); 
    // 0 - not started, 1 - in the process, 2 - successful, 3 - failed
    const [creatingState, setCreatingState] = useState({
        status : 0, 
        error  : ""
    }) ;

    // function for handling the create 
    const handleCreate = async (e)=>{
        e.preventDefault() ;
        console.log("proceeding for folder creation") ;
        // console.log(createdDirectory); 
        fileUploader.setDirectoryToCreate(
            createdDirectory.directory_name, 
            createdDirectory.accessType
        ); 
        console.log(fileUploader.getDirectoryToCreate()) ;
        const response = await fileUploader.processDirectoryCreate(); 
        
        

    }

    useEffect(()=>{
        // console.log("foldercreate useeffect run") ;
        setCreatingState(0) ;
        console.log(fileUploader.getCurrentFolder()) ;
        // console.log(fileUploader)

    }, []) ;
    // console.log(currentUser, fileUploader)
    return (
        <Container className="p-5">
            <div className ="flex flex-row">
                <p className="text-lg">
                    {`Location: ${fileUploader.getCurrentFolder().name}`}
                </p>
            </div>
            <div id="folder-name-input-parent" className="mt-2 items-center">
                
                <TextInput
                    required = {true}
                    label = "Directory Name"
                    placeholder="Enter the directory to be created"
                    className="w-full"
                    error = {creatingState.error}
                    onChange={(e)=>{
                        e.preventDefault() ;
                        setCreatedDirectory({...createdDirectory, directory_name : e.target.value})
                    }}
                >

                </TextInput>
                <NativeSelect
                    label = "Select the access type"
                    className="mt-2"
                    data={[
                        {label : "Private (no one can be given access to this folder)",  value : 0}, 
                        {label : "Protected (users need to raise access to view items in this folder)", value : 1}, 
                        {label : "Public (Anyone can access this folder anytime)", value : 2}
                    ]}
                    onChange={(e)=>{
                        e.preventDefault(); 
                        setCreatedDirectory({...createdDirectory, accessType : e.target.value}) ;
                    }}
                >

                </NativeSelect>
                
            </div>
            <button id="folder-create-button" className="mt-5 bg-blue-300 p-2 w-full rounded-lg"
                disabled = {creatingState === 1}
                onClick={handleCreate}
            >
                <p className="font-medium">Create</p>
            </button>
        </Container>
    )
};

export default FolderCreate ;