import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../src/App'
import { useDispatch, useSelector } from 'react-redux'
import { setMyShopData } from '../src/redux/ownerSlice'
import { setItemsInMyCity } from '../src/redux/userSlice'


const useGetItemByCity = () => {
    const  dispatch=useDispatch()
    const {currentCity}=useSelector(state=>state.user)
    useEffect(() => {
        if (!currentCity) return
        const fetchItems = async () => {
        try {
                const result = await axios.get(`${serverUrl}/api/item/get-by-city/${currentCity}`, { withCredentials: true })
                dispatch(setItemsInMyCity(result.data))
                console.log(result)
            }
            catch (error) {
                console.log(error)
                
            } 
        }
        fetchItems()
    }, [currentCity])
}

export default useGetItemByCity