import express from "express"
import { ExpressPeerServer } from "peer"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"
import config from "./config.js"

const PORT = config.port

const app = express()
// app.use(cors({ origin: ["http://localhost:3001"] }))
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001")
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type")
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
//   next()
// })

app.use(express.json())

const httpServer = http.createServer(app)

const peerServer = ExpressPeerServer(httpServer)

const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:3000"] }
})

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`)

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`)
  })
})

app.use("/api/peer", peerServer) // mounting the peerjs server on the path /api/peer

peerServer.on("connection", (client) => {
  console.log("PeerClient connected", client.getId())
})

peerServer.on("disconnect", (client) => {
  console.log("PeerClient disconnected")
})

app.get("/api", (req, res) => {
  res.send("Hello, World!")
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
