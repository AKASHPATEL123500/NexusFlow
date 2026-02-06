import mongoose  from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
        index : true
    },
    username:{
        type : String,
        trim : true,
        required : true,
        unique : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    role : {
        type : String,
        required : true,
        enum : ["admin","user"],
        trim  : true,
        default : "user"
    },
    avatar : {
        type : String,
        required : true,
    },
    workspace : [{
        type : mongoose.Types.ObjectId,
        ref : "workspace"
    }],
    refreshtoken : {
        type : String
    },
    isVerified :{
        type : Boolean,
        default : false
    },
    isActive :{
        type : Boolean,
        default : true
    }

},{timestamps : true})


// password hash
userSchema.pre("save",async  function(){
    if(!this.isModified("password"))
        return
    this.password = await bcrypt.hash(this.password,12)
})



// compare password
userSchema.methods.isPasswordMatched = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}

userSchema.methods.genrateAccessToken = async function (){
    return await jwt.sign(
        {
            _id : this._id,
            name : this.name,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET_KEY
        ,{
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY_KEY
        }
    )
}


userSchema.methods.genrateRefreshToken = async function(){
    return await jwt.sign(
        {
            _id : this._id,
            role : this.role
        },
        process.env.REFRESH_TOKEN_SECRET_KEY
        ,{
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY_KEY
        }
    )
}

const User = mongoose.model("User",userSchema)
export default User