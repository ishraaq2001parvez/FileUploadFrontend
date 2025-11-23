class FileUploader {
    MAX_SIZE = 2147483648 ;
    currentFile = null; 
    CHUNK_SIZE = 5*1024*1024 ;

    // function to get max size allowed
    getMaxSize = ()=>{
        return this.MAX_SIZE ;
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



}; 

export default FileUploader ;