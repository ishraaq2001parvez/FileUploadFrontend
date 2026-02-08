import { useContext, useState } from "react";
import { fileUploadContext } from "../custom/contexts/fileUploadContext";
import { Button, Container, FileInput, Progress } from "@mantine/core";
import { showFailure, showSuccess } from "../custom/toaster";


const FileUpload = ()=>{
    // context defintions
    const {fileUploader} = useContext(fileUploadContext) ;

    // state definition for seelcting file
    const [fileState, setFileState] = useState({
        file : null, 
        fileError : ""
    }) ;

    const [uploadStatus, setUploadStatus] = useState({
        // 0 - not started, 1 - uploading, 2 - done!, 3 -failed
        status      : 0, 
        progress    : 0, 
        message     : "Beginning upload..."
    }); 
    
    // function for choosing file to upload
    const selectFileToUpload= async (e)=>{
        e.stopPropagation() ;
        
        const [fileHandle] = await window.showOpenFilePicker() ;
        const file = await fileHandle?.getFile() ;
        console.log(file) ;
        setFileState({
            ...fileState, 
            file : file
        }) ;
    }


    // function for actual uploading
    const proceedUpload = async (e)=>{
        e.preventDefault() ;
        setUploadStatus({
            ...uploadStatus, status : 1
        })
        console.log("proceedigng to upload") ;
        await fileUploader.clearUploadableContents() ;
        await fileUploader.setFileToUpload(fileState.file) ;
        const metdata = await fileUploader.getFileMetaData(); 
        console.log(metdata) ;
        const response = await fileUploader.uploadFile(uploadStatus, setUploadStatus) ;
        if(response.status === "CREATED") { 
            showSuccess(`File ${fileState.file.name} uploaded successfully!`)
        } else if(response.status === "SERVER_ERROR"){
            showFailure("Upload Failed")
        }
    }
    return (
        <Container className="p-5 h-60">
            <div className ="flex flex-row">
                <p className="text-lg">
                    {`Location: ${fileUploader.getCurrentFolder().name}`}
                </p>
            </div>
            <div className="mt-5 flex flex-row" id="modal_file_uploader">
                <Button
                    onClick={selectFileToUpload}
                    className="my-auto"
                    disabled = {uploadStatus.status === 1}
                >
                    Choose File
                </Button>
                <div id ="file_selected"
                    className="mx-auto border-black border-2 p-3"
                >
                    {fileState.file ? `${fileState.file.name.substring(0, Math.min(
                        fileState.file.name.length, 10
                    ))}.${fileState.file.name.length>10 && ".."}${fileState.file.name.split('.').pop()}` : "No file selected"}

                </div>

            </div>
            <div className="flex flex-row mt-5">
                <Button className=""
                    disabled ={fileState.file===null || uploadStatus.status !== 0}
                    onClick={proceedUpload}
                >
                    Begin Upload
                </Button>

                {uploadStatus.status !==0  && (
                    <div className="my-auto mx-auto">
                        {uploadStatus.message}

                    </div>
                )}
            </div>
            {uploadStatus.status !==0 && (
                <div className="mt-5">
                    <Progress
                        radius={`md`}
                        value={uploadStatus.progress}
                        striped = {true}
                        animated = {true}
                    >

                    </Progress>
                </div>
            )}

            
            
        </Container>
    )
}; 

export default FileUpload ;
