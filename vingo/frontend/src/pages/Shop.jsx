import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { motion } from "framer-motion"

const Shop = () => {

    const { shopId } = useParams()
    const [items, setItems] = useState([])
    const [shop, setShop] = useState([])

    const handleShop = async () => {
        try {

            const result = await axios.get(`${serverUrl}/api/item/get-item-by-shop/${shopId}`, { withCredentials: true })

            setShop(result.data.shop)
            setItems(result.data.items)

            console.log(result.data)

        }
        catch {

        }
    }


    useEffect(() => {
        handleShop()

    }, [shopId])
    return (
        <div className=' pt-4 min-h-screen bg-sky-100 '>

            {shop &&

                <motion.div
                    initial={{ opacity: 0, scale:0, }}
                    whileInView={{ opacity: 1, scale:1}}
                    transition={{ duration: 0.6 ,
                        delay:0.1
                    }}
                    

                    className=' mx-4  rounded-2xl shadow-2xl relative  h-64 md:h-80 lg:h-96 overflow-hidden '>

                    <img src={shop.image} alt="" className='rounded-2xl w-full h-full object-cover' />
                    <div className='absolute rounded-2xl inset-0 bg-gradient-to-b from-black/70 to-black/30 
            
            flex flex-col justify-center items-center text-center px-4'>
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 ,
                                delay:0.2
                            }}

                            className='text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg'>{shop.name}</motion.h2>
                        <p className='text-lg font-medium text-gray-300'>{shop.address}</p>

                    </div>

                </motion.div>
            }


            <div className='max-w-7xl mx-auto px-6 py-10'>

                <h2 className=' flex items-center justify-center gap-3 text-3xl font-bold mb-10 text-gray-800 '  > Our Menu</h2>


            </div>

        </div>
    )
}

export default Shop