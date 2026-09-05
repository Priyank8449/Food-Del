import React from 'react'

import Nav from './Nav'
import { useSelector } from 'react-redux'
const DeliverBoyDashboard = () => {


  const {userData} = useSelector(state=>state.user)
  return (
    <div className='w-full min-h-screen flex flex-col items-center overflow-x-hidden'>
      <Nav/>


      <div className='w-full max-w-[800px] flex flex-col gap-5 items-center '>


    <div className=' bg-white rounded-2xl shadow-xl p-5 flex flex-col gap-3 text-center justify-start items-center w-[90%] border border-orange-200 '> 

      <h1 className='text-xl font-bold text-red-500' >Welcome, {userData.fullName}</h1>
      <p className='text-red-400' > <span className='font-semibold'>Latitude</span>:{userData.location.coordinates[1]},<span  className='font-semibold'> Longitude</span>:{userData.location.coordinates[0]}</p>


    </div>

      </div>
    </div>
  )
}

export default DeliverBoyDashboard