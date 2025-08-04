import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import socket from "../socket";
import { useSelector } from "react-redux";
import YouTubeSearch from "../Components/YoutubeSearch";
import VideoPlayer from "../Components/VideoPlayer";

const CreateRoom = () => {
  const { roomId } = useParams();
  const user = useSelector((state) => state.user.user);
  const [message, setMessage] = useState("");
  const [host, setHost] = useState(false);
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      roomId,
      text: message,
      sender: {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      },
    });
    setMessage("");
  };

  useEffect(() => {
    if (socket.connected) {
      socket.emit("joinRoom", { roomId, name: user.displayName });
      socket.on("roomHistory", (data) => {
        setMessages(data);
      });
    }

    const onConnect = () => {
      socket.emit("joinRoom", { roomId, name: user.displayName });
      socket.on("roomHistory", (data) => {
        setMessages(data);
      });
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
    });

    const fetchRoomInfo = async () => {
      try {
        const roomInfo = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/roomDetails/${roomId}`
        );
        const data = await roomInfo.json();
        setHost(data.createdBy);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoomInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-gray-600 text-white p-4">
      <h2 className="text-lg font-semibold mb-4">Room ID: {roomId}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="flex flex-col gap-4 col-span-1 lg:col-span-2">
          <div className="rounded-md overflow-hidden h-96 max-sm:h-72  shadow-md">
            <VideoPlayer roomId={roomId} />
          </div>

          {host === user.email && (
            <div className="bg-indigo-500 p-4 rounded-md shadow-md text-black">
              <YouTubeSearch roomId={roomId} />
            </div>
          )}
        </div>

        {/* Right Section: Chat */}
        <div className="flex flex-col justify-between bg-white text-black rounded-md shadow-md p-4 max-h-[80vh] h-[80vh]">
          <div className="overflow-y-auto pr-2 mb-4 custom-scrollbar">
            {messages.map((message, index) => {
              const isCurrentUser = message.sender.email === user.email;
              return (
                <div
                  key={index}
                  className={`flex items-end mb-3 ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isCurrentUser && (
                    <img
                      src={message.sender.photoURL}
                      alt="user"
                      className="w-8 h-8 rounded-full mr-2 shadow"
                    />
                  )}
                  <p
                    className={`max-w-[75%] px-4 py-2 rounded-lg text-sm shadow-md ${
                      isCurrentUser
                        ? "bg-green-500 text-white rounded-br-none"
                        : "bg-gray-200 text-black rounded-bl-none"
                    }`}
                  >
                    {message.text}
                  </p>
                  {isCurrentUser && (
                    <img
                      src={message.sender.photoURL}
                      alt="user"
                      className="w-8 h-8 rounded-full ml-2 shadow"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <form
            onSubmit={sendMessage}
            className="mt-auto flex flex-wrap gap-2 items-center"
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type your message"
              className="flex-1 h-12 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-md shadow"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
