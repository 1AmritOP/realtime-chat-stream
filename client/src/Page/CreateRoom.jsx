import React, { useEffect } from "react";
import { useParams } from "react-router";
import socket from "../socket";
import { useSelector } from "react-redux";

const CreateRoom = () => {
  const { roomId } = useParams();
  const user = useSelector((state) => state.user.user);
  const [message, setMessage] = React.useState("");

  const [messages, setMessages] = React.useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    

    socket.emit("sendMessage", {
      roomId,
      text: message,
      sender: user.displayName,
    });
    setMessage("");
    console.log("sending message");
  };

  useEffect(() => {
    if (socket.connected) {
      socket.emit("joinRoom", { roomId, name: user.displayName });
    }

    const onConnect = () => {
      socket.emit("joinRoom", { roomId, name: user.displayName }); // 🔁 auto rejoin
      console.log("Re-connected");
    };

    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
      socket.emit("leaveRoom", { roomId, name: user.displayName });
    };
  }, [roomId, user.displayName]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((messages) => [...messages, data]);
      console.log("received message");
    });
  }, []);

  return (
    <>
      <div className="Room flex px-8 flex-col justify-center items-center h-[calc(100vh-64px)] w-full bg-gradient-to-t from-indigo-500  to-gray-500">
        <h2>Room {roomId}</h2>


        <div className="box h-2/3 w-1/2 max-sm:w-full max-sm:h-2/3  bg-blue-400 text-black ">
          <div className="chat-box h-[calc(100%-64px)] ">
            {messages.map((message, index) => (
              <p
                key={index}
                className={`${
                  message.sender === user.displayName
                    ? "my-message"
                    : "other-message"
                }`}
              >
                {message.text}
              </p>
            ))}
          </div>
          <form
            onSubmit={sendMessage}
            className=" flex gap-2 items-center justify-between h-16 w-full px-2"
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type your message"
              className="h-12 w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-300 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-black font-bold px-4 py-2 rounded-2xl"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRoom;
