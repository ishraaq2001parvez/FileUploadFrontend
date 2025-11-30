import { Container } from "@mantine/core";
import { useContext } from "react";
import { authContext } from "../custom/contexts/authContext";
import { modalContext } from "../custom/contexts/modalContext";
import FileMenuContext from "./UploadMenu";



function Home(){
    const {currentUser} = useContext(authContext);
    const {open, close, setUploadType} = useContext(modalContext) ;
    
    return (
        <Container>
            <FileMenuContext
                position={`right-end`}
                targetComponent={
                    <button className="hover:cursor-pointer hover:bg-gray-100 rounded-lg p-2">
                        <p className="text-4xl">
                            My Drive
                        </p>
                    </button>
                }
                open={open}
                setUploadType={setUploadType}
            >

            </FileMenuContext>
        </Container>
    )
}

export default Home; 