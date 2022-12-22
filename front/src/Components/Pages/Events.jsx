import { Box, Button, Heading, Select } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    Textarea, Input, useToast
} from '@chakra-ui/react'
import { useState } from "react";
import axios from "axios";
import { eventURL } from "../Store/user/user.controller";
import { useSelector } from "react-redux";


let temp = { title: "", description: "", limit: "", expiryAt: "" }
let category = [
    { value: "Football", name: "Football" },
    { value: "Cricket", name: "Cricket" },
    { value: "Tennis", name: "Tennis" },
    { value: "Hockey", name: "Hockey" },
    { value: "Boxing", name: "Boxing" },
    { value: "Badminton", name: "Badminton" },
    { value: "Volleyball", name: "Volleyball" },
    { value: "Basketball", name: "Basketball" },
    { value: "Others", name: "Others" },
]

export default function Events() {
    const { token } = useSelector(store => store.user);
    //console.log(token);
    const [event, setEvent] = useState(temp);
    const toast = useToast();

    const handChange = (e) => {
        let { name, value } = e.target;
        if (name == "limit") {
            value = Number(value);
        }
        if (name == "expiryAt") {
            value = new Date(value).getTime();
        }
        setEvent({ ...event, [name]: value });
    }
    const eventSubmit = async () => {
        //console.log(event);
        if (!event.title || !event.description || !event.limit || !event.expiryAt) {
            toast({
                title: 'Error',
                description: "Something Went Wrong",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "top"
            })
        }
        let publishAt = new Date().getTime();
        let res = await axios.post(eventURL, {
            ...event, publishAt,token
        });
        if (res.status == 200) {
            toast({
                title: 'Event Posted',
                description: "Check Home Page for updates",
                status: 'success',
                duration: 2500,
                isClosable: true,
                position: "top"
            })
        } else {
            toast({
                title: 'Error',
                description: "Check Home Page for updates",
                status: 'error',
                duration: 2500,
                isClosable: true,
                position: "top"
            })
        }
    }
    return (<Box>
        <Heading>Create An Event</Heading>
        <Box w="50%" m="auto">
            <FormControl mt="5px">
                <FormLabel fontWeight={700}>Event Title</FormLabel>
                <Input name="title" type='text' placeholder="Enter Event Title" onChange={handChange} />
            </FormControl>
            <FormControl mt="5px">
                <FormLabel fontWeight={700}>Event Description</FormLabel>
                <Textarea name="description" placeholder="Enter description" onChange={handChange} />
            </FormControl>
            <FormControl mt="5px">
                <FormLabel fontWeight={700}>Event Limit</FormLabel>
                <Input name="limit" placeholder="Enter Limit" type="number" onChange={handChange} />
            </FormControl>
            <FormControl mt="5px">
                <FormLabel fontWeight={700}>Event Expiry</FormLabel>
                <Input name="expiryAt" placeholder="Enter Expiry" type="date" onChange={handChange} />
            </FormControl>
            <FormControl mt="5px">
                <FormLabel fontWeight={700}>Sports Category</FormLabel>
                <Select w="100%" name="category" defaultValue={"football"} onChange={handChange}>
                    {category?.map((el) => {
                        return <option value={el?.value}>{el?.name}</option>
                    })}
                </Select>
            </FormControl>

            <Button w="100%" mt="10px" colorScheme={"facebook"} onClick={eventSubmit}>Post Event</Button>
        </Box>
    </Box>)
}