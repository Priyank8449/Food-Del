import React, { useRef, useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUtensils } from "react-icons/fa";
import { serverUrl } from '../App';
import { linkWithCredential } from 'firebase/auth';
import { setMyShopData } from '../redux/ownerSlice';
import axios from "axios";
import { ClipLoader } from 'react-spinners';

const AddItem = () => {
  const { myShopData } = useSelector(state => state.owner)
  const navigate = useNavigate()
const dispatch=useDispatch()

  const [name,setName]=useState(null)
  const [price,setPrice]=useState(0)

  const[frontendImage,setFrontendImage]=useState(null)
  const[backendImage,setBackendImage]=useState(null)
  const[category,setCategory]=useState()
  const[foodType,setFoodType]=useState("veg")
  const[loading,setLoading]=useState(false)

  const  categories=[ 
            "Snacks",
            "Main Course",
            "Desserts",
            "Pizza",
            "Burger",
            "Sandwiches",
            "South Indian",
            "North Indian",
            "Chinese",
            "Fast Food",
            "Others"]

const handleImage=(e)=>{
  const file=e.target.files[0]
  setBackendImage(file)
  setFrontendImage(URL.createObjectURL(file))

}

const  handleSubmit= async(e)=>{
  e.preventDefault();
  setLoading(true)
  
  try{

    const formData=new FormData()

     formData.append("name",name)
     formData.append("category",category)
     formData.append("foodType",foodType)
     formData.append("price",price)



     if(backendImage){
      formData.append("image",backendImage)

     }

     const  result=await axios.post(`${serverUrl}/api/item/add-item`,formData,
      {withCredentials:true}
     )

     dispatch(setMyShopData(result.data))
console.log(result.data)
setLoading(false)
navigate("/")


}catch (error) {
  console.log("STATUS:", error.response?.status);
  console.log("SERVER RESPONSE:", error.response?.data);
  console.log("MESSAGE:", error.message);
  setLoading(false)


  }


}
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
            Add Food
          </div>

        </div>

        <form className='space-y-5'>
          
          <div>
            <label className=" block text-sm font-medium text-gray-700 mb-1">
               Name
            </label>

            <input onChange={(e)=>setName(e.target.value)}  type="text" placeholder='Enter Shop Name ' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
          </div>
          <div>
            <label className=" block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>

            <input onChange={(e)=>setPrice(e.target.value)} value={price} type="number" placeholder='Enter  Price ' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
          </div>
          <div>
            <label className=" block text-sm font-medium text-gray-700 mb-1">
              Select Category
            </label>

            <select onChange={(e)=>setCategory(e.target.value)} value={category} type="number" placeholder='Enter  Price ' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' 
                >

                    <option value="">Select Category </option>
                    {categories.map((cate,index)=>(
                        <option value={cate} key="index"> {cate}</option>
                    ))}

             </select>
          </div>
          <div>
            <label className=" block text-sm font-medium text-gray-700 mb-1">
              Select Food Type
            </label>

            <select onChange={(e)=>setCategory(e.target.value)} value={foodType} type="number" placeholder='Enter  Price ' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' 
                >

                    <option value ="veg">Veg </option>
                    <option value ="non veg">Non veg </option>
                    
                    

             </select>
          </div>
          

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4' >
            
           
          </div>

          <div>
            <label className=" block text-sm font-medium text-gray-700 mb-1">
            Food Image
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
          

          <button onClick={handleSubmit} className='w-full cursor-pointer bg-red-900 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-red-400 hover:shadow-lg transition-all duration-200'>
            
            {
              loading? <ClipLoader size={20} color='white'/>
              :"save"
            }
          </button>
        </form>

      </div>

    </div>
  )
}

export default AddItem