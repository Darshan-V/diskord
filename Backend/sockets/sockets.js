import { Server } from "socket.io"

let io
export default {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: ["http://localhost:3001"]
      }
    })
  },

  get: () => {
    if (io) return io
    throw new Error("socket not initialized")
  }
}
