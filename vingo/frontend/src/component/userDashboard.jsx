
import { useEffect, useRef, useState } from 'react';
import { categories } from '../category';
import CategoryCard from './CategoryCard';
import Nav from './Nav';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard';





const UserDashboard = () => {

    const { currentCity, shopInMyCity , itemsInMyCity} = useSelector(state => state.user)


    const cateScrollRef = useRef()
    const ShopScrollRef = useRef()

    const [showRightCateButton, setShowRightCateButton] = useState(false)
    const [showLeftCateButton, setShowLeftCateButton] = useState(false)
    const [showLeftShopButton, setShowLeftShopButton] = useState(false)
    const [showRightShopButton, setShowRightShopButton] = useState(false)

    const updateButton = (ref, setLeftButton, setRightButton) => {

        const element = ref.current;
        if (element) {
            setLeftButton(element.scrollLeft > 0)
            setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth)

        }

    }


    useEffect(() => {
        if (cateScrollRef.current) {
            updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
            updateButton(ShopScrollRef, setShowLeftShopButton, setShowRightShopButton)
            cateScrollRef.current.addEventListener('scroll', () => {
                updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
            })
            ShopScrollRef.current.addEventListener('scroll', () => {
                updateButton(ShopScrollRef, setShowLeftShopButton, setShowRightShopButton)
            })
        }

    }, [])
    const scrollHandler = (ref, direction) => {
        if (ref.current) {
            ref.current.scrollBy({
                left: direction == "left" ? -200 : 200,
                behavior: "smooth"
            })
        }
    }



    return (
        <>
            <Nav />

            <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>

                <h1 className='text-gray-800 text-2xl sm:text-3xl'>Inspiration for your first  order</h1>

                <div className='w-full relative '>


                    {showLeftCateButton &&

                        <button onClick={() => scrollHandler(cateScrollRef, "left")} className=' absolute p-2 rounded-full  bg-white/10  z-99 top-1/2 backdrop-blur-xl text-white shadow-lg hover:bg-red-200 '>
                            <FaArrowLeft size={25} />
                        </button>
                    }



                    <div className='w-full flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent scroll-smooth ' ref={cateScrollRef}>
                        {categories.map((cate, index) => (
                            <CategoryCard name={cate.category} image={cate.image} key={index} />
                        ))}
                    </div>


                    {showRightCateButton &&
                        <button onClick={() => scrollHandler(cateScrollRef, "right")} className='  absolute p-2 rounded-full  bg-white/10  z-99 top-1/2 right-0  backdrop-blur-xl text-white shadow-lg hover:bg-red-200  '>
                            <FaArrowRight size={25} />

                        </button>}



                </div>
            </div>

            <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>

                <h1 className='text-gray-800 text-2xl sm:text-3xl'>Best Shop {currentCity}</h1>

                <div className='w-full relative '>


                    {showLeftShopButton &&

                        <button onClick={() => scrollHandler(ShopScrollRef, "left")} className=' absolute p-2 rounded-full  bg-white/10  z-99 top-1/2 backdrop-blur-xl text-white shadow-lg hover:bg-red-200 '>
                            <FaArrowLeft size={25} />
                        </button>
                    }



                    <div className='w-full flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-[#ff4d2d] scrollbar-track-transparent scroll-smooth ' ref={ShopScrollRef}>
                        {shopInMyCity?.map((shop, index) => (
                            <CategoryCard name={shop.name} image={shop.image} key={index} />
                        ))}
                    </div>


                    {showRightShopButton &&
                        <button onClick={() => scrollHandler(ShopScrollRef, "right")} className='  absolute p-2 rounded-full  bg-white/10  z-99 top-1/2 right-0  backdrop-blur-xl text-white shadow-lg hover:bg-red-200  '>
                            <FaArrowRight size={25} />

                        </button>}



                </div>





            </div>


            <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>

                <h1 className='text-gray-800 text-2xl sm:text-3xl'>
                    Suggested Food Item
                </h1>


                <div className='w-full h-auto flex flex-wrap gap-[20px] justify-center'>

                    {
                        itemsInMyCity?.map((item,index)=>(
                            <FoodCard key={index} data={item} />
                        ))
                    }

                </div>


            </div>



        </>
    )
}

export default UserDashboard