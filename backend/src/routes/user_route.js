import express from "express"
import { verifyToken } from "../middlewares/isAuth.js"
import { getProfile } from "../controllers/user_controller.js"

const userRouter = express.Router()

userRouter.get("/profile",verifyToken,getProfile)

export default userRouter