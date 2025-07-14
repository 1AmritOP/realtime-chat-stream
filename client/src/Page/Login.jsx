import React from 'react'
import  GoogleLogo from "../assets/GoogleLogo.png"
import {useNavigate} from "react-router"
import { getAuth, GoogleAuthProvider , signInWithPopup } from "firebase/auth"
import { app } from '../../firebase'
import { useDispatch } from 'react-redux'
import { login } from '../features/user/UserSlice'
import socket from '../socket'

const Login = () => {
  const dispatch=useDispatch();
  
  const navigate = useNavigate();
  const auth=getAuth(app);
  const provider= new GoogleAuthProvider();


  const handleLogin = async() => {
    // Add your login logic here

    const result = await signInWithPopup(auth, provider);
    const user=result.user;
    dispatch(login(user));
    socket.connect();
    console.log(user,"\n logged In");

    // signInWithPopup(auth, provider).then((result) => {
    //   const user=result.user;
    //   dispatch(login(user));
    //   console.log(user,"\n logged In");
    // }).catch((error) => {
    //   console.log(error);
    // })
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