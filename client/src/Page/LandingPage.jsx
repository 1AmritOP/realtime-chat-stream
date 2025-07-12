import React from 'react'
import logo from "../assets/logo.png"
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router';


const LandingPage = () => {
  return (
    <>
    <div className="hero min-h-[calc(100vh-64px)] w-full flex flex-col items-center justify-start  gap-5
      bg-gradient-to-t from-indigo-500  to-gray-500 font-medium text-xl">
      <div className="logo">
        <img src={logo} alt="logo" className="h-32" />
      </div>
      <div className="text">
        <p> The place to hange out with your friends and family</p>
      </div>
      <div className="buttons flex flex-col gap-2">
        <Link to={"/room"}>
          <button className=' cursor-pointer px-8 py-2.5 bg-indigo-600  rounded-2xl mt-6'>Create a room</button>
        </Link>
        <button className=' cursor-pointer px-8 py-2.5 bg-indigo-600  rounded-2xl mt-6'>Join a room</button>

      </div>
      <div className="credit text-center">
        <p>Created by <span className='font-bold'>Amrit</span></p>
      </div>
      <div className='flex gap-2'>
        <a href="https://github.com/1AmritOP">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/amrit-kumar-a20234281/">
          <FaLinkedin />
        </a>
      </div>
    </div>
    </>
)
}

export default LandingPage