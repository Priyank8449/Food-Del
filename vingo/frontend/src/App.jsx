import React from 'react'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { Routes , Route, Navigate } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import useGetCurrentUser from '../hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import useGetCity from '../hooks/useGetCity'
import useGetMyShop from '../hooks/useGetMyShop'
import CreateEditShop from './pages/CreateEditShop'


export const  serverUrl="http://localhost:3200"
const App = () => {
  useGetCurrentUser()
  useGetCity()
  useGetMyShop()
  const {userData}=useSelector(state=>state.user)
  return (
    <>
    <Routes>

      <Route path="/signup" element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
      <Route path="/signin" element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
      <Route path="/forgot-password" element={!userData?<ForgotPassword/>:<Navigate to={"/"}/>}/>
      <Route path="/" element={userData?<Home/>:<Navigate to={"/signIn"}/>}/>
      <Route path="/create-edit-shop" element={userData?<CreateEditShop/>:<Navigate to={"/signIn"}/>}/>


    </Routes>
    </>
  )
}

export default App