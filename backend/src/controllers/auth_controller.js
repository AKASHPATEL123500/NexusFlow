import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/user_model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"

export const signup = asyncHandler(async(req,res)=>{
    
        const { name ,username , email , password  } = req.body

        const avatarLocalPath = req.files?.avatar?.[0]?.path

        if(!avatarLocalPath){
            throw new ApiError(400,"avatar is missing")
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        if(!avatar){
            throw new ApiError(400,"Error during avatar upload on cloudinary")
        }

        if( !name || !username || !email || !password ){
            throw new ApiError(400,"all field are required")
        }

        const findByUsername = await User.findOne({username})
        if(findByUsername){
            throw new ApiError(409,"username already exist")

        }

        const findByEmail = await User.findOne({email})
        if(findByEmail){
            throw new ApiError(409,"email already exist")
        }

        const user = await User.create(
            {
                name : name,
                username : username,
                email : email,
                password : password,
                role : "user",
                avatar : avatar.url,
                
            }
        )

        return res.status(201).json(
            new ApiResponse(201,user,"Signup successfully")
        )
    
})


export const signin = asyncHandler(async(req,res)=>{

    const { username , password } = req.body

    if( !username || !password){
        throw new ApiError(400,"All fielda are required")
    }

    
    
    const existingUser = await User.findOne({ username }).select("+password")

    if(!existingUser){
        throw new ApiError(404,"User not found")
    }

    const userData = existingUser
    delete userData.refreshtoken
    delete userData.password


    const isCorrectPassword = await existingUser.isPasswordMatched(password,existingUser.password)

    if(!isCorrectPassword){
        throw new ApiError(400,"Incorrect Password")
    }

    const accessToken = await existingUser.genrateAccessToken()
    const refreshToken = await existingUser.genrateRefreshToken()

    existingUser.refreshtoken = refreshToken
    await existingUser.save( { validateBeforeSave : false })

    const options = {
        httpOnly : true,
        secure : false, // dev me false pro me true
        sameSite : "strict",
        maxAge : 10 * 24 * 60 * 60 * 1000
    }
    

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {"user" : userData,accessToken},
            "Signin Successfully"
        )
    )
})


export const signout = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset : {refreshtoken : 1}
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,"Signout successfully")
    )

})


export const refreshTokenRoation = asyncHandler(async(req,res)=>{

    const inComingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken

    if(!inComingRefreshToken){
        throw new ApiError(401,"Unauthtenticated Request")
    }

    const decodeToken = await jwt.verify(inComingRefreshToken,process.env.REFRESH_TOKEN_SECRET_KEY)

    const user = await User.findById(decodeToken?._id)

    if(!user){
        throw new ApiError(401,"invaild refresh token")
    }

    if(inComingRefreshToken !== user.refreshtoken){
        throw new ApiError(400,"refresh Token is expire")
    }

    const accessToken = await user.genrateAccessToken()
    const newRefreshTokne = await user.genrateRefreshToken()

    user.refreshtoken = newRefreshTokne
    user.save({validateBeforeSave : false})

    const options = {
        httpOnly : true,
        secure : false,
        sameSite : "Strict",
        maxAge : 10 * 24 * 60 * 60 * 1000
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",newRefreshTokne,options)
    .json(
        new ApiResponse(200,{accessToken : accessToken},"Re new refresh token successfully")
    )
})


export const changePassword = asyncHandler(async(req,res)=>{

    const { oldPassword , newPassword } = req.body

    if( !oldPassword  || !newPassword ){
        throw new ApiError(400,"All fields are required")
    }

    const user = await User.findById(req.user._id).select("+password") 

    const passwordMatch = await user.isPasswordMatched(oldPassword)

    if(!passwordMatch){
        throw new ApiError(400,"Inccorrect password")
    }

    user.password = newPassword
    user.save({validateBeforeSave : false})

    return res.status(200).json(
        new ApiResponse(200,"Password change successfuly")
    )
})
