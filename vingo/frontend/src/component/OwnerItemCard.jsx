import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';



const OwnerItemCard = ({data}) => {
    const navigate= useNavigate()
  return (
    <div className='flex bg-white rounded-lg shadow-md overflow-hidden border border-red-500 w-full max-w-2xl'>

        <div className='w-36  flex-shrink-0 bg-gray-50'>
            <img src={data.image} alt="" className='w-full h-full object-cover' />
        </div>

        <div className='flex flex-col justify-between p-3 flex-1'>

            <div className=''>
                <h2 className='text-base font-semibold text-red-500 '>{data.name}</h2>
                <p ><span className='font-medium text-gray-70 '>Category</span> : {data.category}</p>
                <p><span className='font-medium text-gray-70 '>Food Type:</span>{data.foodType}</p>

            </div>
            <div className='flex items-center justify-between'>
                <div className='text-red-500 font-bold'>{data.price}</div>


                <div  className='flex items-center gap-2'>

                <div onClick={()=>navigate(`/edit-item/${data._id}`)} className='p-2 cursor-pointer rounded-full hover:bg-red-900/30 text-red-500 '>
                <FaPencilAlt size={16} />

                </div>

                <div className='p-2 cursor-pointer rounded-full hover:bg-red-900/30 text-red-500 '>
                    <FaTrashAlt size={16} />
                    
                </div>
                </div>


            </div>
            
        </div>


    </div>
  )
}

export default OwnerItemCard