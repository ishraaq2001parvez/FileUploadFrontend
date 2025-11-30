import { Menu } from "@mantine/core";
import { FaFileUpload } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa6";
import { ImFolderUpload } from "react-icons/im";


const FileMenuContext = ({position, targetComponent, offset, setUploadType, open}) =>{
    // const {fileUploader} = useContext(authContext) ;
    // console.log(Object.getOwnPropertyNames(fileUploader))

    
    return (
        <Menu position={position} offset={offset} className={``} width={300}>
            <Menu.Target>
                {targetComponent}

            </Menu.Target>
            <Menu.Dropdown className="">
                <Menu.Item leftSection={<FaFolderPlus />} onClick={(e)=>{
                    e.preventDefault(); 
                    setUploadType(0); 
                    open();
                }}>
                    New Folder
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<FaFileUpload />} onClick={(e)=>{
                    e.preventDefault(); 
                    setUploadType(1); 
                    open()
                }}>
                    Upload File
                </Menu.Item>
                <Menu.Item leftSection={<ImFolderUpload />} onClick={(e)=>{
                    e.preventDefault(); 
                    setUploadType(2); 
                    open()
                }}>
                    Upload Folder
                </Menu.Item>
                
            </Menu.Dropdown>
            
        </Menu>
    )
};

export default FileMenuContext;