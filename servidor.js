const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app)
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Msg = require('./models/mensaje')
const User = require('./models/user')
const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI || MONGODB).then(() => {
   console.log('Connected tomongodb')
}).catch(err => console.log(err))


const sockeio = require('socket.io')
const io = sockeio(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
})




io.on('connection', socket => {

    socket.on('conectado', (imagenes,name) => {
            io.emit('nombre', {name,imagenes})
        })
       


  socket.on('resultado', (imagenes,name) =>{
    const newuser = new User({name, imagenes})
        newuser.save().then((result) => {
          io.emit('envioResultado', {result})
        })
  })

    socket.on('mensaje', (img,name,msg,id) =>{
        
       const message = new Msg({name,msg,img,id});
       message.save().then(() => {
        io.emit('mensajes', {name,msg,img,id})
       })
        
    })

    socket.on('cargarMensaje', () => {
       Msg.find().then((result)=>{
        socket.emit('ouput-mensaje', result)
       })
    })

    socket.on('pendiete', () =>{
        User.find().then((users) => {
            console.log()
           socket.emit('enviadoUser', users)
        })
    })

    
})

server.listen(port, () => console.log('esta andando'))