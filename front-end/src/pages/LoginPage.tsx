import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Card, CardHeader, CardBody, CardFooter, border } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        isAuth: false,
        authProof: "brajopae;kmrb:a@["
      });
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <>
      <Card alignItems={"center"} h={"400px"} w={"600px"} m={"auto"} mt={"50px"} padding={"30px"}>
        <Flex align={"center"}>
          <form onSubmit={(e) => { handleLogin(e) }}>
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
                  {/* <button type="submit">Login</button> */}
                </CardBody>
              </FormControl>
            </CardBody>
          </form>
        </Flex>
      </Card>
      {/* <div>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div> */}
    </>
  );
};