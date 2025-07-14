import React, { useState } from "react";
// import logo from "../assets/Logo.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router";
import axios from "axios";

const LandingPage = () => {
  const navigate = useNavigate();
  const [err,setErr]=useState("");

  const createRoom = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/room`);
        const { roomId } = res.data;
        navigate(`/room/${roomId}`);
      } catch (error) {
        console.log("Room create error", error);
        
      }
    } else {
      navigate("/login");
      console.log("Please login to join a room");
    }
  };
  

  const joinRoom = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const roomId = e.target[0].value;
    // console.log(roomId);
    
    
    if (user) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/room/${roomId}`);
        if (res.data.exists) {
          navigate(`/room/${roomId}`);
        }
      } catch (error) {
        console.log("Room not found. Please check the ID.", error);
        setErr("Room not found. Please check the ID.");
      }
    } else {
      navigate("/login");
      console.log("Please login to join a room");
    }
  };

  return (
    <>
      <div
        className="hero min-h-[calc(100vh-64px)] w-full flex flex-col items-center justify-start  gap-5
      bg-gradient-to-t from-indigo-500  to-gray-500 font-medium text-xl"
      >
        {/* <div className="logo">
          <img src={logo} alt="logo" className="h-32" />
        </div> */}

        <div className="text-center">
          <p> The place to hange out with your friends and family</p>
        </div>
        <div className="buttons flex flex-col gap-2">
          <div onClick={createRoom} className=" text-center">
            <button className=" cursor-pointer px-8 py-2.5 bg-indigo-600  rounded-2xl mt-6">
              Create a room
            </button>
          </div>
          <form onSubmit={joinRoom} className=" flex flex-col items-center">
            <input
              type="text"
              placeholder="enter room id"
              required
              className=" ouline-none px-8 py-2.5 border border-gray-300 rounded-2xl"
            />
            <button className=" cursor-pointer px-8 py-2.5 bg-indigo-600  rounded-2xl mt-6">
              Join a room
            </button>
            {err && <p style={{ color: 'red' }}>{err}</p>}
          </form>
        </div>
        <div className="credit text-center">
          <p>
            Created by <span className="font-bold">Amrit</span>
          </p>
        </div>
        <div className="flex gap-2">
          <a href="https://github.com/1AmritOP">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/amrit-kumar-a20234281/">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
