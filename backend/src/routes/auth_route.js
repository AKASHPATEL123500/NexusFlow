import express from "express"
import { 
    changePassword,
    refreshTokenRoation,
    signin, 
    signout, 
    signup 
} from "../controllers/auth_controller.js"
import { upload } from "../middlewares/multer.js"
import { verifyToken } from "../middlewares/isAuth.js"
import { allowRoles } from "../middlewares/role_check.js"

const authRouter = express.Router()


authRouter.post("/signup",upload.fields(
    [
        {
            name : "avatar",
            maxCount : 1
        }
    ]
), signup)

authRouter.post("/signin",signin)
authRouter.post("/signout",verifyToken,allowRoles,signout)
authRouter.post("/refresh/token",refreshTokenRoation)
authRouter.post("/change/password",verifyToken,changePassword)

export default authRouter