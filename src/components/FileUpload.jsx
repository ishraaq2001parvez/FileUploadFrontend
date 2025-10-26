import axios from "axios";
import { useState } from "react";

const FileUpload = ()=>{
    const [fileId, setFileId] = useState(0); 
    
    
    const openFile = async (e) => {
        console.log("file handler running")
        e.stopPropagation();
        const [fileHandle] = await window.showOpenFilePicker();
        // console.log(fileHandle.get)
        let file= await fileHandle?.getFile(); 
        console.log("file is : ", file); 
        const MAX_SIZE= 5*1024*1024; 
        let startIndex, endIndex; 
        let blob = await file.slice(0, MAX_SIZE); 
        
        console.log(file.name.split(".").pop()); 
        // const arrayBuffer = await blob.arrayBuffer(); 
        // const bytes = new Uint8Array(arrayBuffer); 
        // console.log(bytes.length); 
        try{
            const sendData = confirm("Send data?"); 
            // const form = new FormData(); 
            if(!sendData){
                throw new Error("Did not send");
                
            }
            const response= await axios.post(`http://localhost:8080/api/file`, blob,{
                headers: {
                    // ⭐️ Crucial: Set the Content-Type to tell the server it's raw binary data
                    'Content-Type': 'application/octet-stream',
                    
                    // ⭐️ Transfer all metadata via custom headers
                    'X-File-Name': file.name,
                    'X-Chunk-Index': 0,
                    'X-File-Ext': file.name.split(".").pop(),
                    'X-Mime-Type' : file.type                    
                    // You can add an optional header for size validation
                    // 'Content-Length': chunk.size.toString(), 
                },
            })    ; 
            console.log(response); 
        }
        catch(e){
            console.error(e); 
        }
        
    }; 
    const fileDownload = async (fileId) =>{
        try{
            let fileId = prompt("file id?", 1); 
            const fileInfoResponse = await axios.get(`http://localhost:8080/api/file/info/${fileId}`); 
            const fileData = fileInfoResponse.data; 

            const correctFileName = fileData.fileName; 
            const mimeType = fileData.mimeType; 

            console.log(fileData); 
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: correctFileName, 
                types: [
                    {
                        description: `${fileData.extension.toUpperCase()} Files`,
                        accept: { [mimeType]: [`.${fileData.extension}`] }
                    }
                ]
            }); 
            const writableStream = await fileHandle.createWritable(); 
            console.log(fileHandle); 
            const chunkResponse = await axios.get(
                `http://localhost:8080/api/chunk/1`,
                {responseType : 'arraybuffer'} 
            ); 
            await writableStream.write(new Uint8Array(chunkResponse.data)); 
            await writableStream.close(); 
            console.log(`✅ File downloaded with correct type: ${correctFileName} (${mimeType})`);
        }
        catch(e){
            console.log(e); 
        }
    }
    
    return(
        <div>
            
            <button onClick={openFile}>Upload file</button>
            <button onClick={fileDownload}>Download file</button>
        </div>
    )
}

export default FileUpload; 