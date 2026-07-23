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


const SignUp = () => {
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
    const[error,setError]=useState("")

    const handleSignUp = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullName, email, password, mobile, role
            },
                {
                    withCredentials: true
                })

                console.log(result)
                setError("")


        } catch (error){
            setError(error.response.data.message)
            console.log(error.response?.data)

        }
    }
    const handleGoogleAuth=async()=>{
        if(!mobile){
            return setError("mobile number is required")
        }
        const provider=new GoogleAuthProvider()
        const result=await signInWithPopup(auth,provider)

        try{
            const{data} =await axios.post(`${serverUrl}/api/auth/google-auth`,{
                fullName:result.user.displayName,
                email:result.user.email,
                role,
                mobile,
            },{withCredentials:true})
            console.log(data)
        }
        catch(error){
            console.log(error)

        }

    }
    return (
        <div className='min-h-screen w-full flex items-center justify-center p-3 ' style={{ backgroundColor: bgColor, backgroundSize: "cover" }}>

            <div className={`0 rounded-xl  shadow-2xl w-full max-w-md p-4 border backdrop-blur-xl ]`}>
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
                    <div className='flex gap2'>
                        {["user", "owner", "deliveryBoy"].map((r, index) => (
                            <button key={index} className=' flex-1 border rounded-lg px-3 py-2 text-center'
                                onClick={() => setRole(r)}
                                style={
                                    role == r ? { backgroundColor: primaryColor, color: "white" } : { border: ` 1px solid ${primaryColor}`, color: primaryColor }
                                }
                            >
                                {r}</button>
                        ))}

                    </div>
                </div>

                <button onClick={handleSignUp} className={`font-semibold w-full mt-4 flex items-center justify-center p-3 transition  duration-200 cursor-pointer  rounded-lg bg-red-800 text-white hover:bg-[#a06161]`}  >
                    Sign Up
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




            </div>

        </div>
    )
}

export default SignUp