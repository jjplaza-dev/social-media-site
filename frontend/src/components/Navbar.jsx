import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import axios from 'axios';

function Navbar() {
    const navigate = useNavigate()
    const { auth, setAuth } = useAuth();

    const handleLogout = async() => {
        try {
            await axios.post("/api/auth/logout", {}, {withCredentials:true})
            setAuth(null)
            navigate('/login')
        } catch (error) {
            console.error("Logout Failed", error)
        }
    }

  return (
    <nav className='bg-gray-800 p-4 text-white'>
        <div className='container mx-auto flex justify-between items-center'>
            <Link to={"/"} className='text-white mr-4'> 
                Home
            </Link>
            <div>{auth?.email}</div>
            <div> 
                {auth?.accessToken ? 
                    (<>
                        <button className='bg-red-600 px-3 py-1 rounded-xl hover:bg-red-700' onClick={handleLogout}>
                            Logout
                        </button>
                    </>) : (<>
                        <Link to={"/login"} className='text-white pr-4'>
                            Login
                        </Link>
                        <Link to={"/register"} className='text-white'>
                            Register
                        </Link>
                    </>)
                }
            </div>
        </div>
        
    </nav>
  )
}

export default Navbar