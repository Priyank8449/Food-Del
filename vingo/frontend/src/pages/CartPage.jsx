import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItemCard from '../component/CartItemCard';


const CartPage = () => {
    const {cartItems,totalAmount}=useSelector(state=>state.user)

    const navigate=useNavigate()
    return (
        <div className='min-h-screen bg-white flex justify-center p-6'>

            <div className='w-full max-w-[800px] '>
               <div className='flex items-centergap-[20px] mb-6'>
                <div onClick={() => navigate("/")} className=' z-[10]  '>
                    <IoMdArrowBack size={35} className='text-orange-300' />


                </div>
                <h1 className='text-2xl font-bold text-start'>Your Cart </h1>
                </div> 
                {cartItems?.length==0? 
                
            <p className='text-center text-lg text-gray-600'>
                Yout Cart Is Empty
            </p>:(<>

            <div className='space-y-4'>
                    {cartItems?.map((item,index)=>(
                        <CartItemCard data={item} key={index}/>
                    ))}

                    <div className='mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center border'>
 
                        <h1 className=' text-lg font-semibold'>Total Amount</h1>
                        <span className='text-xl font-bold'>₹{totalAmount}</span>

                    </div>
                    <div className='mt-4 flex justify-end'>
                        <button onClick={()=>navigate("/checkout")} className='bg-red-800 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-red-400  cursor-pointer transition'>Proceed To CheckOut</button>
                    </div>

                </div>
            
            </>
                

                
            )}
            </div>

        </div>
    )
}

export default CartPage