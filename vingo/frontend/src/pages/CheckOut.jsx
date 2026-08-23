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


function ReCenterMap({ location }) {

    if (location.latitude && location.longitude) {

        const map = useMap();
        map.setView([location.latitude, location.longitude], 16, { animate: true })
    }
    return null;

}

const CheckOut = () => {

    const dispatch = useDispatch()
    const apiKey = import.meta.env.VITE_GEOAPIKEY

    const { location, address } = useSelector(state => state.map)
    const [addressInput, setAddressInput] = useState()

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

            const{lat,lon}=result.data.features[0].properties
            dispatch(setLocation({latitude:lat,longitude:lon}))

        } catch {

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

            <div onClick={() => navigate("/")} className=' absolute top-[20px] left-[20px] z-[10] '>
                <IoMdArrowBack size={35} className='text-orange-300' />
            </div>

            <div className=' w-full max-w-[900px] bg-yellow-3 00/20 rounded-2xl shadow-2xl p-6 space-y-6 '>

                <h1 className='text-2xl font-bold text-gray-800'>Check-Out</h1>

                <section>
                    <h2 className='text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800'>
                        <IoLocationSharp className='text-red-500' />  Delivery Location

                    </h2>


                    < div className=' flex  gap-2 mb-3'>
                        <input value={addressInput} onChange={(e)=>setAddressInput(e.target.value)} className='flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500' type="text" placeholder='Enter your delivery address' />
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
            </div>

        </div>
    )
}

export default CheckOut