import React, { use, useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { RxCross2 } from "react-icons/rx";
import { serverUrl } from '../App';
import { linkWithCredential } from 'firebase/auth';
import { setUserData } from '../redux/userSlice';
import axios from 'axios';
import { FaPlus } from "react-icons/fa6";

import { FaReceipt } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const Nav = () => {

    const { userData, currentCity ,cartItems} = useSelector(state => state.user)
    const { myShopData } = useSelector(state => state.owner)
    
    const [showInfo, setShowInfo] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`,
                { withCredentials: true }
            )
            dispatch(setUserData(null))


        } catch (error) {
            console.log(error)

        }
    }
    return (
        <>
            <div className='w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-olive-300 overflow-visible:'>

                {
                    showSearch && userData.role == "user" &&
                    <div className='w-[90%] h-[70px] fixed bg-white shadow-black/25 shadow-xl rounded-lg  items-center gap-[20px]   flex top-[80px] left-[5%] md:hidden'>
                        <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400'>
                            <IoLocationSharp className=' w-[25px] h-[25px] text-red-800' />
                            <div className='w-[80%] truncate text-gray-500'>{currentCity}</div>


                        </div>
                        <div className='flex w-[80%] items-center gap-[10px]'>
                            <IoMdSearch size={25} className='text-red-800/70' />
                            <input className='w-full px-[10px] text-gray-700 outline-0' type="text" placeholder=' search delicious food....' />


                        </div>
                    </div>

                }
                <h1 className='text-3xl font-bold mb-2 text-red-600/60'>
                    Anytime <span className='text-yellow-600'>Craving</span>

                </h1>

                {
                    userData.role == "user" &&
                    <div className='md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-black/25 shadow-xl rounded-lg  items-center gap-[20px] hidden  md:flex'>
                        <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400'>
                            <IoLocationSharp className=' w-[25px] h-[25px] text-red-800' />
                            <div className='w-[80%] truncate text-gray-500'>{currentCity}</div>


                        </div>
                        <div className='flex w-[80%] items-center gap-[10px]'>
                            <IoMdSearch size={25} className='text-red-800/70' />
                            <input className='w-full px-[10px] text-gray-700 outline-0' type="text" placeholder=' search delicious food....' />


                        </div>
                    </div>
                }

                <div className='flex items-center justify-center gap-4'>

                    {userData.role == "user" &&

                        (
                            showSearch ? <RxCross2 onClick={() => setShowSearch(false)} size={25} className='text-red-800/70 md:hidden' /> : <IoMdSearch onClick={() => setShowSearch(true)} size={25} className='text-red-800/70 md:hidden' />

                        )
                    }

                    {
                        userData.role == "owner" ?
                            <>{
                                myShopData &&
                                <>
                                    <button onClick={()=>navigate("/add-item")} className='hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10  text-red-500'>
                                        <FaPlus size={20} />
                                        <span>Add Food Item</span>


                                    </button>
                                    <button className=' md:hidden flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10  text-red-500'>
                                        <FaPlus size={20} />


                                    </button>
                                </>
                            }

                            {
                                userData.role=="user" &&

                                <div className='hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-red-500/10 text-red-500 font-medium'>
                                    <FaReceipt />
                                    <span>My Orders</span>
                                    <span className='absolute -top-2 -right-2 text-xs font-bold text-white bg-red-500 rounded-full px-[6px] py-[1px] '>  0</span>

                                </div>
                            }



                                
                                <div className='md:hidden flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-red-500/10 text-red-500 font-medium'>
                                    <FaReceipt />
                                    <span className='absolute -top-2 -right-2 text-xs font-bold text-white bg-red-500 rounded-full px-[6px] py-[1px] '>  0</span>

                                </div>

                            </> :
                            (
                                <>
                                    <div className='relative cursor-pointer'>
                                        <FaShoppingCart size={25} className='text-red-800' />
                                        <span className='absolute right-[-9px] top-[-12px] font-bold text-red-600' >{cartItems.length}</span>

                                    </div>



                                    <button className='hidden md:block px-3 py-1 rounded-lg bg-red-500/30  backdrop-blur-2xl text-red-600  text-sm font-medium'> My Order</button>



                                </>
                            )

                    }

                    <div onClick={() => setShowInfo(prev => !prev)} className='w-[40px]  h-[40px] rounded-full flex items-center justify-center bg-red-500/70 text-white text-[18px] shadow-xl font-semibold cursor-pointer'>
                        {userData?.fullName.slice(0, 1)}
                    </div>


                    {showInfo &&

                        <div className=' fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] 2-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]'>

                            <div className='text-[17px] font-semibold'>
                                    {userData.fullName}
                            </div>

                            {userData.role=="user" &&
                                <div className='md:hidden text-red-400 font-semibold cursor-pointer'>My orders</div>

                            
                            
                            }

                            

                                    
                                <div className='md:hidden text-red-400 font-semibold cursor-pointer'>My orders</div>
                                <div onClick={handleLogOut} className='text-red-400 font-semibold cursor-pointer'>Log Out</div>

                        </div>
                    }
                </div>

            </div>

        </>
    )
}

export default Nav