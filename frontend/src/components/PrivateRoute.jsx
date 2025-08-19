import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function PrivateRoute({children, allowedRoles}) {
    const {auth, loading} = useAuth()

    if(loading) {
        return <div>Loading...</div>
    }

    if(!auth || !auth.accessToken) {
        return <Navigate to="/login"/>
    }   

    if(allowedRoles && !allowedRoles.includes(auth.role)) {
        return <Navigate to="/login"/>
    }

    return typeof children === "function" ? children(auth) : children ;
}