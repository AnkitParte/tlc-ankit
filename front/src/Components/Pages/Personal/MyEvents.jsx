import { Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myEveURL } from "./myApi";


export default function MyEvents(){
    const {token} = useSelector(store=>store.user);
    const [myEve,setMyEve] = useState([]);
    const nav = useNavigate();
    //console.log(token)
    const getMyEve = async()=>{
        await axios.get(myEveURL,{
            headers:{
                token:token
            }
        })
        .then((res)=>{
            //console.log(res);
            setMyEve(res.data.data);
        })
        .catch((e)=>{
            //console.log(e);
        })
        
    }
    useEffect(()=>{
        getMyEve();
    },[])
    return(<Box>
        <Heading>Your Events</Heading>
        <Box>Click on any event and then Accept/Reject applications</Box>
        <Box>
            {myEve?.map((el)=>{
                let date = new Date(el.expiryAt).toDateString();
                return (<Box 
                fontWeight={600} fontSize="1.5em" background="lightgreen" p="5px" w="80%" m="auto" 
                display={"flex"} justifyContent="space-around" borderRadius="6px"
                _hover={{background:"lightgrey",cursor:"pointer"}} mt="5px"
                onClick={()=>nav(`/myevents/${el._id}`)}
                >
                    <Box>{el.title}</Box>
                    <Box>Date : {date}</Box>
                    <Box>Category : {el.category}</Box>
                </Box>)
            })}
        </Box>
    </Box>)
}