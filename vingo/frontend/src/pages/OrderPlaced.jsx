import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { Navigate, useNavigate } from 'react-router-dom';


const OrderPlaced = () => {
    const  navigate=useNavigate()
  return (
    <div className='min-h-screen bg-w\ flex flex-col justify-center items-center
     px-4 text-center relative overflow-hidden'>

        <div className=' p-10 bg-gray-200 flex flex-col justify-center items-center rounded-2xl shadow-2xl'>


        <FaCircleCheck className='text-green-500 text-6xl mb-4' />

        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Order Placed !! </h1>

        <p className='text-gray-600 max-w-md mb-6'>Thank you for your purchase. Your order is being prepared.You  can track  your order status in the 'My Orders' section</p>

        <button onClick={()=>navigate("/my-order")} className='bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition'>Back to My Orders</button>

        </div>



     </div>
  )
}

export default OrderPlaced