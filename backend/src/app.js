import express from "express"
import dotenv from "dotenv"
import errorHandler from "./middlewares/errorHandler.js"
import authRouter from "./routes/auth_route.js"
import cookieParser from "cookie-parser"
dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth/v1/",authRouter)

app.get("/",(req,res)=>{
    res.send("<h1>Hello from NexusFlow Team</h1>")
})
app.use(errorHandler)

export default app