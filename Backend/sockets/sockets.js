import { Server } from "socket.io"

let io
export default {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: ["http://localhost:5173"]
      }
    })
  },

  get: () => {
    if (io) return io
    throw new Error("socket not initialized")
  }
}
