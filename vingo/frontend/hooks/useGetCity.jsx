import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../src/App'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAddress, setCurrentCity, setCurrentState, setUserData } from '../src/redux/userSlice'
import { setAddress, setLocation } from '../src/redux/mapSlice'


const useGetCity = () => {
    const  dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
    const apiKey=import.meta.env.VITE_GEOAPIKEY
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(async(position)=>{
            const latitude=position.coords.latitude
            const longitude=position.coords.longitude
            dispatch(setLocation({latitude:latitude,longitude:longitude}))

            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`) 

            dispatch(setCurrentCity(result?.data?.results[0].city||result?.data?.results[0].county))
            dispatch(setCurrentState(result?.data?.results[0].state))
            dispatch(setCurrentAddress(result?.data?.results[0].address_line2 || result?.data?.results[0].address_line1 ))

            dispatch(setAddress(result.data.results[0].address_line1))
            
        })
    },[userData])

}

export default useGetCity