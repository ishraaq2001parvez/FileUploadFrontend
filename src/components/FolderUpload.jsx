import { useState } from "react";


const FolderUpload = ({currentFileUploader})=>{
    const [folderName, setFolderName] = useState(
        currentFileUploader.getFolder()
    ) ; 
    return (
        <div>

        </div>
    )
}; 

export default FolderUpload ;