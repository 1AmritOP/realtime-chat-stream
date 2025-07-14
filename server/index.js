import express from "express";
import cors from "cors";
import { createServer } from 'node:http';
import { Server } from "socket.io";
import { v4 as uuidv4 } from 'uuid';

const port=3000;
const app=express();
const server=createServer(app);
const rooms={};

const io= new Server(server,{
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    },
})

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}))



io.on('connection', (socket) => {
  console.log('a user connected',socket.id);
  
  socket.on('joinRoom',({roomId,name})=>{
    socket.join(roomId);
    console.log(`user ${name} joined room ${roomId}`);
    socket.to(roomId).emit('userJoined',name);
  })

  socket.on('sendMessage',({roomId,text,sender})=>{
    io.to(roomId).emit('receiveMessage',{text,sender});
  })

  socket.on('leaveRoom',({roomId,name})=>{
    socket.leave(roomId);
    console.log(`user ${name} left room ${roomId}`);
    socket.to(roomId).emit('userLeft',name);
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected',socket.id);
  });
});



app.get("/",(req,res)=>{
    res.send("hello world");
})

app.post('/room', (req, res) => {
  const roomId = uuidv4().slice(0, 6); // Short unique ID
    rooms[roomId] = { created: Date.now() };
    console.log(rooms);
    
  res.json({ roomId });
});

app.get('/room/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  if (rooms[roomId]) {
    res.json({ exists: true });
  } else {
    res.status(404).json({ exists: false, error: "Room not found" });
  }
});


server.listen(port,()=>console.log(`server is running on port ${port}`));