import { FormEvent, useState } from "react";
import { Card, CardBody } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,

} from '@chakra-ui/react'

const doesUserExistEndPoint = import.meta.env.VITE_DOES_USER_EXISTS
const registerUserEndpoint = import.meta.env.VITE_REGISTER_USER

export const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [resultRegister, setResultRegister] = useState("")

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setResultRegister("")
        const doesUserExist = await fetch(doesUserExistEndPoint, {
            method: "POST",
            body: JSON.stringify({ Username: username })
        })
        if (doesUserExist.status === 200) {
            const registered = await fetch(registerUserEndpoint, {
                method: "POST",
                body: JSON.stringify({ Username: username, Password: password })
            })
            if (registered.status === 200) {
                setResultRegister("Register successfully!!!")
            } else {
                throw new Error("Sorry, you can't register user sucessfully")
            }
        } else {
            setResultRegister("failed to connect")
        }
    };

    return (
        <>
            <Card alignItems={"center"} h={"400px"} w={"600px"} m={"auto"} mt={"50px"} padding={"30px"} bgColor={"#ffdddd"}>
                <Flex align={"center"}>
                    <form onSubmit={handleRegister}>
                        <CardBody padding={"10px"}>
                            <FormControl >
                                <CardBody>
                                    <FormLabel htmlFor="username">Username : </FormLabel>
                                    <Input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)
                                        }
                                    ></Input>
                                </CardBody>
                                <CardBody>
                                    <FormLabel htmlFor="username">Password : </FormLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    >
                                    </Input>
                                </CardBody>
                                <CardBody>
                                    {resultRegister !== "" ? <><>
                                        {resultRegister}<br/>
                                    </>
                                    </> : null}
                                    <Button type="submit">Sign Up</Button>
                                </CardBody>
                            </FormControl>
                        </CardBody>
                    </form>
                </Flex>
            </Card>
        </>
    );
};