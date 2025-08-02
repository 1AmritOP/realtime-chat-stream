import YouTube from "react-youtube";
import { useEffect, useRef, useState } from "react";
import socket from "../socket";

const VideoPlayer = ({ roomId }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const playerRef = useRef(null);
  const [videoId, setVideoId] = useState("");
  const [host, setHost] = useState(false);

  const onReady = (e) => {
    // if (user.email !== host) return;
    playerRef.current = e.target;
    socket.emit("get-current-time", { roomId });
  };

  const handlePlay = () => {
    if (user.email !== host) return;
    console.log("playing video");

    const time = playerRef.current.getCurrentTime();
    socket.emit("video-play", { roomId, time });
  };

  const handlePause = () => {
    if (user.email !== host) return;
    const time = playerRef.current.getCurrentTime();
    socket.emit("video-pause", { roomId, time });
  };

  const handleSeek = () => {
    if (user.email !== host) return;
    const time = playerRef.current.getCurrentTime();
    socket.emit("video-seek", { roomId, time });
  };

  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        const roomInfo = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/roomDetails/${roomId}`
        );
        const data = await roomInfo.json();
        // setVideoId(data.videoId);
        setHost(data.createdBy);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoomInfo();

    socket.on("video-play", ({ time }) => {
      playerRef.current.seekTo(time, true);
      console.log("video played", time);

      playerRef.current.playVideo();
    });

    socket.on("video-pause", ({ time }) => {
      playerRef.current.seekTo(time, true);
      console.log("video paused", time);
      playerRef.current.pauseVideo();
    });

    socket.on("video-seek", ({ time }) => {
      playerRef.current.seekTo(time, true);
      console.log("time changed", time);
    });

    socket.on("load-video", ({ videoId }) => {
      console.log(videoId);
      setVideoId(videoId);

      playerRef.current.loadVideoById(videoId);
    });

    return () => {
      socket.off("video-play");
      socket.off("video-pause");
      socket.off("video-seek");
      socket.off("load-video");
    };
  }, []);

  return (
    <>
      {videoId && (
        <YouTube
          videoId={videoId}
          onReady={onReady}
          // onReady={host === user.email && onReady}
          onPlay={handlePlay}
          onPause={handlePause}
          onStateChange={handleSeek}
          opts={{ playerVars: { controls: 1, rel: 0 } }}
        />
      )}
    </>
  );
};

export default VideoPlayer;
