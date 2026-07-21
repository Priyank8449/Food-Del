import express from  "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js";

dotenv.config()
const port=process.env.PORT||5000
const  app= express();


app.get("",(req,resp)=>{
    resp.send("helo")
})


app.listen(port,()=>{
    connectDb()
    console.log(`server started at ${port}`)

})