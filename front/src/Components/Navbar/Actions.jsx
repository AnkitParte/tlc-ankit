import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

let logged=[
    {to:"/accept",title:"Accept"},
    {to:"/pending",title:"Pending"},
]

let unlogged=[
    {to:"/register",title:"Register"},
    {to:"/login",title:"Login"},
]
export default function Actions(){
    const {isAuth} = useSelector(store=>store.user);
    const nav = useNavigate();
    return (<Box className="actions">
        {isAuth?
            <Box>
                {logged?.map((el)=>{
                    return <Box onClick={()=>nav(`${el.to}`)}>{el.title}</Box>
                })}
                <Box>Logout</Box>
            </Box>
            :
            <Box>
                {unlogged?.map((el)=>{
                    return <Box onClick={()=>nav(`${el.to}`)}>{el.title}</Box>
                })}
            </Box>    
        }
    </Box>)
}