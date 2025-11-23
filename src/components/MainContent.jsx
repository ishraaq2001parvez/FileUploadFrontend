import { useDisclosure } from "@mantine/hooks";
import FileUploader from "../custom/FileUploader";
import { Modal } from "@mantine/core";
import FileUploadHandler from "./FileUploadHandler";
import { FileIcon } from "react-file-icon";


function MainContent({currentUser}) {
    const [opened, {open, close}] = useDisclosure(false) ;

    const currentFileUploader = new FileUploader();
    
    return (
        <div className="bg-purple-200 flex-grow overflow-y-scroll max-h-full p-5">
            <div>
                <button 
                    onClick={open} 
                    className="p-2 bg-white"
                >
                    Open file
                </button>
            </div>
            <div className="file_open_modal">
                <Modal opened={opened} onClose={close} title="Upload file" centered>
                    <FileUploadHandler
                        currentFileUploader={currentFileUploader}
                        currentUser={currentUser}
                    ></FileUploadHandler>
                    
                </Modal>
            </div>
        </div>
    );
}
export default MainContent;