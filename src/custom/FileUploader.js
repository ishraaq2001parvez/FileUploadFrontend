import { createDirectory } from "../axiosRequests/directory";

class FileUploader {
    // constructor class
    constructor(){
        console.log("constructor was called") ;
        this.LIMITS = {
            MAX_SIZE : 2147483648 ,
            CHUNK_SIZE : 5*1024*1024
        }
        this.fileToUpload = null ;
        this.currentDirectory = null ;
        this.directoryToCreate = "" ;
        this.directoryToUpload = null ;
        this.fileMetaData = null ;

    }


    // function to get max size allowed
    getMaxSize = ()=>{
        return this.LIMITS.MAX_SIZE ;
    }

    getMaxChunkSize = ()=>{
        return this.LIMITS.CHUNK_SIZE ;
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
            fileName        : this.fileToUpload.name,
            mimeType        : this.fileToUpload.type, 
            chunkCount      : Math.ceil(this.fileToUpload.size / this.getMaxChunkSize()), 
            fileHeader      : new Uint8Array(headerBuffer), 
            fileFooter      : new Uint8Array(footerBuffer), 
            fileSignature   : signature,                 
            extension       : this.fileToUpload.name.split(".").pop()
        };
        

    }
    // send request for uploading
    
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