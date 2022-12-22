import { Box, Heading, useToast } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup, InputRightElement, Button,  Spinner
} from '@chakra-ui/react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { loginUser } from "../Store/user/user.action";
import "./pages.css";

export default function Login() {
    const [show, setShow] = useState(false);
    const [SignF, setSignF] = useState({});
    const toast = useToast();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector(store=>store.user);

    const handSignF = (e) => {
        const { name, value } = e.target;
        setSignF({ ...SignF, [name]: value });
    }

    const handleLogin = async() => {
        if (!SignF.username) {
            toast({
                title: 'Enter Username',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: "top"
            })
            return;
        }
        if (!SignF.password) {
            toast({
                title: 'Enter Password',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: "top"
            })
            return;
        }
        if (SignF.username.length < 3) {
            toast({
                title: 'Username',
                description: "Username length must be greater than 3",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: "top"
            })
            return;
        }
        if (SignF.password.length < 3) {
            toast({
                title: 'Password',
                description: "Password length must be greater than 3",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: "top"
            })
            return;
        }

        dispatch(loginUser(SignF,nav,toast));
        
    }
    return (<Box>
        <Heading>Login Page</Heading>
        {loading &&
            <Spinner mt="6px" mb="6px" thickness="5px" size="xl"/>
        }
        <br />
        <Box w="40%" m="auto">
            <FormControl>
                <FormLabel>Enter a Username</FormLabel>
                <Input type='text'
                    name="username"
                    placeholder="Enter Username" onChange={handSignF} />
            </FormControl>
            <FormControl mt="5px">
                <FormLabel>Enter your Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        name="password"
                        placeholder='Enter password'
                        onChange={handSignF}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button mt="10px" colorScheme={"facebook"} w="100%" onClick={handleLogin}>Login</Button>
        </Box>
    </Box>)
}