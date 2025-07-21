import express from "express"
import http from "http"
import { Server } from "socket.io"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from 'dotenv'
import connectDB from "./config/db.js"
import handelSocketConnection from "./socket/socketHandler.js"
import roomRouter from "./routes/roomRoute.route.js"

dotenv.config()
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {origin: "*"}
})

app.use(cors())
app.use(express.json())
connectDB();

app.use("/api/room", roomRouter)

io.on("connection", (socket) => {
    handelSocketConnection(io, socket);
})

server.listen(3000, () => {
    console.log("server is runing on port 3000")
})

// app.get("/", (req, res) => {
//     res.send("hello world")
// })

// app.listen(3000, () => {
//     console.log("server is runing on port 3000")
// })