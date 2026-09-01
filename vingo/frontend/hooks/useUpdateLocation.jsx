import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../src/App'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAddress, setCurrentCity, setCurrentState, setUserData } from '../src/redux/userSlice'
import { setAddress, setLocation } from '../src/redux/mapSlice'


const useUpdateLocation = () => {
    const  dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
    useEffect(()=>{

        const updateLocation=async (lat,lon)=>{
            const  result = await  axios.post(`${serverUrl}/api/user/update-location`,
                {lat,lon},{withCredentials:true})
        }


        navigator.geolocation.watchPosition((pos)=>{
            updateLocation(pos.coords.latitude,pos.coords.longitude)
        })
       
    },[userData])

}

export default useUpdateLocation