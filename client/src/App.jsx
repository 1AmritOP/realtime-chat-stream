import React, { useEffect } from "react";
import { Link, Outlet } from "react-router";
import Header from "./Components/Header";
import socket from "./socket";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function App() {
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user && !socket.connected) {
      socket.connect();
    }
    socket.on("userLeft", (data) => {
      toast.info(`${data} left room`, {
        position: "top-center",
        autoClose: 2000,
      });
    });
    socket.on("userJoined", (data) => {
      toast.success(`${data} joined room`, {
        position: "top-center",
        autoClose: 2000,
      });
    });
  }, [user]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
