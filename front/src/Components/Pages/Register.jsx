import { Box, Heading, useToast } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,InputRightElement,Button
} from '@chakra-ui/react'
import { useState } from "react";
import { registerURL } from "../Store/user/user.controller";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const [show,setShow] = useState(false);
    const [form,setForm] = useState({});
    const toast = useToast();
    const nav = useNavigate();

    const handChange = (e)=>{
        const {name,value} = e.target;
        setForm({...form,[name]:value});
    }
    const handleRegister = async()=>{
        if(!form.username){
            toast({
                title: 'Enter Username',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position:"top"
              })
            return;
        }
        if(!form.password){
            toast({
                title: 'Enter Password',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position:"top"
              })
            return;
        }
        if(form.username.length<3){
            toast({
                title: 'Username',
                description:"Username length must be greater than 3",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position:"top"
              })
            return;
        }
        if(form.password.length<3){
            toast({
                title: 'Password',
                description:"Password length must be greater than 3",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position:"top"
              })
            return;
        }

        let registerMe = await axios.post(registerURL,form);
        if(registerMe.status==200){
            toast({
                title: 'Account Created Successfully',
                description:"Please Login",
                status: 'success',
                duration: 9000,
                isClosable: true,
                position:"top"
            })
            nav("/login")
            setForm({});
        }else{
            toast({
                title: 'Try Again',
                description:"Something went wrong ",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position:"top"
            })
        }

    }

    return (<Box>
        <Heading>Registration Page</Heading>
        <br/>
        <Box w="40%" m="auto">
            <FormControl>
                <FormLabel>Enter a Username</FormLabel>
                <Input type='text' 
                name="username"
                placeholder="Enter Username" onChange={handChange}/>
            </FormControl>
            <FormControl mt="5px">
                <FormLabel>Enter your Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        name="password"
                        placeholder='Enter password'
                        onChange={handChange}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={()=>setShow(!show)}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button mt="10px" colorScheme={"facebook"} w="100%" onClick={handleRegister}>Register</Button>
        </Box>

    </Box>)
}