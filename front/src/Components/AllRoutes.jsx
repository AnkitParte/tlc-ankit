import {Routes,Route} from "react-router-dom";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";

export default function AllRoutes(){
    return (
        <Routes>
            <Route path="/" />
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
    )
}