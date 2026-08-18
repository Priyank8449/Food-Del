import React from 'react'
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaMinus } from "react-icons/fa6";
import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';







const FoodCard = ({ data }) => {
    const dispatch = useDispatch()
    const {cartItems}=useSelector(state=>state.user)

    const [quantity, setQuantity] = useState(0)

    const renderStar = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                (i <= rating) ? (<FaStar className='text-yellow-500 text-lg' />) : (<CiStar className='text-lg' />)


            )
        }
        return stars
    }

    const handleIncrease = () => {
        const newQty = quantity + 1;

        setQuantity(newQty)
    }
    const handleDecrease = () => {

        if (quantity > 0) {
            const newQty = quantity - 1;

            setQuantity(newQty)

        }
    }

    return (
        <div className='w-[250px] rounded-2xl border-2 border-red-400 bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col '>




            <div className='relative w-full h-[170px] flex justify-center items-center bg-gray-200'>


                <div className='absolute top-3 right-3 bg-white rounded-full p-1 shadow'>
                    {data.foodType == "veg" ?
                        <FaLeaf size={25} color='green' /> : <FaDrumstickBite size={25} color='red' />


                    }

                </div>
                <img src={data.image} alt="" className='w-full h-full object-cover transition-transform duration-300 hover:scale-105' />

            </div>
            <div className=' flex flex-1 flex-col p-4'>

                <h2 className='font-semibold text-gray-900 text-base truncate'>{data.name}</h2>

                <div className='flex items-center gap-1 mt-1'>
                    {renderStar(data.rating?.average || 0)}
                    <span className='text-xs text-gray-500'>{data.rating?.count || 0}</span>
                </div>

                <div className=' flex items-center justify-between mt-auto pt-4'>

                    <span className='font-bold text-gray-900 text-lg'>{data.price}</span>

                    <div className='flex items-center border rounded-full overflow-hidden shadow-sm'>

                        <button onClick={handleDecrease} className='px-2 py-1 hover:bg-gray-100 transition'><FaMinus size={12} /></button>

                        <span>{quantity}</span>

                        <button onClick={handleIncrease} className='px-2 py-1 hover:bg-gray-100 transition'><FaPlus size={12} /></button>

                        <button onClick={() => {

                            quantity>0?
                            dispatch(addToCart({
                            id: data._id,
                            name: data.name,
                            price: data.price,
                            image: data.image,
                            shop: data.shop,
                            quantity,
                            foodType: data.foodType,
                        }
                        
                        )):null
                        }} className={`${cartItems.some(i=>i.id==data._id)?"bg-gray-800":"bg-orange-700"} text-white px-3 py-2 transition-colors`}><FaShoppingCart size={16} />
                        </button>
                    </div>
                </div>



            </div>



        </div>
    )
}

export default FoodCard