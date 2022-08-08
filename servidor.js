const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app)
const cors = require('cors')

const sockeio = require('socket.io')
const io = sockeio(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
})

io.on('connection', socket => {

    socket.on('conectado', () => {
      console.log('usuario conectado')
    })
})

server.listen(3001, () => console.log('esta andando'))