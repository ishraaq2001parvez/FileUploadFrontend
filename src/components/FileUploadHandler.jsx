import { Modal } from "@mantine/core";
import { useContext, useState } from "react";
import { FileIcon } from "react-file-icon";
import { fileUploadContext } from "../custom/contexts/fileUploadContext";
import FolderCreate from "./FolderCreate";
import FileUpload from "./FileUpload";
import FolderUpload from "./FolderUpload";

const FileUploadHandler = ()=>{
    const {uploadType} = useContext(fileUploadContext) ;
    // set state for choosing files
    const [fileChosen, setFileChosen] = useState({
        file : null, 
        fileError : "", 
        status : ""
    });

    const chooseFileToUpload = async (e)=>{
        e.stopPropagation(); 
        const file = await fileUploader.getFileToUpload();
        console.log(file)
        setFileChosen({...fileChosen, file : file}); 
    }

    const removeSelectedFile = async (e) =>{
        e.stopPropagation(); 
        fileUploader.removeUploadedFile(); 
        setFileChosen({...fileChosen, file : null, fileError : ""}); 
    }
    
    const startUpload = async (e) =>{
        e.stopPropagation() ;
        const fileStatus = await fileUploader.createFile() ;
        setFileChosen({...fileChosen, status : fileStatus}) ;
    }

    const uploadChunk = async (e) =>{
        e.stopPropagation() ;
        const uploadStatus = await fileUploader.uploadChunk() ;
    }

    if(uploadType==0){
        return (
            <div className="bg-gray-100 p-2">
                <FolderCreate></FolderCreate>
            </div>
        )
    } else if(uploadType === 1){
        return (
            <div className="bg-gray-100 p-2">
                <FileUpload></FileUpload>
            </div>
        )
    }
    return(
        <div className="bg-gray-100 p-2">
            <FolderUpload></FolderUpload>
        </div>
    )
}

export default FileUploadHandler ;