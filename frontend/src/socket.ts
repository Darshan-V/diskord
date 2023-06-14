import { io, Socket } from "socket.io-client"

const socket = io("http://localhost:3000", {
  autoConnect: false,
  transports: ["websocket"]
})

export default socket
