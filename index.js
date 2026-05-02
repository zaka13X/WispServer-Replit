const express = require('express');
const { createServer } = require('node:http');
const { server: wisp } = require('@mercuryworkshop/wisp-js/server');

const app = express();
const server = createServer(app);


app.get('/', (req, res) => {
  res.send('Wisp Server is running!');
});


server.on('upgrade', (req, socket, head) => {
  if (req.url.startsWith('/wisp/')) {
    wisp.routeRequest(req, socket, head);
  }
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
