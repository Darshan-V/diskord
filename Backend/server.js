import { createServer } from "http"
import express from "express"
import cors from "cors"
import sockets from "./sockets/sockets.js"
import { router as workSpaceRouter } from "./routes/workSpaces.js"

const app = express()
app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())

app.use("/api/workspaces", workSpaceRouter)

const httpServer = createServer(app)
sockets.init(httpServer)

const io = sockets.get()

io.on("connection", (socket) => {
  console.log("socket connected:", socket.id)

  socket.on("join-channel", (channelId) => {
    socket.join(channelId)
    socket.channelId = channelId

    const msg = {
      msgTxt: "user joined",
      msgTime: Date.now(),
      channelId: channelId,
      logMsg: true
    }
    socket.to(channelId).emit("join-channel", msg)
  })

  socket.on("new-msg", (msg) => {
    const newMsg = {
      msgTxt: msg.msg_txt,
      msgTime: Date.now(),
      channelId: channelId.roomId,
      roomMsg: false
    }

    socket.to(socket.roomId).emit("broadcast-msg", newMsg)
  })
})

httpServer.listen(3000, () => {
  console.log("listening on localhost:3000")
})

// import express from "express"
// import { ExpressPeerServer } from "peer"
// import http from "http"
// import { Server } from "socket.io"
// import cors from "cors"
// import config from "./config.js"

// const PORT = config.port

// const app = express()
// app.use(cors({ origin: "*" }))

// app.use(express.json())

// const httpServer = http.createServer(app)

// const io = new Server(httpServer, {
//   cors: { origin: "*" }
// })

// const chatIo = io.of("/chat")

// chatIo.on("connected", (socket) => {
//   console.log("connected:", socket.id)
// })

// const peerServer = ExpressPeerServer(httpServer)
// app.use("/api/peer", peerServer) // mounting the peerjs server on the path /api/peer

// peerServer.on("connection", (client) => {
//   console.log("PeerClient connected", client.getId())
// })

// peerServer.on("disconnect", (client) => {
//   console.log("PeerClient disconnected")
// })

// httpServer.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`)
// })
