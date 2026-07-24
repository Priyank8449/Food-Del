import React from 'react'
import UserDashboard from '../component/userDashboard'
import OwnerDashboard from '../component/ownerDashboard'
import DeliverBoyDashboard from '../component/deliverBoyDashboard'
import { useSelector } from 'react-redux'

const Home = () => {

    const {userData}=useSelector(state=>state.user)
  return (
    <div className='w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center '>

        {userData.role=="user" && <UserDashboard/>}
        {userData.role=="owner" && <OwnerDashboard/>}
        {userData.role=="deliveryBoy" && <DeliverBoyDashboard/>}
        </div>
  )
}

export default Home