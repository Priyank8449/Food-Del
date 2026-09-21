import React, { useState } from 'react'
import signUpBg from "../assets/signup-bg3.avif";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from "react-spinners"
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { motion } from 'framer-motion';
import { FaBicycle } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

import signIn from "../assets/signin.png"
import hat from "../assets/hat.png"



const SignUp = () => {
    const dispatch = useDispatch()
    const primaryColor = "red"
    const hoverColor = "#e64323"
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"

    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState("user")


    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSignUp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullName, email, password, mobile, role
            },
                {
                    withCredentials: true
                })
            dispatch(setUserData(result.data))
            console.log(result)
            setError("")
            setLoading(false)


        } catch (error) {
            setError(error.response.data.message)
            console.log(error.response?.data)
            setLoading(false)

        }
    }
    const handleGoogleAuth = async () => {
        if (!mobile) {
            return setError("mobile number is required")
        }
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)

        try {
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                role,
                mobile,
            }, { withCredentials: true })
            dispatch(setUserData(data))

            console.log(data)
        }
        catch (error) {
            console.log(error)

        }

    }
    return (
        <div className='min-h-screen w-full bg-sky-200 gap-10 flex items-center justify-center p-3 ' style={{ backgroundSize: "cover" }}>


            <div className='hidden  sm:flex  w-[50%] p-10 flex flex-col justify-between  bg-amber-200/10 border border-sky-500 shadow-2xl h-160 rounded-2xl backdrop-blur-2xl   '>


                <div className=' flex gap-6 '>


                    <div className='h-20 w-20 flex justify-center bg-transparent  rounded-2xl'>

                        <img className='object-contain w-full rounded-2xl' src={hat} alt="" />

                    </div>

                    <div>

                        <h1 className=' font-bold text-sky-500 text-5xl'>
                            <span className='text-blue-800 font-bold'>AnyTime</span>  Craving
                        </h1>
                        <div className='flex gap-8'>
                            <p className='text-blue-900 font-semibold text-lg'>Good Food</p>
                            <p className='text-blue-900 font-semibold text-lg'> Happy You </p>
                        </div>
                    </div>


                </div>
                <div className=' flex flex-col '>
                    <h2 className='font-bold text-blue-900 text-3xl'>Delicious Food </h2>
                    <h2 className='font-bold text-blue-900 text-3xl'>Delivered To Your </h2>
                    <h2 className='font-bold text-blue-900 text-3xl'>Doorstep </h2>

                    <p className='text-blue-600 mt-5 font-medium'>From your favorite resturant </p>

                    <p className='text-blue-600  font-medium'>to  your home. We deliver happiness</p>
                    <p className='text-blue-600  font-medium'> in  every  bite</p>
                </div>


                <div className='h-30 flex' >
                    <img className='object-contain' src={signIn} alt="" />

                </div>

                    
                <div className='flex gap-6'>
                    <div className='flex flex-col shadow-xl border-l p-2 '>
                        <div className=' h-10 w-10'>
                            <FaBicycle className='size-10 text-blue-500'/>
                            
                        </div>
                        <p className='text-blue-500'  >Fast Delivery</p>

                    </div>
                    <div className='flex flex-col shadow-xl border-l p-2 '>
                        <div className=' h-10 w-10 flex items-center justify-center'>
                            
                            <MdHealthAndSafety className='size-10 text-blue-500' />


                        </div>
                        <p className='text-blue-500'>Safe Payments</p>

                    </div>
                    <div className='flex flex-col shadow-xl border-l p-2 '>
                        <div className=' h-10 w-10'>
                            <FaStar className='size-10 text-blue-500' />

                            
                           
                            </div>
                        <p className='text-blue-500'>Top Resturants</p>

                    </div>
                    
                </div>

            </div>

            <motion.div

                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.6,
                    delay: 0.2,

                }}



                className={`0 rounded-xl bg-white/30  shadow-2xl w-full max-w-md p-4 border border-blue-300 backdrop-blur-xl ]`}>



                <h1 className={`text-3xl font-bold mb-2`} style={{ color: primaryColor }}>Anytime Craving</h1>
                <p className='text-gray-400 mb-4'>Create your account to  get  started with  delicious food deliveries </p>

                {/* fullname */}
                <div className='mb-3'>
                    <label className='block text-gray-800 text-xl font-medium mb-1' htmlFor="fullname">Full Name</label>
                    <input className=' text-gray-600 rounded-lg  w-full p-1 border focus:outline-none focus:border-orange-500' onChange={(event) => setFullName(event.target.value)} value={fullName} required type="text" placeholder='enter full  name' />
                </div>

                {/* email */}
                <div className='mb-3'>
                    <label className='block text-gray-800 text-xl font-medium mb-1' htmlFor="email">Email</label>
                    <input onChange={(event) => setEmail(event.target.value)} value={email} required className=' text-gray-600 rounded-lg  w-full p-1 border focus:outline-none focus:border-orange-500' type="email" placeholder='enter your email' />
                </div>
                {/* mobile */}
                <div className='mb-3'>
                    <label className='block text-gray-800 text-xl font-medium mb-1' htmlFor="mobile">Mobile</label>
                    <input onChange={(event) => setMobile(event.target.value)} value={mobile} required className=' text-gray-600 rounded-lg  w-full p-1 border focus:outline-none focus:border-orange-500' type="number" placeholder='enter your mobile number' />
                </div>
                {/* password */}
                <div className='mb-3'>
                    <label className='block text-gray-800 text-xl font-medium mb-1' htmlFor="password">Password</label>
                    <div className='relative'>
                        <input onChange={(event) => setPassword(event.target.value)} value={password} required className=' text-gray-600 rounded-lg  w-full p-1 border focus:outline-none focus:border-orange-500' type={`${showPassword ? "text" : "password"}`} placeholder='enter your password' />
                        <button onClick={() => setShowPassword(prev => !prev)} className='absolute right-3 top-[8px] text-2xl cursor-pointer '>{showPassword ? <FaEyeSlash /> : <FaRegEye />}</button>
                    </div>
                </div>


                {/* role */}
                <div className='mb-3'>
                    <label className='block text-gray-800 text-xl font-medium mb-1' htmlFor="role">Role</label>
                    <div className='flex gap2 bg-sky-100'>
                        {["user", "owner", "deliveryBoy"].map((r, index) => (
                            <button key={index} className=' flex-1 border rounded-lg px-3 py-2 text-center'
                                onClick={() => setRole(r)}
                                style={
                                    role == r ? { backgroundColor: "skyblue", color: "white" } : { border: ` 1px solid skyblue` }
                                }
                            >
                                {r}</button>
                        ))}

                    </div>
                </div>

                <button onClick={handleSignUp} disabled={loading} className={`font-semibold w-full mt-4 flex items-center justify-center p-3 transition  duration-200 cursor-pointer  rounded-lg bg-sky-600 text-white hover:bg-[#a06161]`}  >
                    {loading ? <ClipLoader size={20} /> : "Sign Up"}

                </button>
                <p className='text-red-700 text-center'>{error}</p>

                <button onClick={handleGoogleAuth} className='w-full mt-4  p-1.5 flex justify-center items-center border-gray-200  rounded hover:bg-gray-200 cursor-pointer'><FcGoogle size={20} />
                    <span>Sign up with Google</span>
                </button>
                <p className='text-center mt-2'>Already have an Account ?
                    <Link to="/signin">
                        <span className='text-red-600 cursor-pointer '>Sign In</span>
                    </Link>
                </p>




            </motion.div>

        </div>
    )
}

export default SignUp