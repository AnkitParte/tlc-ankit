import { Box, Button, Heading, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getMyApply } from "./myApi";
import Accepted from "./Status/Accepted";
import Requested from "./Status/Requested";


export default function MyRequests(){
    const {token} = useSelector(store=>store.user);
    const [page,setPage] = useState(true);
    const [reqLoader,setreqLoader] = useState(false);
    const [allReq,setAllReq] = useState([]);

    const getRequests = async()=>{
        setreqLoader(true);
        await axios.get(getMyApply,{
            headers:{
                token:token
            }
        })
        .then((res)=>{
            //console.log(res);
            setAllReq(res.data.data);
            setreqLoader(false);
        })
        .catch((e)=>{
            setreqLoader(false);
        })
    }
    useEffect(()=>{
        getRequests();
    },[]);
    
    return(<Box w="80%" m="auto">
        <Heading>Your Requests</Heading>
        {reqLoader && <Spinner thickness="6px" alignSelf={"center"}/>}
        <Box w="100%" mt="10px" mb="10px">
            <Button w="45%" mr="5px" colorScheme={"facebook"} variant={page?"solid":"outline"}
            onClick={()=>setPage(!page)}>Accepted</Button>
            <Button w="45%" ml="5px" colorScheme={"facebook"} variant={!page?"solid":"outline"}
            onClick={()=>setPage(!page)}>Requested</Button>
        </Box>
        {page ? <Accepted arr={allReq}/> : <Requested arr={allReq}/>}
    </Box>)
}