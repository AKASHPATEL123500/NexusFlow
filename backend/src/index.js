import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 15000

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is ruing on http://localhost:${PORT}`);
    
})