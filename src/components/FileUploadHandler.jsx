import { Modal } from "@mantine/core";
import { useContext, useState } from "react";
import { FileIcon } from "react-file-icon";
import { fileUploadContext } from "../custom/contexts/fileUploadContext";
import FolderCreate from "./FolderCreate";
import FileUpload from "./FileUpload";
import FolderUpload from "./FolderUpload";

const FileUploadHandler = ()=>{
    const {uploadType} = useContext(fileUploadContext) ;
    
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