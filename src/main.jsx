import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"
import Login from './pages/Login.jsx'
const router=createBrowserRouter([{
  path:"/dashboard",
element:<App/>
},{
path:"/",
element:<Navigate to="/login"/>
},{
  path:"/login",
  element:<Login/>
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
