import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors({ origin: ["http://localhost:3001"] }));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:3001"] },
});

const connectedSockets = [];

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  connectedSockets.push(socket);

  socket.on("iceCandidate", (data) => {
    console.log("iceCandidate:", data.candidate);
    connectedSockets
      .filter((connectedSocket) => connectedSocket !== socket)
      .forEach((connectedSocket) => connectedSocket.emit("iceCandidate", data));
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
    connectedSockets.filter((connectedSocket) => connectedSocket !== socket);
  });
});

httpServer.listen(3000, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("listening on port:", 3000);
});
