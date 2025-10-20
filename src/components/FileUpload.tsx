import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";


const FileUpload = ()=>{
    let fileHandle : FileSystemFileHandle | undefined;
    const openFileOptions: FilePickerOptions = {
        multiple: false,
        types: [
            {
                description: 'Json Files',
                accept: { 'text/plain': ['.txt'] }
            }
        ]
    }
    
    const openFile = async (e :  React.MouseEvent<HTMLButtonElement>) => {
        console.log("file handler running")
        e.stopPropagation();
        [fileHandle] = await window.showOpenFilePicker();
        // console.log(fileHandle.get)
        let file : File = await fileHandle?.getFile(); 
        console.log("file is : ", file); 
        const MAX_SIZE:number = 5*1024*1024; 
        let startIndex, endIndex; 
        let blob : Blob = await file.slice(0, MAX_SIZE); 
        
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
            const response:AxiosResponse = await axios.post(`http://localhost:8080/api/file`, blob,{
                headers: {
                    // ⭐️ Crucial: Set the Content-Type to tell the server it's raw binary data
                    'Content-Type': 'application/octet-stream',
                    
                    // ⭐️ Transfer all metadata via custom headers
                    'X-File-Name': file.name,
                    'X-Chunk-Index': 0,
                    'X-File-Ext': file.name.split(".").pop(),
                    
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
    const writeFile = async (e :  React.MouseEvent<HTMLButtonElement>) => {
        console.log("file handler running")
        e.stopPropagation();
        [fileHandle] = await window.showOpenFilePicker();
        const writable = await fileHandle.createWritable();
        const response = await axios.get(`http://localhost:8080/api/file/1`); 
        console.log(response.data)
        // Write the contents of the file to the stream.
        // let writeBlob:Blob = 
        await writable.write(new Blob([response.data.data], { type: "text/plain" }));
        // Close the file and write the contents to disk.
        await writable.close();
    }
    return (
        <div>
        <button onClick={openFile}>Select file</button>
        <button onClick={writeFile}>Write to file</button>
        {/* <input type="button" onClick={openFile}>Select file</input> */}
        </div>
    )
}

export default FileUpload;