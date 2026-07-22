import express from  "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors"
const  app= express();
dotenv.config()
const port=process.env.PORT||5000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))



app.use("/api/auth",authRouter)



app.listen(port,()=>{
    connectDb()
    console.log(`server started at ${port}`)

})