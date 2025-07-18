import React, { useEffect } from "react";
import { useParams } from "react-router";
import socket from "../socket";
import { useSelector } from "react-redux";
import YouTubeSearch from "../Components/YoutubeSearch";
import VideoPlayer from "../Components/VideoPlayer";

const CreateRoom = () => {
  const { roomId } = useParams();
  const user = useSelector((state) => state.user.user);
  const [message, setMessage] = React.useState("");

  const [messages, setMessages] = React.useState([]);
  // const [isHost, setIsHost] = useState(false)

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
    console.log("sending message");
  };

  useEffect(() => {
    if (socket.connected) {
      socket.emit("joinRoom", { roomId, name: user.displayName });
      socket.on("roomHistory", (data) => {
        setMessages(data);
      });
    }

    const onConnect = () => {
      socket.emit("joinRoom", { roomId, name: user.displayName }); // 🔁 auto rejoin
      socket.on("roomHistory", (data) => {
        setMessages(data);
      });
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
      <div className="Room flex px-8 flex-col justify-center items-center min-h-[calc(100vh-64px)] w-full bg-gradient-to-t from-indigo-500  to-gray-500">

    {/* <YouTube videoId="HEGQOuo66jY" opts={{ height: "300", width: "600" }}  /> */}
      <YouTubeSearch roomId={roomId} />
      <VideoPlayer roomId={roomId}  />
        <h2>Room {roomId}</h2>

        <div className="box flex flex-col justify-between h-2/3 w-1/2 overflow-y-auto p-2 max-sm:w-full max-sm:h-2/3  bg-blue-400 text-black">
          <div className="chat-box">
            {messages.map((message, index) => {
              const isCurrentUser = message.sender.email === user.email;
              return (
                <div
                  key={index}
                  className={`flex items-end mb-2 ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Avatar on the left for other user */}
                  {!isCurrentUser && (
                    <img
                      src={message.sender.photoURL}
                      alt="user"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}

                  <p
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      isCurrentUser
                        ? "bg-green-500 text-white rounded-br-none"
                        : "bg-white text-black rounded-bl-none"
                    }`}
                  >
                    {message.text}
                  </p>

                  {/* Avatar on the right for current user */}
                  {isCurrentUser && (
                    <img
                      src={message.sender.photoURL}
                      alt="user"
                      className="w-8 h-8 rounded-full ml-2"
                    />
                  )}
                </div>
              );
            })}
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
