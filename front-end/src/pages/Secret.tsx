import { Button } from "@chakra-ui/react";
import Chat from "../components/Chat";
import { useAuth } from "../hooks/useAuth";


export const Secret = () => {
  const  logout  = useAuth()?.logout;
  if(logout===undefined){
    throw Error("Failed to log out")
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
      <Chat></Chat>
    </div>
  );
};