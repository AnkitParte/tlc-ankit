import axios from "axios";
import { ALL_EVENTS, eventURL, LOADING, LOGIN, loginURL, LOGOUT, UNDOLOAD, verifyURL } from "./user.controller";


export let loginUser = (form,nav,toast)=>async(dispatch)=>{
    dispatch({type:LOADING});
    try{
        let getUser = await axios.post(loginURL,form);
        dispatch({type:LOGIN,payload:{token:getUser.data.token,username:getUser.data.username}});
        toast({
            title: 'Login Successful',
            description: "redirecting to homepage",
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: "top"
        })
        nav("/");
        return;
    }catch(e){
        //console.log(e);
        dispatch({type:UNDOLOAD});
        toast({
            title: 'Something went wrong',
            description: "Try Again",
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: "top"
        })
    }
}

export const getEvents = (filter)=>async(dispatch)=>{
    try{
        let res = await axios.get(eventURL+"/"+"?filter="+filter);
        //console.log(res);
        dispatch({type:ALL_EVENTS,payload:res.data.data});
    }catch(e){
        console.log(e);
    }
}

export const verifyUser = (token)=>async(dispatch)=>{
    try{
        let res = await axios.post(verifyURL,{token})
        if(res.status==200){
            dispatch({type:LOGIN,payload:token});
        }else{
            dispatch({type:LOGOUT})
        }
    }catch(e){
        dispatch({type:LOGOUT})
    }
}