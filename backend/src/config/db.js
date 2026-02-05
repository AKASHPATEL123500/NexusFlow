import mongoose from "mongoose"

const connectDB = async () =>{
    try {
        const connectObject = await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected successfully");
        console.log("db host name", connectObject.connection.host);
        
    } catch (error) {
        console.log("DB connected error : ",error.message);
        process.exit(1)
    }
}

export default connectDB