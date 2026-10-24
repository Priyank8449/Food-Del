import React from 'react'
import { IoMdArrowBack } from "react-icons/io";

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import UserOrderCard from '../component/UserOrderCard';
import OwnerOrderCard from '../component/OwnerOrderCard';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { setMyOrder, updateRealTimeOrderStatus } from '../redux/userSlice';

const MyOrder = () => {
  const { userData, myOrders,socket } = useSelector(state => state.user)

  const navigate = useNavigate()
  const dispatch= useDispatch()

  useEffect(()=>{
    socket?.on("newOrder",(data)=>{
       if(data.shopOrders?.owner._id==userData._id){
        dispatch(setMyOrder([data,...myOrders]))
       }
    })

    socket?.on('updateStatus',({orderId,shopId,status,userId})=>{

      if(userId==userData._id){
        dispatch(updateRealTimeOrderStatus({orderId,shopId,status}))
      }

      

    })
    return()=>{
      socket?.off("newOrder")
      socket?.off("updateStatus")
    }

  },[socket])





  return (

    <div className='bg-amber-100  w-full min-h-screen flex justify-center px-4'>

      <div className='w-full max-w-[800px] p-4'>
        <div className='flex items-center gap-[20px] mb-6'>

          <div onClick={() => navigate("/")} className=' z-[10]  '>
            <IoMdArrowBack size={35} className='text-orange-300' />
          </div>
          <h1 className='text-2xl font-bold text-start'>My Orders</h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.1
          }}




          className='space-y-6'>
          {
            myOrders.map((order, index) => (

              userData.role == "user" ? (
                <UserOrderCard data={order} key={index} />
              ) :
                userData.role == "owner" ? (
                  <OwnerOrderCard data={order} key={index} />
                )
                  : null

            ))
          }

        </motion.div>
      </div>

    </div>
  )
}

export default MyOrder