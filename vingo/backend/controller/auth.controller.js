import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js";
import { sendOtp } from "../utils/mail.js";



export const signUp = async (req, res) => {

    try {
        console.log("BODY:", req.body);

        const { fullName, email, password, mobile, role } = req.body;
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User Already Exist " })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be 6  character" })
        }
        if (mobile.length < 10) {
            return res.status(400).json({ message: "password must be 10 digits" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            fullName,
            email,
            role,
            mobile,
            password: hashedPassword
        })

        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return res.status(201).json(user)
    }
    catch (error) {
        return res.status(500).json(`sign up  error ${error}`)

    }

}






export const signIn = async (req, resp) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return resp.status(400).json({ message: "User Does not  Exist " })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return resp.status(400).json({ message: "incorrect password" })
        }



        const token = await genToken(user._id)
        resp.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return resp.status(200).json(user)
    }
    catch (error) {
        return resp.status(500).json(`sign in  error ${error}`)

    }

}



export const signOut = async (req, resp) => {
    try {
        resp.clearCookie("token")

        return resp.status(200).json({ message: "sign out successfully" })

    } catch (error){
        return resp.status(500).json(`sign out  error ${error}`)

    }


}



export const SendOtp = async (req, res) => {
    try {
                console.log("BODY:", req.body);

        const {email} = req.body
                console.log("EMAIL:", email);

        const user = await User.findOne({ email })
                console.log("USER:", user);

        if (!user) {
            return res.status(400).json({ message: "user does not exist." })
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.OtpExpires = Date.now() + 5 * 60 * 1000
        user.isOtpVerified = false
        await user.save()
        await sendOtp(email, otp)

        return res.status(200).json({ message: "otp  sent successfully" })

    }catch (error) {
    console.log("SEND OTP ERROR:", error);

    return res.status(500).json({
        message: error.message
    });
}

}


export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
          

        const user = await User.findOne({ email })
       

        if (!user || user.resetOtp != otp || user.OtpExpires < Date.now()) {
           return res.status(400).json({ message: "invalid or expired otp" })
        }
        user.resetOtp = undefined
        user.isOtpVerified = true;
        user.OtpExpires = undefined
        await user.save()

        return res.status(200).json({ message: "otp verified successfully" })

    } catch (error) {
        return res.status(500).json(`verify otp  error ${error}`)


    }
}


export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body
        const user = await User.findOne({ email })

        if (!user|| !user.isOtpVerified) {
            return res.status(400).json({ message: "otp  verification required" })
        }
        const  hashedPassword=await bcrypt.hash(newPassword,10)
        user.password=hashedPassword
        user.isOtpVerified=false
        await user.save()

        return res.status(200).json({message:"hashedPassword reset successfully"})
    } catch (error) {
        return res.status(500).json(` password reset  error ${error}`)


    }
}