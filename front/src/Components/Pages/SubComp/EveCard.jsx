import { Box,Text,Button } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter, Heading } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

export default function EveCard(props) {
    const { title, description, limit, expiryAt, category,organizer,_id } = props;
    let date = new Date(expiryAt).toDateString();
    let nav = useNavigate();
    return (<Box mt="10px">
        <Card align='center' color={"black"} background="lightblue">
            <CardHeader>
                <Heading size='md'>{title}</Heading>
                <Text>Posted By : {organizer.username}</Text>
            </CardHeader>
            <CardBody>
                <Text><Text as="span" fontWeight={700}>Description</Text> : {description}</Text>
                <Text><Text as="span" fontWeight={700}>Limit</Text>  : {limit}</Text>
                <Text><Text as="span" fontWeight={700}>Expire date</Text> : {date}</Text>
                <Text><Text as="span" fontWeight={700}>Category</Text> : {category || "others"}</Text>
            </CardBody>
            <CardFooter>
                <Button colorScheme='blue' onClick={()=>nav(`/${_id}`)}>View here</Button>
            </CardFooter>
        </Card>
    </Box>)
}