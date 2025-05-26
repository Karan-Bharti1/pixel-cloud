
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
function App() {

  const [userInfo,setUserInfo]=useState(null)

  useEffect(()=>{
    const data=localStorage.getItem('user-info')
  
    const userData=JSON.parse(data)
    setUserInfo(userData)
  },[])

  return (
    <>
       <div className='container mt-3'>
    <Header userInfo={userInfo}/>
  <main className='container'>
<h1>Welcome {userInfo?.name}</h1>
<p>User Email:{userInfo?.email}</p>

      </main>

    </div>
    </>
  )
}

export default App
