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
import AddItem from './pages/AddItem'
import EditItem from './pages/EditItem'
import useGetShopByCity from '../hooks/useGetShopByCity'
import useGetItemByCity from '../hooks/useGetItemByCity'
import CartPage from './pages/CartPage'
import CheckOut from './pages/CheckOut'
import OrderPlaced from './pages/OrderPlaced'
import MyOrder from './pages/MyOrder'
import useGetMyOrder from '../hooks/useGetMyOrder'


export const  serverUrl="http://localhost:3200"
const App = () => {
  useGetCurrentUser()
  useGetCity()
  useGetMyShop()
  useGetShopByCity()
 useGetItemByCity()
 useGetMyOrder()
  const {userData}=useSelector(state=>state.user)
  return (
    <>
    <Routes>

      <Route path="/signup" element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
      <Route path="/signin" element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
      <Route path="/forgot-password" element={!userData?<ForgotPassword/>:<Navigate to={"/"}/>}/>
      <Route path="/" element={userData?<Home/>:<Navigate to={"/signIn"}/>}/>

      <Route path="/create-edit-shop" element={userData?<CreateEditShop/>:<Navigate to={"/signIn"}/>}/>
      <Route path="/add-item" element={userData?<AddItem/>:<Navigate to={"/signIn"}/>}/>
      <Route path="/edit-item/:itemId" element={userData?<EditItem/>:<Navigate to={"/signIn"}/>}/>
      <Route path="/cart" element={userData?<CartPage/>:<Navigate to={"/signIn"}/>}/>
      <Route path="/checkout" element={userData?<CheckOut/>:<Navigate to={"/signIn"}/>}/>
      <Route path="/order-placed" element={userData?<OrderPlaced/>:<Navigate to={"/signIn"}/>}/>
      <Route path="/my-order" element={userData?<MyOrder/>:<Navigate to={"/signIn"}/>}/>

    </Routes>
    </>
  )
}

export default App