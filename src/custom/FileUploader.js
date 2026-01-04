import { createDirectory } from "../axiosRequests/directory";

class FileUploader {
    // constructor class
    FileUploader = ()=>{
        console.log("constructor was called") ;
        this._LIMITS = {
            MAX_SIZE : 2147483648 ,
            CHUNK_SIZE : 5*1024*1024
        }
        this.fileToUpload = null ;
        this.currentDirectory = null ;
        this.directoryToCreate = "" ;
        this.directoryToUpload = null ;

    }


    // function to get max size allowed
    getMaxSize = ()=>{
        return this._LIMITS.MAX_SIZE ;
    }

    // clear previous contents
    clearContents = () =>{
        this.fileToUpload = null; 
        this.currentDirectory = null ;
        this.directoryToUpload = null ;
        this.directoryToCreate = "" ;
    }

    // return the folder that we currently need to upload
    getCurrentFolder = ()=>{
        return this.currentDirectory ;
    }
    // set the current working directory
    setCurrentDirectory = (directory) =>{
        // console.log("current directory changed in fileuploader class")
        this.currentDirectory = directory ;
        return  ;
    }

    // functions for creating directory
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
    // get current file object
    getFile = ()=>{
        return this.currentFile ;
    }

    getFileExtension = ()=>{
        // console.log(this.currentFile.name.split("."))
        return this.currentFile.name.split(".")[1];
    }

    getFileName = ()=>{
        return this.currentFile.name ;
    }

    getFileSize = ()=>{
        return this.currentFile.size ;
    }
    // function to check if file size is within limits
    validateSize = ()=>{
        try {
            if(!this.currentFile){
                throw new Error("File has not been selected yet");
            }
            return this.currentFile?.size <= this.getMaxSize() ;
        } catch (error) {
            console.log(error); 
        }
    }

    getFileToUpload = async ()=>{
        try {
            console.log("file handler running"); 
            const [fileHandle] = await window.showOpenFilePicker() ;
            
            this.currentFile = await fileHandle?.getFile() ;
            return this.currentFile ;
        } catch (error) {
            console.log(error) ;
            throw new Error("error in file upload") ;
        }
        
    }

    removeUploadedFile = ()=>{
        this.currentFile = null; 
    }

    createFile = async ()=>{
        
    }



}; 

export default FileUploader ;