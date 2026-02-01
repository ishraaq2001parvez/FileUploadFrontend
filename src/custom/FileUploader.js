import { data } from "react-router-dom";
import { createDirectory } from "../axiosRequests/directory";
import { uploadChunk, uploadMetadata } from "../axiosRequests/file";

class FileUploader {
    // constructor class
    constructor(){
        console.log("constructor was called") ;
        this.LIMITS = {
            MAX_SIZE : 2147483648 ,
            CHUNK_SIZE : 5*1024*1024
        }
        this.fileToUpload       = null ;
        this.currentDirectory   = null ;
        this.directoryToCreate  = "" ;
        this.directoryToUpload  = null ;
        this.fileMetaData       = null ;
        this.uploadProgress     = 0; 
        this.uploadMessage      = ""
    }


    // function to get max size allowed
    getMaxSize = ()=>{
        return this.LIMITS.MAX_SIZE ;
    }

    getMaxChunkSize = ()=>{
        return this.LIMITS.CHUNK_SIZE ;
    }

    toBase64 = (buffer) =>{
        try {
            let binary = '';
            const bytes = new Uint8Array(buffer);
            for (let i = 0; i < bytes.byteLength; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return btoa(binary);
        } catch (error) {
            console.error(error)
        }
        
    }
    // clear previous contents
    clearContents = () =>{
        this.fileToUpload = null; 
        this.currentDirectory = null ;
        this.directoryToUpload = null ;
        this.directoryToCreate = "" ;
    }
    // clear only uploadable contents
    clearUploadableContents = ()=>{
        this.fileToUpload = null ;
        this.directoryToUpload = null ;
        this.directoryToCreate  = "" ;
    }
    // return the folder that we currently need to upload
    getCurrentFolder = ()=>{
        return this.currentDirectory ;
    }


    // directory functions
    // set the current working directory
    setCurrentDirectory = (directory) =>{
        // console.log("current directory changed in fileuploader class")
        this.currentDirectory = directory ;
        return  ;
    }

    // get directory to create
    getDirectoryToCreate = ()=>{
        return this.directoryToCreate ;
    }
    // set directory to create
    setDirectoryToCreate = (name, accessType)=>{
        this.directoryToCreate = {
            name: name, 
            accessType : accessType
        } ;
        return this.directoryToCreate; 
    }
    // process directory create
    processDirectoryCreate = async ()=>{
        // send axios request and return response
        const response = await createDirectory(
            this.directoryToCreate.name, 
            this.directoryToCreate.accessType,
            this.currentDirectory.dir_id
        ); 
        return response ;
    }


    // file uupload functions
    // get current file object
    getFile = ()=>{
        return this.fileToUpload ;
    }

    
    // set file to upload
    setFileToUpload = (file)=>{
        this.fileToUpload = file ;
    }
    // get file metadata
    getFileMetaData = async ()=>{
        const headerBlob = this.fileToUpload.slice(0, 8);
        const footerBlob = this.fileToUpload.slice(
            this.fileToUpload.size - 8, this.fileToUpload.size
        ) ;
        const headerBuffer = await headerBlob.arrayBuffer(); 
        const footerBuffer = await footerBlob.arrayBuffer(); 
        // 3. Convert Header to Hex String for the "Signature"
        const signature = Array.from(new Uint8Array(headerBuffer))
            .map(b => b.toString(16).padStart(2, '0').toUpperCase())
            .join('');

        

        return this.fileMetaData =  {
            dirId           : this.currentDirectory.dir_id, 
            fileName        : this.fileToUpload.name,
            mimeType        : this.fileToUpload.type, 
            accessType      : 0, 
            chunkCount      : Math.ceil(this.fileToUpload.size / this.getMaxChunkSize()), 
            fileHeader      : this.toBase64(headerBuffer) , 
            fileFooter      : this.toBase64(footerBuffer) ,  
            fileSignature   : signature,                 
            extension       : this.fileToUpload.name.split(".").pop()
        };
        

    }
    
    // function to check if file size is within limits
    validateSize = ()=>{
        try {
            if(!this.fileToUpload){
                throw new Error("File has not been selected yet");
            }
            return this.fileToUpload?.size <= this.getMaxSize() ;
        } catch (error) {
            console.log(error); 
        }
    }

    // filler function to handle uploads
    uploadFile = async (uploadStatus, setUploadStatus)=>{
        const response = await this.uploadMetadata(); 
        let uploadedFile = null ;
        console.log(response); 

        if(response.status === 403) {
            setUploadStatus({...uploadStatus, status : 3,message : "Server error ..."}); 
            console.log("server error"); 
            return ;
        } else if(response.data.status === "SERVER_ERROR") {
            setUploadStatus({...uploadStatus, status : 3,message : "Server error ..."}); 
            return ;
        } else if(response.data.status === "CREATED") {
            setUploadStatus({...uploadStatus,status : 1,  
                message : "File created on server, beginning file upload"
            }); 
            uploadedFile = response.data.file; 
        }

        let startIndex =0, endIndex = this.LIMITS.CHUNK_SIZE, chunksUploaded = 0;
        while(chunksUploaded < this.fileMetaData.chunkCount) {
            const response = await this.uploadSingleChunk(uploadedFile.file_id, startIndex, endIndex, chunksUploaded) ;
            console.log(response) ;
            if(response.status === 403) {
                setUploadStatus({
                    ...uploadStatus, status : 3, message : "File Upload failed due to server error"
                }); 
                break ;
            } else if(response.data.status === "SERVER_ERROR") {
                setUploadStatus({
                    ...uploadStatus, status : 3, message: "Server error"
                })
                break ;
            } else if(response.data.status === "CREATED") {
                setUploadStatus({
                    ...uploadStatus, status : 2, 
                    progress : (chunksUploaded/this.fileMetaData.chunkCount) * 100, 
                    message : `Uploading ${chunksUploaded===this.fileMetaData.chunkCount ? "done!" : "..."}`
                }); 
                startIndex = endIndex, endIndex += this.LIMITS.CHUNK_SIZE, chunksUploaded+=1;
            }
        }



        
    }

    // upload metadata
    uploadMetadata = async ()=>{
        // console.log(this.fileMetaData)
        const response = await uploadMetadata(this.fileMetaData) ;
        // console.log(response); 
        return response; 
    }

    // upload single chunk
    uploadSingleChunk = async (fileId, startIndex, endIndex, chunksUploaded) =>{
        console.log(`uploaduign chunk ${chunksUploaded}`)
        const chunk         = await this.fileToUpload.slice(startIndex, endIndex) ;
        // console.log(chunk)
        const chunkBuffer   = await chunk.arrayBuffer(); 
        // console.log(chunkBuffer)
        let chunkData = {
            fileId      :   fileId, 
            data        :   this.toBase64(chunkBuffer), 
            chunkindex  :   chunksUploaded
        }; 

        const response = await uploadChunk(fileId, chunkData) ;
        return response ;
    }

    getFileToUpload = async ()=>{
        try {
            console.log("file handler running"); 
            const [fileHandle] = await window.showOpenFilePicker() ;
            
            this.fileToUpload = await fileHandle?.getFile() ;
            return this.fileToUpload ;
        } catch (error) {
            console.log(error) ;
            throw new Error("error in file upload") ;
        }
        
    }

    removeUploadedFile = ()=>{
        this.fileToUpload = null; 
    }

    createFile = async ()=>{
        
    }



}; 

export default FileUploader ;