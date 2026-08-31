import React from 'react'
import { IoMdArrowBack } from "react-icons/io";

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import UserOrderCard from '../component/UserOrderCard';
import OwnerOrderCard from '../component/OwnerOrderCard';

const MyOrder = () => {
  const { userData,myOrders } = useSelector(state => state.user)

  const navigate = useNavigate()



  return (

    <div className='bg-amber-100  w-full min-h-screen flex justify-center px-4'>

      <div className='w-full max-w-[800px] p-4'>
        <div className='flex items-center gap-[20px] mb-6'>

          <div onClick={() => navigate("/")} className=' z-[10]  '>
            <IoMdArrowBack size={35} className='text-orange-300' />
          </div>
          <h1 className='text-2xl font-bold text-start'>My Orders</h1>
        </div>

        <div className='space-y-6'>
          {
            myOrders.map((order, index) => (

              userData.role == "user" ? (
                <UserOrderCard data={order} key={index}/>
              ) :
                userData.role == "owner"?(
                  <OwnerOrderCard data={order} key={index}/>
                )
                :null

            ))
          }

        </div>
      </div>

    </div>
  )
}

export default MyOrder