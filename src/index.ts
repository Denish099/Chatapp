import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3000 });

interface User {
  socket: WebSocket;
  room: string;
}

const allsocket: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parseMessage = JSON.parse(message.toString());

    if (parseMessage.type === "join") {
      allsocket.push({
        socket,
        room: parseMessage.payload.roomid,
      });
    }

    if (parseMessage.type === "chat") {
      const currentUserRoom = allsocket.find((x) => x.socket === socket)?.room;

      if (currentUserRoom) {
        allsocket.forEach((user) => {
          if (user.room === currentUserRoom) {
            user.socket.send(parseMessage.payload.message);
          }
        });
      }
    }
  });
});
