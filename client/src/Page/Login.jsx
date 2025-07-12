import React from 'react'
import  GoogleLogo from "../assets/GoogleLogo.png"
import {useNavigate} from "react-router"

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add your login logic here
    navigate("/")
  }
  return (
    <>
    <div className="wrapper min-h-[calc(100vh-64px)] w-full flex items-center justify-center">
     <div className="box">
        <button 
        onClick={handleLogin}
        className='bg-white text-black font-bold px-4 py-2 rounded-2xl flex gap-2 cursor-pointer'>
            Join Us with <img src={GoogleLogo} className="h-6" alt="logo" /> 
        </button>
     </div>
    </div>
    </>
  )
}

export default Login