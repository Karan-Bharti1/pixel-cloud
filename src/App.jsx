
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
function App() {
const navigate=useNavigate()
  const [userInfo,setUserInfo]=useState(null)

  useEffect(()=>{
    const data=localStorage.getItem('user-info')
  if(!data){
    navigate("/login")
  }
    const userData=JSON.parse(data)
    setUserInfo(userData)
  },[])

  return (
    <>
       <div className='container mt-3'>
    <Header />
  <main className='container'>
<h1>My Albums</h1>


      </main>

    </div>
    </>
  )
}

export default App
