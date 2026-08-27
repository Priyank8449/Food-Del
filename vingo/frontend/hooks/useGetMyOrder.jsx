import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../src/App'
import { useDispatch, useSelector } from 'react-redux'
import { setMyOrder } from '../src/redux/userSlice.js'


const useGetMyOrder = () => {
    const  {userData}=useSelector(state=>state.user)
    const  dispatch=useDispatch()
    useEffect(() => {
        const fetchOrder = async () => {
        try {
                const result = await axios.get(`${serverUrl}/api/order/my-order`, { withCredentials: true })
                dispatch(setMyOrder(result.data))
                console.log(result.data)
            }
            catch (error) {
                console.log(error)
                
            } 
        }
        fetchOrder()
    }, [userData])
}

export default useGetMyOrder