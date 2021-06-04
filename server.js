
const io = require("socket.io")(3000,{
    cors:{
        origin:"*",
    },
})


const users={};


io.on('connection', socket => {
    socket.on('new-user',nam=>{
        users[socket.id]=nam
        socket.broadcast.emit('user-connected',nam)
    })
    
    
    socket.on('send-chat-message',message=>{
        //send the message except the owner of the message who is sending it 
        socket.broadcast.emit('chat-message',{message:message,nam:users[socket.id]})
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
        
    })

})