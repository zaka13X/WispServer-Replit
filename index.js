const express = require('express');
const { createServer } = require('node:http');
const wisp = require('wisp-server-node');

const app = express();
const server = createServer(app);


app.get('/', (req, res) => {
  res.send('Wisp Server is Running!');
});


server.on('upgrade', (req, socket, head) => {
  wisp.routeRequest(req, socket, head);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
