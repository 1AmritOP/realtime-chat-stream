import React, { useEffect } from "react";
import { Link, Outlet } from "react-router";
import Header from "./Components/Header";
import socket from "./socket";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  console.log(import.meta.env.VITE_BACKEND_URL);

  useEffect(() => {
    if (user && !socket.connected) {
      socket.connect();
    }
    socket.on("userLeft", (data) => {
      console.log(`${data} left room`);
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
