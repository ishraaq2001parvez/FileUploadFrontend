import { AppShell, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { modalContext } from "../custom/contexts/modalContext";
import UploadMenu from "./FileUploadHandler";
import Nav from "./Nav";
import SideBar from "./SideBar";
import FileUploader from "../custom/FileUploader";
import { fileUploadContext } from "../custom/contexts/fileUploadContext";

const MainLayout = ({currentUser, logout})=>{
    // file uploader; only one per browser
    const fileUploader = new FileUploader() ;

    // console.log("hitting main lyout");
    // for global modal
    const [opened, {open, close}] = useDisclosure(false) ;
    const [uploadType, setUploadType] = useState(0); 


    return (
        <AppShell padding={`md`} 
            header={{height : 70}}
            navbar={{ 
                width: { base: 150, sm: 300 }, // Example width: 300px on larger screens
                breakpoint: 'sm' // This is optional but good practice
            }}

        >
            <AppShell.Header >
                <Nav currentUser={currentUser}></Nav>
            </AppShell.Header>
            <AppShell.Navbar>
                <SideBar 
                    open={open}
                    currentUser = {currentUser}
                    setUploadType = {setUploadType}
                ></SideBar>
            </AppShell.Navbar>
            <AppShell.Main>
                <modalContext.Provider value={{opened, open, close, setUploadType ,logout}}>
                    <Outlet></Outlet>
                </modalContext.Provider>
                <fileUploadContext.Provider value={{fileUploader, uploadType}}>
                    <Modal 
                        opened={opened} 
                        onClose={close} title={`${uploadType==0?"Create Folder":uploadType===1?"Upload File":"Upload Folder"}`} centered size={"70%"} 
                    >
                        <UploadMenu
                            currentUser={currentUser}
                            uploadType = {uploadType}
                        ></UploadMenu>
                        
                    </Modal>
                </fileUploadContext.Provider>
            </AppShell.Main>
            
            
        </AppShell>
    )
}; 


export default MainLayout ;