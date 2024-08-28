import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Card, CardBody } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,

} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const login = useAuth()?.login;
  if (login === undefined) {
    throw Error("Failed to initialization, login")
  }
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    // Here you would usually send a request to your backend to authenticate the user
    // For the sake of this example, we're using a mock authentication



    if (username === "user" && password === "password") {
      // Replace with actual authentication logic

      //get authentication info and save it
      //if authentication failed, express message
      await login({
        username: "hogehoge",
        isAuth: true, //test, always true to see chat page
        authProof: "brajopae;kmrb:a@["
      });
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <>
      <Card alignItems={"center"} h={"450px"} w={"600px"} m={"auto"} mt={"50px"} padding={"30px"}>
        <Flex align={"center"}>
          {/* <form onSubmit={(e) => { handleLogin(e) }}> */}
          <form onSubmit={handleLogin}>
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
                  <Button type="submit">Login</Button>
                </CardBody>
                <CardBody>
                <Button onClick={() => { navigate("/register") }}>Sign up new user</Button>
                </CardBody>
              </FormControl>
            </CardBody>
          </form>
        </Flex>
      </Card>
    </>
  );
};