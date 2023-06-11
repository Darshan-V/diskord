import { createServer } from "http"
import express from "express"
import cors from "cors"
import config from "./config.js"
import sockets from "./sockets/sockets.js"
import { router as workSpaceRouter } from "./routes/workSpaces.js"
import { router as channelRouter } from "./routes/channels.js"
import { router as sessionsRouter } from "./routes/sessions.js"
import { router as usersRouter } from "./routes/users.js"

const app = express()
const port = config.port

app.use(cors({ origin: JSON.parse(config.ORIGIN), credentials: true }))
app.use(express.json())

app.use("/api/workspaces", workSpaceRouter)
app.use("/api/workspaces/:id/channels", channelRouter)
app.use("/api/users", usersRouter)
app.use("/api/sessions", sessionsRouter)

const httpServer = createServer(app)
sockets.init(httpServer)
sockets.listen()

httpServer.listen(port, () => {
  console.log("listening on localhost:", port)
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
