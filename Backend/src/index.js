import dotenv from 'dotenv'
import { app } from './app.js';
import connectDB from './db/index.js';

dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 8002;


connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port : ${port}`);
        
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})