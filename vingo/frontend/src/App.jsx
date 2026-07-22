import React from 'react'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { Routes , Route } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'


export const  serverUrl="http://localhost:3200"
const App = () => {
  return (
    <>
    <Routes>

      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>


    </Routes>
    </>
  )
}

export default App