import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import axios from 'axios'
import { IoMdArrowBack } from "react-icons/io";
import { current } from '@reduxjs/toolkit';

const TrackOrderPage = () => {

    const { orderId } = useParams()
    const navigate = useNavigate()


    const [currentOrder, setCurrentOrder] = useState()


    const handleGetOrder = async () => {

        try {

            const result = await axios.get(`${serverUrl}/api/order/get-order-by-id/${orderId}`, { withCredentials: true })

            console.log(result.data)
            setCurrentOrder(result.data)

        }
        catch (error) {
            {
                console.log(error)
            }

        }

    }

    useEffect(() => {

        handleGetOrder()

    }, [orderId])
    return (
        <div className='max-w-4xl mx-auto p-4 flex flex-col gap-6'>

            <div onClick={() => navigate("/my-order")} className='relative flex items-center gap-4 top-[20px] left-[20px] z-[10] mb-[10px] '>
                <IoMdArrowBack size={35} className='text-orange-300' />

                <h1 className='text-2xl font-bold md:text-center'>Track Order</h1>


            </div>

            {currentOrder?.shopOrders?.map((shopOrder,index)=>(
                <div className='bg-white p-4 rounded-2xl shadow-md border border-orange-300 space-y-4' key={index}>

                    <div>
                        <p className='text-lg font-bold mb-2 text-red-500'>{shopOrder.shop.name}</p>
                        <p className=''><span className='font-semibold'>Items:</span>{shopOrder.shopOrderItems?.map(i=>i.name).join(",")}</p>
                    </div>
                    
                    <p><span className='font-semibold'>Subtotal:</span>{shopOrder.subtotal}</p>

                    <p><span className='font-semibold'>Delivery Address:</span>{currentOrder.deliveryAddress.text}</p>


                </div>
            ))}







        </div>
    )
}

export default TrackOrderPage