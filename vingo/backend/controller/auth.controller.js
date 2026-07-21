import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js";
 export const signUp= async(req,resp)=>{

    try{
        const{fullName,email,password,mobile,role}=req.body;
        const  user = await User.findOne({email})
        if(user){
            return resp.status(400).json({message:"User Already Exist "})
        }
        if(password.length<6){
            return resp.status(400).json({message:"password must be 6  character"})
        }
        if(mobile.length<10){
            return resp.status(400).json({message:"password must be 10 digits"})
        }

        const hashedPassword=await bcrypt.hash(password,10)
        user=await User.create({
            fullName,
            email,
            role,
            mobile,
            password:hashedPassword
        })

        const token=await genToken(user._id)
        resp.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return resp.status(201),json(user)
    }
    catch(error){
        return resp.status(500),json(`sign up  error ${error}`)

    }

}






export const signUp= async(req,resp)=>{

    try{
        const{email,password}=req.body;
        const  user = await User.findOne({email})
        if(!user){
            return resp.status(400).json({message:"User Does not  Exist "})
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return resp.status(400).json({message:"incorrect password"})
        }
        
     

        const token=await genToken(user._id)
        resp.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return resp.status(200),json(user)
    }
    catch(error){
        return resp.status(500),json(`sign in  error ${error}`)

    }

}


