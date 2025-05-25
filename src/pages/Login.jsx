import React from 'react'
import { FcGoogle } from "react-icons/fc";
function Login() {
  return (
    <main className='gallery-background'>
        <br/><br/>
    <div className='text-light'>
        <h1 className='text-center'>Pixel Cloud</h1>
        <div className='login-container my-5'>
            <div className='login-box p-3'>
                <h2 className='my-3'>Sign up or login with Google</h2>
            <button className='login-button'><FcGoogle size={20} /> | <span>Login With Google </span></button>
            </div>
        </div>
<div>

</div>
    </div>
    </main>
  )
}

export default Login