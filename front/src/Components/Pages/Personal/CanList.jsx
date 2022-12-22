import { Button, Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { eventURL } from "../../Store/user/user.controller";
import { patchApply } from "./myApi";


export default function CanList() {
    const params = useParams();
    const [filter, setFilter] = useState([]);
    const nav = useNavigate();
    //console.log(params);
    let date = new Date(filter.expiryAt).toDateString();

    const patchState = async(id,bool)=>{
        let status,reject;
        if(bool){
            status=true;
            reject=false;
        }else{
            status=false;
            reject=true;
        }
        toast({
            title: 'Processing request...',
            status: 'info',
            duration: 500,
            isClosable: true,
            position: "top"
        })
        await axios.patch(patchApply+"/"+id,{status,reject})
        .then((res)=>{
            //console.log(res);
            getCurrEve(params.id);
        })
        .catch((e)=>{
            console.log(e);
        })
        toast({
            title: 'Request Sent',
            description:"A request can only be done once",
            status: 'success',
            duration: 2500,
            isClosable: true,
            position: "top"
        })
    }

    const getCurrEve = async(id)=>{
        fetch(eventURL + "/" + id)
            .then(res => res.json())
            .then(res => {
                setFilter(res.event);
            })
            .catch((e)=>{
                console.log(e);
            })
    }
    useEffect(() => {
        getCurrEve(params.id);
    }, [params.id])
    return (<Box w="60%" m="auto">
        <Button mt="10px" colorScheme={"facebook"} onClick={() => nav(`/myevents`)}>Go Back</Button>
        <Box
            fontWeight={600} fontSize="1.5em" background="lightgreen" p="5px" w="100%" m="auto"
            display={"flex"} justifyContent="space-around" borderRadius="6px" mt="10px"
        >
            <Box>{filter.title}</Box>
            <Box>Date : {date}</Box>
            <Box>Category : {filter.category}</Box>
        </Box>
        <Box mt="10px" align="left">All Applicants List</Box>
        {filter?.applications?.map((el, i) => {
            return (<Box key={el?._id}
                display={"flex"} p="5px" border={"2px solid navy"} borderRadius="6px"
                justifyContent={"space-around"} mt="10px" alignItems={"center"} background="whitesmoke"
            >
                <Box fontWeight={600}>{i + 1}. {el?.applicant?.username}</Box>
                {el?.status ? 
                    <Box>Application Status : Accepted</Box>
                :
                el?.reject? <Box>Application Status : Rejected</Box>
                
                :    
                <Box>   
                    <Button size="sm" colorScheme={"facebook"}
                    onClick={()=>patchState(el._id,true)}
                    >Accept</Button>
                    <Button ml="4px" size="sm" colorScheme={"orange"}
                    onClick={()=>patchState(el._id,false)}
                    >Reject</Button>
                </Box>
                }
            </Box>)
        })}
    </Box>)
}