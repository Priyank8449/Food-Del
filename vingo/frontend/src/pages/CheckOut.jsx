import React, { useEffect, useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from 'react-redux';
import { setAddress, setLocation } from '../redux/mapSlice';
import axios from 'axios';
import { MdMobileFriendly } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import { MdDeliveryDining } from "react-icons/md";
import { serverUrl } from '../App';


function ReCenterMap({ location }) {

    if (location.latitude && location.longitude) {

        const map = useMap();
        map.setView([location.latitude, location.longitude], 16, { animate: true })
    }
    return null;
}

const CheckOut = () => {

    const  navigate=useNavigate()

    const dispatch = useDispatch()
    const apiKey = import.meta.env.VITE_GEOAPIKEY

    const { location, address} = useSelector(state => state.map)
    const { cartItems ,totalAmount} = useSelector(state => state.user)

    const [addressInput, setAddressInput] = useState()
    const [paymentMethod, setPaymentMethod] = useState("cod")


    const deliveryFee=totalAmount>500?0:40
    const amountWithDeliveryFee=totalAmount+deliveryFee


    const onDragEnd = (e) => {
        const { lat, lng } = e.target._latlng
        dispatch(setLocation({ latitude: lat, longitude: lng }))
        getAddressByLatLng(lat, lng)
    }

    const getAddressByLatLng = async (lat, lng) => {

        try {

            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`)

            dispatch(setAddress(result?.data?.results[0].address_line2))

        } catch {

        }

    }


    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            dispatch(setLocation({ latitude: latitude, longitude: longitude }))
            getAddressByLatLng(latitude, longitude)

        })

    }


    const getLatLngByAddress = async () => {

        try {
            const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`)

            const { lat, lon } = result.data.features[0].properties
            dispatch(setLocation({ latitude: lat, longitude: lon }))

        } catch {

        }

    }

    const handlePlaceOrder=async()=>{
        try{
            const  result= await axios.post(`${serverUrl}/api/order/place-order`,{
                paymentMethod,
                deliveryAddress:{
                    text:addressInput,
                    latitude:location.latitude,
                    longitude:location.longitude
                },
                totalAmount,
                cartItems
            },{withCredentials:true})

            console.log(result.data)

        }catch(error){
            console.log(error)

        }
    }

    useEffect(() => {
        setAddressInput(address)

    }, [address])


    const [searchLocation, setSearchLocation] = useState("")

    useEffect(() => {
        setSearchLocation(address)

    }, [address])


    return (
        <div className=' min-h-screen bg-amber-50 flex items-center justify-center p-6'>

            <div onClick={() => navigate("/cart")} className=' absolute top-[20px] left-[20px] z-[10] '>
                <IoMdArrowBack size={35} className='text-orange-300' />
            </div>

            <div className=' w-full max-w-[900px] bg-pink-100/50  backdrop-blur-3xl rounded-2xl shadow-pink-300 shadow-2xl p-6 space-y-6 '>

                <h1 className='text-2xl font-bold text-gray-800'>Check-Out</h1>

                <section>
                    <h2 className='text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800'>
                        <IoLocationSharp className='text-red-500' />  Delivery Location

                    </h2>


                    < div className=' flex  gap-2 mb-3'>
                        <input value={addressInput} onChange={(e) => setAddressInput(e.target.value)} className='flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500' type="text" placeholder='Enter your delivery address' />
                        <button onClick={getLatLngByAddress} className='bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center justify-center'><IoMdSearch size={17} /></button>
                        <button onClick={getCurrentLocation} className='bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-center'><TbCurrentLocation size={17} /></button>
                    </div>

                    <div className='rounded-xl border overflow-hidden'>
                        <div className='h-64 w-full flex items-center justify-center'>
                            <MapContainer className="w-full h-full"
                                center={[location?.latitude, location?.longitude]}
                                zoom={16}
                            >

                                <TileLayer
                                    attribution='&copy;
                                    
                                    <a href="https://www.openstreetmap.org/ copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                                >

                                </TileLayer>


                                < ReCenterMap location={location} />
                                <Marker position={[location?.latitude, location?.longitude]} draggable eventHandlers={{ dragend: onDragEnd }}>
                                    <Popup>
                                        Delivery Location
                                    </Popup>
                                </Marker>

                            </MapContainer>
                        </div>
                    </div>
                </section>


                <section>
                    <h2 className='text-lg font-semibold mb-3 text-gray-800'>Payment Method</h2>

                    <div className='grid  grid-cols-1 sm:grid-cols-2 gap-4'>

                        <div onClick={() => setPaymentMethod("cod")} className={` flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod === "cod" ? "border-red-500 bg-orange-100 shadow" : "border-gray-200 hover:border-gray-500"}`}>
                            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-200'><MdDeliveryDining className='text-green-600 text-xl' />
                            </span>
                            <div>
                                <p className='font-bold'>Cash On Delivery</p>
                                <p className='text-gray-500'>Pay when your food arrives</p>
                            </div>


                        </div>
                        <div onClick={() => setPaymentMethod("online")} className={` flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod === "online" ? "border-red-500 bg-orange-100 shadow" : "border-gray-200 hover:border-gray-500"}`}>
                            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-200-200'>
                                <MdMobileFriendly className='text-purple-600 text-lg' />
                            </span>
                            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100'>
                                <FaCreditCard className=' text-blue-600 text-xl' />
                            </span>

                            <div>
                                <p className='font-bold'>UPI / Credit/Debit</p>
                                <p className='text-gray-500'>Pay Securely Online</p>
                            </div>

                        </div>
                    </div>
                </section>

                <section>
                    <h2 className='text-lg font-semibold mb-3 text-gray-800'>Order Summary</h2>

                    <div className=' rounded-xl border bg-gray-50 p-4 space-y-2'>

                        {cartItems.map((item,index)=>(

                        <div className=' flex justify-between text-sm text-gray-700' key={index}>
                            <span>{item.name} x {item.quantity}</span>
                            <span>₹{item.price*item.quantity}</span>

                        </div>

                        ))}
                        <hr  className='border-gray-400 my-2'/>

                        <div className='flex justify-between font-medium text-gray-800'>
                            <span>Subtotal</span>
                            <span>₹{totalAmount}</span>
                        </div>
                        <div className='flex justify-between text-gray-700'>
                            <span>Delivery Fee</span>
                            <span>{deliveryFee==0?"Free":deliveryFee}</span>
                        </div>


                        <div className='flex justify-between font-bold text-red-500'>
                            <span> Total </span>
                            <span>₹{amountWithDeliveryFee}</span>
                        </div>
                        
                        


                    </div>


                </section>


                <button onClick={handlePlaceOrder} className='w-full bg-red-500 hover:bg-red-800 text-white py-3 rounded-xl font-semibold shadow-2xl shadow-black'>{paymentMethod=="cod"?"Place Order":"Pay & Place Order"}</button>
            </div>

        </div>
    )
}

export default CheckOut