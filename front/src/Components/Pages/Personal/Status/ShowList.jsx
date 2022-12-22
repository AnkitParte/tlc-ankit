import { Box ,Button,Text} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { eventURL } from "../../../Store/user/user.controller";


export default function ShowList(props){
    const {eventId} = props;
    const [current,setCurrent] = useState();
    const [others,setOthers] = useState(false);

    const getEventDetails = async(id)=>{

        await axios.get(eventURL+"/"+id)
        .then((res)=>{
            //console.log(res)
            setCurrent(res.data.event);
        })
        .catch(e=>{
            console.log(e);
        })
    }
    useEffect(()=>{
        getEventDetails(eventId._id);
    },[eventId._id]);
    return (<Box
        fontWeight={600} fontSize="1.5em" background="lightgreen" p="5px" w="80%" m="auto" 
        borderRadius="6px"
        mt="5px"
    >
        <Text >{props?.applicant?.username}</Text>
        <Box>Organizer : {current?.organizer?.username} - Category : {current?.category || "others"}</Box>
        <Button size="sm" onClick={()=>setOthers(!others)}>{others?"Hide":"See"} Others</Button>
        {others && 
            <Box display={"flex"} flexWrap="wrap">
                {current?.applications?.map((el,i)=>{
                    let {applicant,status} = el;
                    if(status){
                        return <Box 
                        background={"lightcyan"} borderRadius="6px" mt="5px" fontSize={"17px"} p="6px"
                        key={applicant?.userId}>{i+1} - {applicant?.username} - Accepted</Box>
                    }
                })}
            </Box>
        }
    </Box>)
}