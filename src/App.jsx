import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@mantine/core/styles.css';

import FileUpload from './components/FileUpload'
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import Auth from './components/Auth'
import { MantineProvider } from '@mantine/core'

function App() {
    
    // const userContext = useContext(); 

    
    return (
        <MantineProvider>
            <BrowserRouter>
            <Routes>
                <Route exact path="/" Component={Home}></Route>
                <Route exact path="/auth" Component={Auth}></Route>
            </Routes>
                
            </BrowserRouter>
        </MantineProvider>
        
    )
}

export default App
