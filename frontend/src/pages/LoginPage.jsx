import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login" , form, {withCredentials:true});
      setAuth({accessToken: res.data.accessToken, role: res.data.role})
      console.log(res.data);
      navigate("/")
    } catch (error) {
        setError("Login failed. Please check your credentials.")
        console.error(error)
    }
  } 

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl'>
      <h2 className='text-2xl font-bold mb-4'>Login</h2>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <form className='space-y-4'>
          <div>
            <input className='w-full p-2 border rounded' type='email' placeholder='Email' value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required/>
          </div>
          <div>
            <input className='w-full p-2 border rounded' type='password' placeholder='Password' value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required/>
          </div>
          <button className='w-full bg-green-400 hover:bg-green-500 py-1 rounded cursor-pointer' onClick={handleLogin}>
            Login
          </button>
      </form>
    </div>
  )
}

export default LoginPage