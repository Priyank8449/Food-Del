import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../src/App'
import { useDispatch, useSelector } from 'react-redux'
import { setMyShopData } from '../src/redux/ownerSlice'
import { setShopInMyCity } from '../src/redux/userSlice'


const useGetShopByCity = () => {
    const  dispatch=useDispatch()
    const {currentCity}=useSelector(state=>state.user)
    useEffect(() => {
        if (!currentCity) return
        const fetchShop = async () => {
        try {
                const result = await axios.get(`${serverUrl}/api/shop/get-by-city/${currentCity}`, { withCredentials: true })
                dispatch(setShopInMyCity(result.data))
                console.log(result)
            }
            catch (error) {
                console.log(error)
                
            } 
        }
        fetchShop()
    }, [currentCity])
}

export default useGetShopByCity