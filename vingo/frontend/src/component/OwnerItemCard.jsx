import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";



const OwnerItemCard = ({data}) => {
  return (
    <div className='flex bg-white rounded-lg shadow-md overflow-hidden border border-red-500 w-full max-w-2xl'>

        <div className='w-36 h-full flex-shrink-0 bg-gray-50'>
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
                <div className='flex p2 rounded-full hover:bg-red-500/10 text-red-500 items-center gap-2~'>
                <FaPencilAlt />
                    <FaTrashAlt />
                </div>


            </div>
            
        </div>


    </div>
  )
}

export default OwnerItemCard