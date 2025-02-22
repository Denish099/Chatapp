import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3000 });

let userCount: number = 0;
let allsocket: WebSocket[] = [];

wss.on("connection", (socket) => {
  userCount++;
  allsocket.push(socket);
  console.log("user connected #" + userCount);

  socket.on("message", (event) => {
    console.log("message recieved " + event.toString());

    allsocket.forEach((s) => {
      s.send(event.toString());
    });
  });
});
