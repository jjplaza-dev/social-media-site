import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        await axios.post("/api/auth/register", form, {withCredentials: true} )
        navigate("/login")
    } catch (error) {
        setError("Register failed.")
        console.error(error)
    }
  } 

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl'>
        <h2 className='text-2xl font-bold mb-4'>Register</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form className='space-y-4'>
            <div>
                <input className='w-full p-2 border rounded' type='username' placeholder='Username' value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} required/>
            </div>
            <div>
                <input className='w-full p-2 border rounded' type='email' placeholder='Email' value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required/>
            </div>
            <div>
                <input className='w-full p-2 border rounded' type='password' placeholder='Password' value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required/>
            </div>
            <button className='w-full bg-green-400 hover:bg-green-500 py-1 rounded cursor-pointer' onClick={handleSubmit}>
                Register
            </button>
        </form>
    </div>
  )
}

export default RegisterPage