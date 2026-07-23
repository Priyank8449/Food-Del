import React, { useState } from 'react'
import signUpBg from "../assets/signup-bg-2.jpg";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { Navigate } from 'react-router-dom';
import { GoogleAuthProvider, setPersistence, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from 'react-spinners';


const SignIn = () => {
    const primaryColor = "red"
    const hoverColor = "#e64323"
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"

    const navigate=useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const[error,setError]=useState("")
        const[loading,setLoading]=useState(false)
    

    const handleSignIn = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signin`, {
                 email, password
            },
                {
                    withCredentials: true
                })

                console.log(result)
                setError("")
                setLoading(false)


        }catch (error) {
            setError(error.response.data.message)
    console.log(error);
}
    }

    
    const handleGoogleAuth=async()=>{
        
        const provider=new GoogleAuthProvider()
        const result=await signInWithPopup(auth,provider)

        try{
            const{data} =await axios.post(`${serverUrl}/api/auth/google-auth`,{
                email:result.user.email,
                
            },{withCredentials:true})
            console.log(data)
        }
        catch(error){
            console.log(error)

        }

    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center p-3 ' style={{ backgroundSize: "cover",backgroundPosition:"center"}}>

            <div className={`bg-black/10 rounded-xl  shadow-2xl w-full max-w-md p-4 border backdrop-blur-xl ]`}>
                <h1 className={`text-3xl font-bold mb-2`} style={{ color: primaryColor }}>Anytime Craving</h1>
                <p className='text-gray-400 mb-4'>Sign In to your account to  get  started with  delicious food deliveries </p>

        

                {/* email */}
                <div className='mb-3'>
                    <label className='block text-gray-800 text-xl font-medium mb-1' htmlFor="email">Email</label>
                    <input onChange={(event) => setEmail(event.target.value)} value={email} required className=' text-gray-600 rounded-lg  w-full p-1 border focus:outline-none focus:border-orange-500' type="email" placeholder='enter your email' />
                </div>
              
                {/* password */}
                <div className='mb-3'>
                    <label className='block text-gray-800 text-xl font-medium mb-1' htmlFor="password">Password</label>
                    <div className='relative'>
                        <input onChange={(event) => setPassword(event.target.value)} value={password} required className=' text-gray-600 rounded-lg  w-full p-1 border focus:outline-none focus:border-orange-500' type={`${showPassword ? "text" : "password"}`} placeholder='enter your password' />
                        <button onClick={() => setShowPassword(prev => !prev)} className='absolute right-3 top-[8px] text-2xl cursor-pointer '>{showPassword ? <FaEyeSlash /> : <FaRegEye />}</button>
                    </div>
                </div>

                <div className='text-right mb-4 text-red-500 cursor-pointer' onClick={()=>navigate("/forgot-password")}>
                    Forgot Password
                </div>



                <button onClick={handleSignIn} disabled={loading} className={`font-semibold w-full mt-4 flex items-center justify-center p-3 transition  duration-200 cursor-pointer  rounded-lg bg-red-800 text-white hover:bg-[#a06161]`}  >
                    {loading?<ClipLoader/>:"Sign In"}
                    
                </button>
                <p className='text-red-700 text-center'>{error}</p>


                <button onClick={handleGoogleAuth} className='w-full mt-4  p-1.5 flex justify-center items-center border-gray-200  rounded hover:bg-gray-200 cursor-pointer'><FcGoogle size={20} />
                    <span>Sign in with Google</span>
                </button>
                <p className='text-center mt-2'>Don't have an Account ?
                    <Link to="/signup">
                        <span className='text-red-600 cursor-pointer '>Sign up</span>
                    </Link>
                </p>




            </div>

        </div>
    )
}

export default SignIn