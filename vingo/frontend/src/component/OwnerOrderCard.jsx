import React, { useState } from 'react'
import { MdCall } from "react-icons/md";
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../redux/userSlice';
import axios from 'axios';


const OwnerOrderCard = ({ data }) => {


  const [availableBoys,setAvailableBoys]=useState([])
  const  dispatch=useDispatch()

  


  const  handleUpdateStatus=async(orderId,shopId,status)=>{
    try{
      const  result =await axios.post(`${serverUrl}/api/order/update-status/${orderId}/${shopId}`,{status},{withCredentials:true})

      console.log(result)
      dispatch(updateOrderStatus({orderId,shopId,status}))
      setAvailableBoys(result.data.availableBoys)
      console.log(result.data)

    }
    catch(error){
    console.log("UPDATE STATUS ERROR:", error);
    console.log("SERVER RESPONSE:", error.response?.data);
}
    
  }
  return (
    <div className='bg-white rounded-2xl shadow-2xl  p-4 space-y-4'>

      <div>

        <h2 className='text-lg font-semibold text-gray-800'>{data.user.fullName}</h2>
        <p className=' text-sm text-gray-600'>{data.user.email}</p>
        <p className='flex items-center gap-2 text-sm text-gray-600'><MdCall /><span>{data.user.mobile}</span></p>

      </div>

      <div className='flex items-start gap-2 flex-col text-gray-600 text-sm'>
        <p>{data?.deliveryAddress.text}</p>
        <p className='text-xs text-gray-500'>lat:{data.deliveryAddress.latitude},lon:{data.deliveryAddress.longitude}</p>
      </div>


      <div className='flex space-x-4 overflow-x-auto pb-2'>
        {data.shopOrders.shopOrderItems?.map((item, index) => (

          <div className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white' key={index}>
            <img className='w-full h-24 object-cover rounded' src={item.item?.image} alt="" />
            <p className='text-sm font-semibold mt-1'>{item.name}</p>
            <p className='text-xs text-gray-700'>{item.quantity} X ₹{item.price}</p>


          </div>
        ))}

      </div>

      <div className='flex justify-between items-center mt-auto pt-3 border-t border-gray-100'>
        <span className='text-sm'>Status: <span className='font-semibold capitalize text-red-500'>{data.shopOrders.status}</span></span>

        <select onChange={(e)=>handleUpdateStatus(data._id,data.shopOrders.shop._id,e.target.value)}
        className='rounded-md border text-red-400 border-red-400 px-3 py-1 text-sm focus:outline-none focus:ring-2' >
          <option value="">change</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out for delivery">Out for delivery</option>
        </select>
      </div>

      <div className='text-right font-bold text-gray-800 text-sm'>
        Total:₹{data.shopOrders.subtotal}
      </div>


    </div>

  )
}

export default OwnerOrderCard