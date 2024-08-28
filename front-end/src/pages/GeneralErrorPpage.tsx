import { Card, CardBody } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

export const GeneralErrorPage = () => {
    const navigate = useNavigate()

    return (
        <>
            <Card alignItems={"center"} h={"200px"} w={"600px"} m={"auto"} mt={"50px"} padding={"30px"}>
                <Flex align={"center"}>
                    <CardBody padding={"10px"} onClick={() => navigate("/")}>
                        Sorry, something happens and you're seeing error page.
                        After click somewhere, this page will change to login page...
                    </CardBody>
                </Flex>
            </Card>
        </>
    );
};