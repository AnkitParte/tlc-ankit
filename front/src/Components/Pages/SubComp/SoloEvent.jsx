import { Button, Box, useToast, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { applyURL, eventURL } from "../../Store/user/user.controller";
import { Card, CardHeader, CardBody, CardFooter, Heading,Text } from '@chakra-ui/react'
import { useSelector } from "react-redux";
import axios from "axios";

export default function SoloEvent() {
    const nav = useNavigate();
    const params = useParams();
    const {token} = useSelector(store=>store.user);
    const toast = useToast();
    const [load,setLoad] = useState(false);

    const [card,setCard] = useState({});
    let date = new Date(card.expiryAt).toDateString();
    let currDate = new Date().getTime();
    //console.log(params);
    // console.log(card.expiryAt)
    // console.log(currDate)
    const applyEvent = async()=>{
        if(card?.limit==0){
            toast({
                title: 'Stop',
                description: "Limit exceeded",
                status: 'info',
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            return;
        }
        setLoad(true);
        await axios.patch(applyURL,{token,eventId:params.id})
        .then((res)=>{
            toast({
                title: 'Application',
                description: "Application Successful",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            setLoad(false);
        })
        .catch((e)=>{
            //console.log(e)
            if(e.response.status==502){
                toast({
                    title: 'Already Applied',
                    description: "Already exist",
                    status: 'info',
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                })
            }else{
                toast({
                    title: 'Try Again',
                    description: "Error occured",
                    status: 'info',
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                })
            }
            setLoad(false);
        })
    }
    useEffect(()=>{
        fetch(eventURL+"/"+params.id)
        .then(res=>res.json())
        .then(res=>{
            setCard(res.event);
        })
    },[]);
    return (<Box w="50%" m="auto">
        <Box  w="30%" m="auto" mt="10px" mb="10px"><Button colorScheme={"blue"} onClick={()=>nav("/")} w="100%">Go Back</Button></Box>
        {load && <Spinner thickness="3px" size="md"/>}
        <Card align='center' color={"black"} background="lightblue">
            <CardHeader>
                <Heading size='md'>{card?.title}</Heading>
                <Text>Posted By : {card?.organizer?.username}</Text>
            </CardHeader>
            <CardBody>
                <Text><Text as="span" fontWeight={700}>Category</Text> : {card.category || "others"}</Text>
                <Text><Text as="span" fontWeight={700}>Description</Text> : {card?.description}</Text>
                <Text><Text as="span" fontWeight={700}>Limit</Text>  : {card?.limit}</Text>
                <Text><Text as="span" fontWeight={700}>Expire date</Text> : {date}</Text>
            </CardBody>
            <CardFooter>
                <Button colorScheme='green' disabled={currDate>date} onClick={applyEvent}>Request to join</Button>
                <Button ml="5px" colorScheme={"blue"} onClick={()=>nav("/")}>Go Back</Button>
            </CardFooter>
        </Card>
    </Box>)
}