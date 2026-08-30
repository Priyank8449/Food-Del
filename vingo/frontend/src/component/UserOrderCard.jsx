import React from 'react'

const UserOrderCard = ({ data }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString('en-GB',
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            })

    }
    return (


        <div className='bg-white rounded-lg shadow p-4 space-y-4'>

            <div className=' flex justify-between border-b pb-2'>

                <div className=''>
                    <p className='font-semibold'>
                        order #{data._id.slice(-6)}
                    </p>

                    <p className='text-sm text-gray-500'>
                        Date:{formatDate(data.createdAt)}
                    </p>
                </div>
                <div className='text-right'>

                    <p className='text-sm text-gray-500'>{data.paymentMethod?.toUpperCase()}</p>
                    <p className='font-medium text-blue-500'>{data.shopOrders?.[0].status}</p>


                </div>

            </div>

            {data.shopOrders.map((shoporder, index) => (
                <div className=' rounded-lg p-3 bg-amber-50 space-y-3' key={index}>
                    <p className='font-bold'>{shoporder.shop.name}</p>
                    <div className='flex space-x-4 overflow-x-auto pb-2'>
                        {shoporder.shopOrderItems?.map((item, index) => (

                            <div className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white' key={index}>
                                <img className='w-full h-24 object-cover rounded' src={item.item?.image} alt="" />
                                <p className='text-sm font-semibold mt-1'>{item.name}</p>
                                <p className='text-xs text-gray-700'>{item.quantity} X ₹{item.price}</p>


                            </div>




                        ))}

                    </div>

                    <div className='flex justify-between items-center border-t pt-2'>
                        <p className='font-semibold'>Subtotal:₹{shoporder.subtotal}</p>
                        <span className='text-blue-500'>Status:{shoporder.status}</span>

                    </div>
                </div>
            ))}

            <div className=' flex justify-between items-center border-t pt-2'>

                <p className='font-semibold'>Total:₹{data.totalAmount}</p>
                <button className='bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm
            '>Track Order</button>

            </div>

        </div>
    )
}

export default UserOrderCard