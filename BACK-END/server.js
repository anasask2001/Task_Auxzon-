import app from "./app.js";
import Connect from "./config/db_connection.js";

Connect()

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
    
})