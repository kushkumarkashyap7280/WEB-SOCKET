const http = require('http');

const express = require('express');
const { Server } = require('socket.io');
const app = express();
const port = 3000;

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
 console.log("Client socket.id:", socket.id);
    socket.on('message', (msg) => {
        console.log('Message received:', msg);
        io.emit('message', msg); // Broadcast the message to all clients
    });

});

server.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});