import { createServer } from "http"
import express from "express"
import cors from "cors"
import config from "./config.js"
import sockets from "./sockets/sockets.js"
import { router as workSpaceRouter } from "./routes/workSpaces.js"
import { router as channelRouter } from "./routes/channels.js"
import querystring from "querystring"
import fetch from "node-fetch"

const app = express()
const port = config.port

app.use(cors({ origin: "*", credentials: true }))

app.use(express.json())

app.use("/api/workspaces", workSpaceRouter)
app.use("/api/workspaces/:id/channels", channelRouter)

app.get("/api/session", (req, res) => {
  const queryParams = querystring.stringify({
    response_type: "code",
    client_id: config.CLIENT_ID,
    redirect_uri: config.REDIRECT_URI,
    scope: "openid profile email"
  })

  return res.json({ url: `${config.AUTH_ENDPOINT}?${queryParams}` })
})

app.get("/api/sessions/oauth/google", async (req, res) => {
  const { code } = req.query

  const tokenParams = querystring.stringify({
    code,
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    redirect_uri: config.REDIRECT_URI,
    grant_type: "authorization_code"
  })

  const tokenRes = await fetch(config.TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: tokenParams
  })

  const { access_token } = await tokenRes.json()

  const userinfoOptions = {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  }

  const userinfoRes = await fetch(config.USERINFO_ENDPOINT, userinfoOptions)
  const { sub, name, email } = await userinfoRes.json()

  res.send(`Welcome, ${name} (${email})!`)
})

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
