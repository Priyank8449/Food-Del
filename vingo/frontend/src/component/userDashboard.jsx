
import { categories } from '../category';
import CategoryCard from './CategoryCard';
import Nav from './Nav';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";





const UserDashboard = () => {

    return (
        <>
            <Nav />

            <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>

                <h1 className='text-gray-800 text-2xl sm:text-3xl'>Inspiration for your first  order</h1>

                <div className='w-full relative '>

                    <button className=' absolute p-2 rounded-full  bg-white/10  z-99 top-1/2 backdrop-blur-xl text-white shadow-lg hover:bg-red-200 '>
                        <FaArrowLeft size={25} />
                    </button>

                    <div className='w-full flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-[#ff4d2d] scrollbar-track-transparent scroll-smooth'>
                        {categories.map((cate, index) => (
                            <CategoryCard data={cate} key={index} />
                        ))}
                    </div>

                    <button className='  absolute p-2 rounded-full  bg-white/10  z-99 top-1/2 right-0  backdrop-blur-xl text-white shadow-lg hover:bg-red-200  '>
                        <FaArrowRight  size={25}/>

                    </button>

                </div>

            </div>
        </>
    )
}

export default UserDashboard