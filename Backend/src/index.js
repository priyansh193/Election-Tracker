import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import { app } from './app.js';
import connectDB from './db/index.js';

dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 8002;

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        method : ['POST', 'GET']
    }
});

app.set('io', io)


connectDB()
.then(() => {
    server.listen(port, () => {
        console.log(`Server is running at port : ${port}`);
        
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})