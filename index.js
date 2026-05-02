const { createServer } = require("http");
const { WebSocketServer } = require("ws");
const { wisp } = require("@mercuryworkshop/wisp-js/server");

const server = createServer();
const wispServer = new WebSocketServer({ noServer: true });

wispServer.on("connection", (socket) => {
  wisp.handle(socket);
});

server.on("upgrade", (request, socket, head) => {
  if (request.url === "/wisp") {
    wispServer.handleUpgrade(request, socket, head, (ws) => {
      wispServer.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Wisp server running on port ${PORT}`);
});
