import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
dotenv.config();
import Room from "./models/room.model.js";
import Message from "./models/message.model.js";
import ytsr from "ytsr";

const port = process.env.PORT;
const app = express();
const server = createServer(app);
// const rooms = {};

connectDB();

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))


io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("joinRoom", async({ roomId, name }) => {
    socket.join(roomId);
    //fetch all messages for this room
    const message= await Message.find({roomId}).sort({createdAt: 1}).limit(100);  //try catch error handling
    socket.emit("roomHistory", message);

    console.log(`user ${name} joined room ${roomId}`);
    socket.to(roomId).emit("userJoined", name);
  });

  socket.on("sendMessage", async({ roomId, text, sender }) => {
    console.log(roomId, text, sender);
    
    //store message in db
    await Message.create({roomId, text, sender}); //try catch error handling
    io.to(roomId).emit("receiveMessage", { text, sender });
  });

  socket.on("leaveRoom", ({ roomId, name }) => {
    socket.leave(roomId);
    console.log(`user ${name} left room ${roomId}`);
    socket.to(roomId).emit("userLeft", name);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });

   socket.on("video-play", ({ roomId, time }) => {
    socket.to(roomId).emit("video-play", { time });
  });

  socket.on("video-pause", ({ roomId, time }) => {
    socket.to(roomId).emit("video-pause", { time });
  });

  socket.on("video-seek", ({ roomId, time }) => {
    socket.to(roomId).emit("video-seek", { time });
  });

  socket.on("load-video", ({ roomId, videoId }) => {
    io.to(roomId).emit("load-video", { videoId });
  });

});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/room", async(req, res) => {
  const roomId = uuidv4().slice(0, 6); // Short unique ID
  console.log(roomId,req.body);
  
  try {
    const room= await Room.create({ roomId, createdBy: req.body.createdBy });
    if (!room) {
      throw new Error("Room not created");
    }
    else{
      res.status(201).json({ roomId });
    }
  } catch (error) {
    console.log("Error creating room", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/room/:roomId", async(req, res) => {
  const roomId = req.params.roomId;
  const exists= await Room.findOne({roomId});
  if (exists) {
    res.json({ exists: true });
  } else {
    res.status(404).json({ exists: false, error: "Room not found" });
  }
  // if (rooms[roomId]) {
  //   res.json({ exists: true });
  // } else {
  //   res.status(404).json({ exists: false, error: "Room not found" });
  // }
});
app.get("/roomDetails/:roomId", async(req, res) => {
  const roomId = req.params.roomId;
  const room= await Room.findOne({roomId});
  if (room) {
    res.json(room);
  } else {
    res.status(404).json({ exists: false, error: "Room not found" });
  }
});

app.get("/search", async (req, res) => {
  console.log("searching for", req.query.q);
  
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "No query provided" });

  try {
    const searchResults = await ytsr(query, { limit: 10 });
    const videos = searchResults.items.filter(i => i.type === "video");
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: "Search failed", details: err.message });
  }
});

server.listen(port, () => console.log(`server is running on port ${port}`));
