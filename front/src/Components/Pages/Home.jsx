import { Box, Heading, Input ,InputGroup,InputRightElement, Button, useToast, Spinner, Select} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../Store/user/user.action";
import EveCard from "./SubComp/EveCard";
import { useState } from "react";
import axios from "axios";
import { searchAPI } from "../Store/user/user.controller";
import "./home.css";
import PopUp from "./SubComp/PopUp";

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
export default function Home() {
    const dispatch = useDispatch();
    const { allEvents,username,isAuth } = useSelector(store => store.user);
    const [find,setFind] = useState("");
    const toast = useToast();
    const [loader,setLoaders] = useState(false);
    const [qData,setqData] = useState([]);
    const [pop,setPop] = useState(false);
    const [filter,setFilter] = useState("");
    //console.log(filter);

    const handleSearch = async()=>{
        if(find==""){
            toast({
                title: 'type something',
                status: 'info',
                duration: 2000,
                isClosable: true,
                position: "top"
            })
            return;
        }
        setLoaders(true)
        await axios.get(searchAPI+"?query="+find)
        .then(res=>{
            //console.log(res)
            setPop(true);
            //console.log(res);
            setqData(res.data.data);
            setLoaders(false)
        })
        .catch(e=>{
            console.log(e);
            setLoaders(false)
        })
    }
    useEffect(() => {
        dispatch(getEvents(filter));
    }, [filter])
    return (<Box position={"relative"}>
        <Heading>{isAuth?`Welcome, ${username}`:"Welcome to Homepage"}</Heading>
        {loader && <Spinner thickness="5px" size="lg"/>}

        <Box w="60%" m="auto" mt="5px">
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type='text'
                    placeholder='search based on title or category'
                    onChange={(e)=>setFind(e.target.value)}
                    value={find}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleSearch}>
                        <Search2Icon />
                    </Button>
                </InputRightElement>
            </InputGroup>
            
        </Box>
        {pop && <PopUp isOpen={pop} onClose={()=>setPop(!pop)} arr={qData}/>}
        <Box w="60%" m="auto" mt="5px">
            <Select defaultValue={""} value={filter} onChange={(e)=>setFilter(e.target.value)}>
                {category.map((el,i)=>{
                    return <option key={i+1} value={el.value}>{el.name}</option>
                })}
            </Select>
        </Box>
        <Box w="60%" m="auto">
            {allEvents?.map((el) => {
                return <EveCard key={el?._id} {...el} />
            })}
        </Box>
    </Box>)
}