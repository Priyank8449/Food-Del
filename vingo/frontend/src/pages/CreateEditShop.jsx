import React, { useRef, useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUtensils } from "react-icons/fa";


const CreateEditShop = () => {
  const { myShopData } = useSelector(state => state.owner)
  const { currentCity , currentState ,currentAddress } = useSelector(state => state.user)


  const [name,setName]=useState(myShopData?.name ||"")
  const [city,setCity]=useState(myShopData?.city || currentCity ||"")
  const [state,setState]=useState(myShopData?.state || currentState ||"")
  const [address,setAddress]=useState(myShopData?.adress || currentAddress ||"")
  const[frontendImage,setFrontendImage]=useState(myShopData?.image ||null)
  const[backendImage,setBackendImage]=useState(null)

const handleImage=(e)=>{
  const file=e.target.files[0]
  setBackendImage(file)
  setFrontendImage(URL.createObjectURL(file))

}

  const navigate = useNavigate()
  return (
    <div className='flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-200 relative to-white min-h-screen'>

      <div onClick={() => navigate("/")} className='absolute top-[20px] left-[20px] z-[10] mb-[10px] '>
        <IoMdArrowBack size={35} className='text-orange-300' />


      </div>

      <div className='max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100'>

        <div className=' flex flex-col items-center mb-6'>
          <div className='bg-orange-100 p-4 rounded-full mb-4'>
            <FaUtensils className='text-[#ff4d2d] w-16 h-16 ' />

          </div >
          <div className='text-3xl font-extrabold text-gray-900
          '>
            {
              myShopData? "Edit Shop" : "Add Shop"
            }
          </div>

        </div>

        <form className='space-y-5'>
          
          <div>
            <label className=" block text-sm font-medium text-gray-700 mb-1">
              Shop Name
            </label>

            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Enter Shop Name ' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
          </div>
          <div>
            <label className=" block text-sm font-medium text-gray-700 mb-1">
              Shop Address
            </label>

            <input onChange={(e)=>setAddress(e.target.value)} value={address} type="text" placeholder='Enter Shop Address ' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4' >
            <div>
              <label className=" block text-sm font-medium text-gray-700 mb-1">
                City
              </label>

              <input onChange={(e)=>setCity(e.target.value)} value={city} type="text"  placeholder='Enter City ' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
            </div>
            <div>
              <label className=" block text-sm font-medium text-gray-700 mb-1">
                State
              </label>

              <input onChange={(e)=>setState(e.target.value)} value={state} type="text" placeholder='Enter State ' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
            </div>
          </div>

          <div>
            <label className=" block text-sm font-medium text-gray-700 mb-1">
              Shop Image
            </label>

            <input onChange={handleImage} type="file" accept='image/*' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
          </div >

          {
            frontendImage?
            <div className='mt-4  '>
            <img src={frontendImage} className='w-full h-48 object-cover rounded-lg border' alt="" />
          </div>:
          null
          }
          

          <button className='w-full cursor-pointer bg-red-900 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-red-400 hover:shadow-lg transition-all duration-200'>Save</button>
        </form>

      </div>

    </div>
  )
}

export default CreateEditShop