import React from 'react'
import { Link } from 'react-router-dom'
function NotFound() {
  return (
    <main className='gallery-background'>
       
    <div>
         <br/><br/>
       <h2 className='text-center text-light my-5'> 404 Page Not Found</h2>

       <div className='text-center my-3'>
<Link to={"/login"} className='login-button'>Proceed to Login</Link>
       </div>

        </div>
        </main>
  )
}

export default NotFound