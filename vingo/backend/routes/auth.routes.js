import express from "express"
import { resetPassword, signIn, signOut, signUp, verifyOtp, SendOtp ,googleAuth} from "../controller/auth.controller.js"

const authRouter=express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/signin",signIn)
authRouter.get("/signout",signOut)
authRouter.post("/send-otp",SendOtp)
authRouter.post("/verify-otp",verifyOtp)
authRouter.post("/reset-password",resetPassword)
authRouter.post("/google-auth",googleAuth)


export default authRouter