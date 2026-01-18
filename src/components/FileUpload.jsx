import { useContext, useState } from "react";
import { fileUploadContext } from "../custom/contexts/fileUploadContext";
import { Button, Container, FileInput } from "@mantine/core";


const FileUpload = ()=>{
    // context defintions
    const {fileUploader, close} = useContext(fileUploadContext) ;

    // state definition for file upload
    const [file, setFile] = useState(null) ;
    const [fileUploadError, setFileUploadError] = useState("") ;
    // 0 - not started, 1 - uploading metadata, 2 - uploading file, 3 - complete
    const [uploadState, setUploadState] = useState(0) ;

    
    // function for proceeding to actual upload
    const proceedUpload = async (e)=>{
        e.preventDefault() ;
        console.log(file)
        console.log(fileUploader)
        fileUploader.clearUploadableContents() ;
        fileUploader.setFileToUpload(file) ;
        const metadata = await fileUploader.getFileMetaData() ;
        console.log(metadata) ;

        setUploadState(1) ;

    }
    return (
        <Container className="p-5 h-60">
            <div className ="flex flex-row">
                <p className="text-lg">
                    {`Location: ${fileUploader.getCurrentFolder().name}`}
                </p>
            </div>
            <div className="" id="modal_file_uploader">
                <FileInput
                    label="Upload"
                    description = "Choose file to upload"
                    placeholder = "Choose file"
                    value={file}
                    onChange={setFile}
                    clearable ={true}
                    error = {fileUploadError}
                >
                </FileInput>
            </div>
            <Button className="mt-5"
                disabled ={file === null}
                onClick={proceedUpload}
            >
                Begin Upload
            </Button>
            
        </Container>
    )
}; 

export default FileUpload ;
