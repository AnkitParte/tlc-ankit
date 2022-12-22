import { ALL_EVENTS, LOADING, LOGIN, LOGOUT, UNDOLOAD } from "./user.controller"

let token = JSON.parse(localStorage.getItem("token")) || "";
let init = {
    isAuth:false,
    userData:"",
    loading:false,
    allEvents:[],
    token:token
}

export const userReducer = (state=init,{type,payload})=>{
    switch(type){
        case ALL_EVENTS:{
            return {...state,allEvents:payload}
        }
        case LOGIN : {
            window.localStorage.setItem("token",JSON.stringify(payload.token));
            return {...state,isAuth:true,loading:false,token:payload.token,username:payload.username}
        }
        case LOGOUT : {
            window.localStorage.removeItem("token");
            return {...state,isAuth:false,loading:false,token:"",username:""}
        }
        case LOADING : {
            return {...state, loading:true}
        }
        case UNDOLOAD : {
            return {...state, loading:false}
        }
        default : {
            return state
        }
    }
}