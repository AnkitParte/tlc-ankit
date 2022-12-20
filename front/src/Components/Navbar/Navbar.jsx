import { Link } from "react-router-dom"
import {Box} from "@chakra-ui/react"
import "./navbar.css";
import Actions from "./Actions";

let routes = [
    {to:"/",title:"HOME"},
    {to:"/register",title:"SignUp"},
    {to:"/login",title:"SignIn"},
    {to:"/profile",title:"Profile"},
    
]
export default function Navbar(){
    return (
        <Box className="navbar">
            <Link to="/">Home</Link>
            <Box className="profileDiv"><Actions/>Profile </Box>
        </Box>
    )
}