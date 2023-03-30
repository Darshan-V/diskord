import { Server } from "socket.io"
import config from "../config.js"

let io
export default {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: JSON.parse(config.ORIGIN)
      }
    })
  },

  // get and listen are called only after init
  get: () => {
    if (io) return io
    throw new Error("socket not initialized")
  },

  listen: () => {
    io.on("connection", (socket) => {
      console.log("socket connected:", socket.id)

      // listen for joining a new channel
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

      // listen for new message and broadcast
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
  }
  //
}
