import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  const users = {};

  socket.on("user", (data) => (users[socket.id] = data));

  socket.on("msg", (data) => {
    io.emit("msg", { id: users[socket.id], msg: data });
  });
});

server.listen(5000, () => console.log("Listening on 5000"));
