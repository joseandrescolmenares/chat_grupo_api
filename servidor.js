const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app)
const cors = require('cors')
const port = process.env.PORT || 3001

const sockeio = require('socket.io')
const io = sockeio(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
})

io.on('connection', socket => {

    socket.on('conectado', (name) => {
        console.log(name)
       io.emit('nombre', {name})
    })
})

server.listen(port, () => console.log('esta andando'))