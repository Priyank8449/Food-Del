import React, { useEffect } from 'react'

import Nav from './Nav'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { useState } from 'react'
import { current } from '@reduxjs/toolkit'
import DeliveryBoyTracking from './deliveryBoyTracking'
const DeliverBoyDashboard = () => {


  const { userData } = useSelector(state => state.user)
  const [currentOrder, setCurrentOrder] = useState()
  const [availabeAssignment, setAvailableAssignment] = useState([])

  const [showOtpBox, setShowOtpBox] = useState(false)


  const getAssignment = async () => {
    try {

      const result = await axios.get(`${serverUrl}/api/order/get-assignments`, { withCredentials: true })
      setAvailableAssignment(result.data)
      console.log(result.data)

    }
    catch (error) {

      console.log(error)

    }
  }

  const acceptOrder = async (assignmentId) => {

    try {
      const result = await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`, { withCredentials: true })

      console.log(result.data)
      await getCurrentOrder()




    } catch (error) {
      console.log(error)

    }

  }

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-current-order`, { withCredentials: true })
      console.log(result.data)
      setCurrentOrder(result.data)

    } catch (error) {

    }
  }


  const  handleSendOtp=()=>{
    setShowOtpBox(true);

  }




  useEffect(() => {
    getAssignment()
    getCurrentOrder()
  }, [userData])
  return (
    <div className='w-full min-h-screen flex flex-col items-center overflow-x-hidden'>
      <Nav />


      <div className='w-full max-w-[800px] flex flex-col gap-5 items-center '>


        <div className=' bg-white rounded-2xl shadow-xl p-5 flex flex-col gap-3 text-center justify-start items-center w-[90%] border border-orange-200 '>

          <h1 className='text-xl font-bold text-red-500' >Welcome, {userData.fullName}</h1>
          <p className='text-red-400' > <span className='font-semibold'>Latitude</span>:{userData.location.coordinates[1]},<span className='font-semibold'> Longitude</span>:{userData.location.coordinates[0]}</p>


        </div>


        {!currentOrder &&
          <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] borde border-orange-300' >

            <h2 className='text-lg font-bold mb-4 flex items-center gap-2'>Available Orders</h2>

            <div className='space-y-4'>

              {availabeAssignment.length > 0 ?
                (
                  availabeAssignment.map((a, index) => (

                    <div className='border rounded-lg p-4 flex justify-between items-center ' key={index}>

                      <div>
                        <p className=' text-sm font-semibold'>{a.shopName}</p>
                        <p className='text-gray-500 text-sm'><span className='font-semibold'>Delivery Address:</span>{a.deliveryAddress.text}</p>
                        <p className=' text-xs text-gray-400'>{a.items.length} items | ₹{a.subtotal}</p>
                      </div>
                      <button onClick={() => acceptOrder(a.assignmentId)} className=' text-white bg-red-400 px-4 py-1 rounded-lg text-sm hover:bg-red-500'>Accept</button>



                    </div>

                  ))
                ) :
                <p className='text-gray-600 text-sm'> No Available Orders</p>

              }

            </div>



          </div>

        }

        {currentOrder &&
          <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-200'>

            <h2 className='text-lg font-bold mb-3'>📦Current Order</h2>
            <div className='border rounded-lg p-4 mb-3'>
              <p className='font-semibold text-sm'>{currentOrder?.shopOrder.shop.name}</p>
              <p className='text-sm text-gray-800'>{currentOrder?.deliveryAddress.text}</p>
              <p className='text-xs text-gray-400'>{currentOrder.shopOrder.shopOrderItems.length}items | {currentOrder.shopOrder.subtotal}</p>
            </div>

            <DeliveryBoyTracking data={currentOrder} />

            {!showOtpBox ?

              <button onClick={handleSendOtp} className='mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-green-600 active:scale-95 transition-all duration-200'>Mark as Delivered</button>
              :
              <div className='mt-4 p-4 border rounded-xl bg-gray-100'>

                <p className='text-sm font-semibold mb-2'>Enter Otp sent to <span className='text-blue-600 font-bold'>{currentOrder.user.fullName}</span></p>
                <input type="text"  className='w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400' placeholder='Enter Otp-XXXX' />
                <button className=' w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-red-400 transition-all'>Submit Otp</button>


              </div>
          
        
        }



              </div>
        }



              </div>
    </div>
  )
}

        export default DeliverBoyDashboard