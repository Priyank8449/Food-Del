import React from 'react'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { Routes , Route, Navigate } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import useGetCurrentUser from '../hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'


export const  serverUrl="http://localhost:3200"
const App = () => {
  useGetCurrentUser()
  const {userData}=useSelector(state=>state.user)
  return (
    <>
    <Routes>

      <Route path="/signup" element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
      <Route path="/signin" element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/" element={userData?<Home/>:<Navigate to={"/signIn"}/>}/>


    </Routes>
    </>
  )
}

export default App