import { updateCurrentUser } from 'firebase/auth';
import React from 'react'
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { removeCartItem, updateQuantity } from '../redux/userSlice';



function CartItemCard({ data }) {

    const  dispatch=useDispatch()


    const handleIncrease = (id,currentQty) => {

        

        dispatch(updateQuantity({id,quantity:currentQty+1}))




        
    }
    const handleDecrease = (id,currentQty) => {

        if(currentQty>1){
            dispatch(updateQuantity({id,quantity:currentQty-1}))

        }


        
    }
    return (
        <div className='flex items-center justify-between bg-white p-4 rounded-xl shadow border'>


            <div className='flex items-center gap-4 '>
                <img className='w-20 h-20 object-cover rounded-lg border' src={data.image} alt="" />
                <div className=''>
                    <h1 className='font-medium text-gray-800'>{data.name}</h1>
                    <p className='text-sm text-gray-500'>₹{data.price} x {data.quantity}</p>
                    <p className='text-gray-900 font-bold'>  ₹{data.price * data.quantity}</p>
                </div>

            </div>

            <div className=' flex items-center gap-3'>

                <button onClick={()=>handleDecrease(data.id,data.quantity)} className='p-2 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-300'><FaMinus size={12} /></button>

                <span className=''>{data.quantity}</span>

                <button onClick={()=>handleIncrease(data.id,data.quantity)} className='p-2 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-300'><FaPlus size={12} /></button>
                <button onClick={()=>dispatch(removeCartItem(data.id))}  className='p-2 cursor-pointe text-red-600 rounded-full hover:bg-red-200'><IoTrashOutline size={20}  /></button>


            </div>



        </div>
    )
}

export default CartItemCard