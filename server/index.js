const express = require('express')
const cors = require('cors')
require('dotenv').config()
const router = require('./routes/user-routes.js')
const messagesRoute = require('./routes/message-routes.js')
const socket = require('socket.io')
 
const app = express();
const PORT = process.env.PORT || 8000;
const connectDB = require('./Connect.js')
let server;

const mongo_uri = process.env.Mongo_URI;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send("HIi, I'm live...")
})

app.use("/api/auth", router);
app.use("/api/messages", messagesRoute)

const start = async() => {
    try {
        await connectDB(mongo_uri);
        console.log("Successfully connected to Database");
        server = app.listen(PORT, () => {
            console.log(`Server started on PORT ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start();

const io = socket(server, {
    cors:{
        origin:"http://localhost:8000",
        credentials:true
    }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;

    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id)
    });

    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to('sendUserSocket').emit('msg-receive', data.msg);
        }
    });
});
