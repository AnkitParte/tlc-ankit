import { Link, useNavigate } from "react-router-dom"
import { Box, Button, useToast } from "@chakra-ui/react"
import "./navbar.css";
import Actions from "./Actions";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../Store/user/user.controller";
import { useEffect } from "react";
import { verifyUser } from "../Store/user/user.action";

let unauth = [
    { to: "/", title: "Home" },
    { to: "/register", title: "SignUp" },
    { to: "/login", title: "SignIn" },
]
let auth = [
    { to: "/", title: "Home" },
    { to: "/events", title: "Post Events" },
    { to: "/myevents", title: "My Events" },
    { to: "/myrequests", title: "My Requests" },
]
export default function Navbar() {
    const { isAuth ,token,username} = useSelector(store => store.user);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const toast = useToast();

    const userLogout = ()=>{
        toast({
            title: `Logout Successful, ${username}`,
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: "top"
        })
        dispatch({type:LOGOUT})
        nav("/")
    }
    
    useEffect(()=>{
        dispatch(verifyUser(token));
    },[])
    if (isAuth) {
        return (
            <Box className="navbar">
                {auth?.map(el => { return <Link to={el.to}>{el.title}</Link> })}
                <Button colorScheme={"facebook"} onClick={userLogout}>Logout</Button>
            </Box>
        )
    } else {
        return (
            <Box className="navbar">
                {unauth?.map(el => { return <Link to={el.to}>{el.title}</Link> })}
            </Box>
        )
    }

}