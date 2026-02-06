import User from "../models/user_model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProfile = asyncHandler(async(req,res)=>{

    const currentUser = req.user
    
    if(!currentUser){
        throw new ApiError(401,"Unauthenticated Request")
    }

    return res.status(200).json(
        new ApiResponse(200,{"data":currentUser},"Profile fatched successfully")
    )
})