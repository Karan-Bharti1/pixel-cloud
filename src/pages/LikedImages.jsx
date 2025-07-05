import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header';
function LikedImages() {
     const navigate=useNavigate()
          useEffect(()=>{
            const data=localStorage.getItem('user-info')
            
          if(!data){
            navigate("/login")
          }
       },[navigate])
  return (
     <div className='container mt-3'>
      <Header />
      <main className='container mt-3'>

        
      </main>

    </div>
  )
}

export default LikedImages