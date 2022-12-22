import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";



export default function PrivateRoute({children}){
    const {isAuth} = useSelector(store=>store.user);
    return (isAuth ? children : <Navigate to="/"/>)
}