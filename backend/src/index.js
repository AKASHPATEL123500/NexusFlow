import app from "./app.js";

const PORT = process.env.PORT || 15000

app.listen(PORT,()=>{
    console.log(`Server is ruing on http://localhost:${PORT}`);
    
})