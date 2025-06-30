import React, {useEffect,useState} from 'react'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
function ViewImage() {
     const navigate=useNavigate()
      useEffect(()=>{
        const data=localStorage.getItem('user-info')
        
      if(!data){
        navigate("/login")
      }
   },[navigate])
  return (
   <div className='container mt-3'>
    <Header/>
    <main>
        
    </main>
   </div>
  )
}

export default ViewImage;