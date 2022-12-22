import { Box,Button,Text } from "@chakra-ui/react";


export default function Requested({arr}){
    return (<Box>
        {arr?.map((el)=>{
            let state = el?.status;
            let reject = el?.reject;
            
            return (!state && <Box key={el._id}
                fontWeight={600} fontSize="1.5em" background={reject?"red.400":"#fcbf49"} p="5px" w="80%" m="auto" 
                borderRadius="6px"
                mt="5px"
            >
                <Text>{el?.applicant?.username} - {reject?"Rejected":"Pending"}</Text> 
                <Text fontSize={"16px"}>Category - <Button colorScheme={"facebook"} size="sm">{el?.eventId?.category || "others"}</Button> {" "}
                Organizer -  <Button colorScheme={"facebook"} size="sm">{el?.eventId?.organizer?.username}</Button></Text>
                <Text fontSize={"18px"}>Title : {el?.eventId?.title}</Text>
            </Box>)
        })}
    </Box>)
}