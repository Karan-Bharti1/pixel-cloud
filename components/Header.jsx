import React from 'react'
import { useNavigate } from 'react-router-dom'

import { IoIosLogOut } from "react-icons/io";
import TooltipPositionedExample from './Tooltip';
function Header() {
    const userInfo=JSON.parse(localStorage.getItem('user-info'))

    const navigate=useNavigate()
      const handleLogOut=()=>{

    localStorage.removeItem('user-info'),
    navigate('/login')
  }
  return (
    <header>
          <div className='header '>
      <h2> Pixel Cloud</h2> 
      <div>
        {userInfo && <TooltipPositionedExample />}

<button className=' mx-3' onClick={handleLogOut}><IoIosLogOut/></button>
      </div>
    
      </div>
      <hr/>
    </header>
  )
}

export default Header