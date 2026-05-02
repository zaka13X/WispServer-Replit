const http = require('http');
const { wisp } = require('@mercuryworkshop/wisp-js/server');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Wisp Proxy is running.');
});


server.on('upgrade', (req, socket, head) => {
    wisp.routeRequest(req, socket, head);
});


server.listen(3000, '0.0.0.0', () => {
    console.log('Wisp server listening on port 3000');
});
