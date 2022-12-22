import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button,Box
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


export default function PopUp({ isOpen, onClose,arr }) {
    const nav = useNavigate();
    const gotoEvent = (id)=>{
        nav(`/${id}`)
        onClose();
    }
    return (
        <Popover isOpen={isOpen}>
            {isOpen && <PopoverTrigger>
                <Button onClick={onClose}>Results</Button>
            </PopoverTrigger>}
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton onClick={onClose}/>
                <PopoverHeader>{!arr?.length ? "We're sorry" :"click to go"}</PopoverHeader>
                <PopoverBody>
                    {!arr?.length ? <Box>No results found</Box> :""}
                    {arr?.map(el=>{
                        
                        return (<Box p="4px" textAlign={"left"} 
                            borderBottom="1px solid lightgray" borderRadius="6px" 
                            _hover={{background:"lightgreen"}}
                            onClick={()=>gotoEvent(el._id)}
                            >
                            <Box fontWeight={600}>{el?.title}</Box>
                            <Box>{el?.category || "others"}</Box>
                        </Box>)
                    })}
                    
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}