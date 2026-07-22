import React, { useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const ForgotPassword = () => {

    const [step, setStep] = useState(1)
    const [email, setEmail] = useState()
    const [otp, setOtp] = useState()
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    

    const navigate=useNavigate()

    return (
        <div className='flex items-center justify-center min-h-screen p-4 w-full bg-[#a67fa4b7]'>
            <div className='bg-white/10 rounded-xl shadow-lg w-full max-w-md p-4 backdrop-blur-xl '>
                <div className='text-red-400 flex items-center gap-4'>
                    <IoMdArrowBack size={20} onClick={()=>navigate("/signin")} />
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
                        <button onClick={()=>setStep(2)} className={`font-semibold w-full mt-4 flex items-center justify-center p-3 transition  duration-200 cursor-pointer  rounded-lg bg-red-800 text-white hover:bg-[#a06161]`}  >
                    Send OTP
                </button>
                    </div>
                    
                }
                {
                    step==2 
                    &&
                     <div>
                        <div className='mb-6'>
                            <label className='block text-gray-800 text-xl font-medium mb-1' htmlFor="OTP">OTP</label>
                            <input onChange={(event) => setOtp(event.target.value)} value={otp} className=' text-gray-600 rounded-lg  w-full p-1 border focus:outline-none focus:border-orange-500' type="text" placeholder='enter OTP' />
                        </div>
                        <button className={`font-semibold w-full mt-4 flex items-center justify-center p-3 transition  duration-200 cursor-pointer  rounded-lg bg-red-800 text-white hover:bg-[#a06161]`}  >
                    Verify OTP
                </button>
                    </div>
                }
                {
                    step ==3 
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
                        <button className={`font-semibold w-full mt-4 flex items-center justify-center p-3 transition  duration-200 cursor-pointer  rounded-lg bg-red-800 text-white hover:bg-[#a06161]`}  >
                    Reset Password
                </button>
                    </div>
                }


            </div>
        </div>
    )
}

export default ForgotPassword