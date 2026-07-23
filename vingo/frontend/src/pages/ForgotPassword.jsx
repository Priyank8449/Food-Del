import React, { useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { serverUrl } from '../App';

import axios from 'axios';
const ForgotPassword = () => {

    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")



    const navigate = useNavigate()


    const handleSendOtp = async () => {
        console.log("EMAIL:", email);

        try {
            const result = await axios.post(`${serverUrl}/api/auth/send-otp`, { email },
                { withCredentials: true });
            console.log(result)
            setStep(2)
            setError("")
        }

        catch (error) {
            setError(error.response.data.message)
            console.log(error)

        }
    }
    const handleVeryfyOtp = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp },
                { withCredentials: true });
            console.log(result)
            setStep(3)
            setError("")

        }

        catch (error) {
            setError(error.response.data.message)

            console.log(error)

        }
    }
    const handleResetPassword = async () => {
        if (newPassword != confirmPassword) {
            return null
        }
        try {
            const result = await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword },
                { withCredentials: true });
            console.log(result)
            navigate("/signin")
            setError("")

        }

        catch (error) {
            console.log(error)
            setError(error.response.data.message)


        }
    }


    return (
        <div className='flex items-center justify-center min-h-screen p-4 w-full bg-[#a67fa4b7]'>
            <div className='bg-white/10 rounded-xl shadow-lg w-full max-w-md p-4 backdrop-blur-xl '>
                <div className='text-red-400 flex items-center gap-4'>
                    <IoMdArrowBack size={20} onClick={() => navigate("/signin")} />
                    <h1 className='text-2xl font-bold text-center w-full ' >Forgot Password</h1>
                </div>

                {
                    step == 1
                    &&
                    <div>
                        <div className='mb-6'>
                            <label className='block text-gray-800 text-xl font-medium mb-1' htmlFor="email">Email</label>
                            <input onChange={(event) => setEmail(event.target.value)} value={email} className=' text-gray-600 rounded-lg  w-full p-1 border focus:outline-none focus:border-orange-500' type="email" placeholder='enter your email' />
                        </div>
                        <button onClick={handleSendOtp} className={`font-semibold w-full mt-4 flex items-center justify-center p-3 transition  duration-200 cursor-pointer  rounded-lg bg-red-800 text-white hover:bg-[#a06161]`}  >
                            Send OTP
                        </button>
                        <p className='text-red-700 text-center'>{error}</p>

                    </div>

                }
                {
                    step == 2
                    &&
                    <div>
                        <div className='mb-6'>
                            <label className='block text-gray-800 text-xl font-medium mb-1' htmlFor="OTP">OTP</label>
                            <input onChange={(event) => setOtp(event.target.value)} value={otp} className=' text-gray-600 rounded-lg  w-full p-1 border focus:outline-none focus:border-orange-500' type="text" placeholder='enter OTP' />
                        </div>
                        <button onClick={handleVeryfyOtp} className={`font-semibold w-full mt-4 flex items-center justify-center p-3 transition  duration-200 cursor-pointer  rounded-lg bg-red-800 text-white hover:bg-[#a06161]`}  >
                            Verify OTP
                        </button>
                        <p className='text-red-700 text-center'>{error}</p>

                    </div>
                }
                {
                    step == 3
                    &&
                    <div>
                        <div className='mb-3'>
                            <label className='block text-gray-800 text-xl font-medium mb-1' htmlFor="password">New Password</label>
                            <div className='relative'>
                                <input onChange={(event) => setNewPassword(event.target.value)} value={newPassword} className=' text-gray-600 rounded-lg  w-full p-1 border focus:outline-none focus:border-orange-500' type={`${showPassword ? "text" : "password"}`} placeholder='enter new password' />
                                <button onClick={() => setShowPassword(prev => !prev)} className='absolute right-3 top-[8px] text-2xl cursor-pointer '>{showPassword ? <FaEyeSlash /> : <FaRegEye />}</button>
                            </div>
                            <label className='block text-gray-800 text-xl font-medium mb-1' htmlFor="password">Confirm Password</label>
                            <div className='relative'>
                                <input onChange={(event) => setConfirmPassword(event.target.value)} value={confirmPassword} className=' text-gray-600 rounded-lg  w-full p-1 border focus:outline-none focus:border-orange-500' type={`${showPassword ? "text" : "password"}`} placeholder='enter confirm password' />
                                <button onClick={() => setShowPassword(prev => !prev)} className='absolute right-3 top-[8px] text-2xl cursor-pointer '>{showPassword ? <FaEyeSlash /> : <FaRegEye />}</button>
                            </div>
                        </div>
                        <button onClick={handleResetPassword} className={`font-semibold w-full mt-4 flex items-center justify-center p-3 transition  duration-200 cursor-pointer  rounded-lg bg-red-800 text-white hover:bg-[#a06161]`}  >
                            Reset Password
                        </button>
                        <p className='text-red-700 text-center'>{error}</p>

                    </div>
                }


            </div>
        </div>
    )
}

export default ForgotPassword