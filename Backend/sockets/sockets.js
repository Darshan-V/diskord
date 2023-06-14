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
        console.log(msg)
        const newMsg = {
          msgTxt: msg.msgTxt,
          msgTime: Date.now(),
          channelId: msg.channelId,
          logMsg: false
        }

        socket.to(msg.channelId).emit("broadcast-msg", newMsg)
      })

      // leaving channel
      socket.on("leave-channel", (channelId) => {
        const leaveMsg = {
          msgTxt: "user left",
          msgTime: Date.now(),
          channelId: channelId,
          logMsg: true
        }
        socket.to(channelId).emit("user-left", leaveMsg)
        socket.leave(channelId)
      })

      socket.on("disconnect", (channelId) => {
        const disconnectMsg = {
          msgTxt: "user disconnected",
          msgTime: Date.now(),
          channelId: channelId,
          logMsg: true
        }
        socket.to(channelId).emit("user-disconnected", disconnectMsg)
        socket.leave(channelId)
      })
    })
  }
  //
}
