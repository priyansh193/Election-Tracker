import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import electionRoutes from "./routes/elections.route.js"
import upcommingElectionRoutes from "./routes/upcomming.route.js"
import UserRouter from "./routes/user.route.js"
import pollRoutes from './routes/polls.route.js'

app.use("/api/elections", electionRoutes)
app.use("/api/upcommingElections", upcommingElectionRoutes)
app.use("/api/user", UserRouter)
app.use('/api/polls', pollRoutes)

export {app}