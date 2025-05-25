
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
function App() {
const navigate=useNavigate()
  const [userInfo,setUserInfo]=useState(null)
  const handleLogOut=()=>{
    localStorage.removeItem('user-info'),
    navigate('/login')
  }
  useEffect(()=>{
    const data=localStorage.getItem('user-info')
    const userData=JSON.parse(data)
    setUserInfo(userData)
  },[])

  return (
    <>
       <div className='container mt-3'>
      <div className='header'>
      <h2> Dashboard</h2> 
      <div>
<img src={userInfo?.image} className='img'/>
<button className='btn btn-danger mx-3' onClick={handleLogOut}>Log Out</button>
      </div>
    
      </div>
      <hr/>
  <main className='container'>
<h1>Welcome {userInfo?.name}</h1>
<p>User Email:{userInfo?.email}</p>

      </main>

    </div>
    </>
  )
}

export default App
