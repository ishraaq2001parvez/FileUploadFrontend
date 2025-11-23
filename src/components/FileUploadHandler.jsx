import { Modal } from "@mantine/core";
import { useState } from "react";
import { FileIcon } from "react-file-icon";


const FileUploadHandler = ({currentFileUploader, currentUser})=>{

    // set state for choosing files
    const [fileChosen, setFileChosen] = useState({
        file : null, 
        fileError : "", 
        status : ""
    });

    const chooseFileToUpload = async (e)=>{
        e.stopPropagation(); 
        const file = await currentFileUploader.getFileToUpload();
        console.log(file)
        setFileChosen({...fileChosen, file : file}); 
    }

    const removeSelectedFile = async (e) =>{
        e.stopPropagation(); 
        currentFileUploader.removeUploadedFile(); 
        setFileChosen({...fileChosen, file : null, fileError : ""}); 
    }
    
    const startUpload = async (e) =>{
        e.stopPropagation() ;
        const fileStatus = await currentFileUploader.createFile() ;
        setFileChosen({...fileChosen, status : fileStatus}) ;
    }

    const uploadChunk = async (e) =>{
        e.stopPropagation() ;
        const uploadStatus = await currentFileUploader.uploadChunk() ;
    }

    return (
        <div className="bg-gray-100 h-80 p-5">
            <button className="p-2 bg-blue-300 text-white"
                onClick={chooseFileToUpload}
            >
                Choose file
            </button>
            <p className="text-sm mb-10">
                {`*File size must be <=2gb`}
            </p>
            {fileChosen.file && (
                <div className="">
                    <div className="flex flex-row px-5">
                        <div className="w-10 h-10">
                            <FileIcon extension={`${currentFileUploader.getFileExtension()}`}></FileIcon>
                        </div>

                        
                        <div className="ml-auto">
                            <p className="text-md">{`${currentFileUploader.getFileName()}`}</p>
                            <p className="text-sm">
                                {`${Math.round(currentFileUploader.getFileSize()/1024)} kb`}
                            </p>
                            <button 
                                className="bg-red-300 p-2 mt-5 rounded-md"
                                onClick={removeSelectedFile}    
                            >
                                
                                    Remove file
                            </button>
                        </div>
                    </div>
                    
                        
                    

                </div>
            )}
        </div>
    ); 
}

export default FileUploadHandler ;