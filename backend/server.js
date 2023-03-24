import express from "express"
import { ExpressPeerServer } from "peer"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"
import config from "./config.js"

const PORT = config.port

const app = express()
app.use(cors({ origin: config.ORIGIN }))
app.use(express.json())

const httpServer = http.createServer(app)

const peerServer = ExpressPeerServer(httpServer)

const io = new Server(httpServer, { cors: { origin: config.ORIGIN } })

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`)

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`)
  })
})

app.use("/api/peer", peerServer) // mounting the peerjs server on the path /api/peer

app.get("/api", (req, res) => {
  res.send("Hello, World!")
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
