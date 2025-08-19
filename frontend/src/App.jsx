import { useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/authContext'

import PrivateRoute from './components/PrivateRoute'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import PublicRoute from './components/PublicRoute'

function App() {
 

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
          <Routes>
            <Route path="/login" element={<PublicRoute><LoginPage/> </PublicRoute>}/>
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute> }/>
            <Route path='/' element={<PrivateRoute>
              {(auth) => auth.role === "admin" ? <AdminDashboard /> : <UserDashboard/>}
            </PrivateRoute>}/>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  ) 
}

export default App
