import { Box ,} from "@chakra-ui/react";
import ShowList from "./ShowList";


export default function Accepted({arr}){
    return (<Box>
        {arr?.map((el,i)=>{
            let state = el?.status
            return (state && <ShowList id={i+1} key={el?._id} {...el}/>)
        })}
    </Box>)
}