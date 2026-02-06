import User from "../models/user_model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyToken = asyncHandler(async(req,res,next)=>{

    const token = req.cookies?.accessToken || req.authorization?.replace("Bearer ","")
    if(!token){
        throw new ApiError(404,"token not found")
    }

    const decodeToken = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY)

    const user = await User.findById(decodeToken?._id).select("-password")
    if(!user){
        throw new ApiError(400,"Unauthroization Access")
    }

    req.user = user
    next()

})