import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
const GoogleOAuthWrapper=()=>(
  <GoogleOAuthProvider clientId='919329357228-pljkg169718fikr5cq0vib012q4jv44e.apps.googleusercontent.com'>
    <Login/>
  </GoogleOAuthProvider>
)
const router=createBrowserRouter([{
  path:"/dashboard",
element:<App/>
},{
path:"/",
element:<Navigate to="/login"/>
},{
  path:"/login",
  element:<GoogleOAuthWrapper/>
},{
  path:"*",
  element:<NotFound/>
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
