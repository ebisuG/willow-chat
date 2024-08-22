import Chat from "../Chat";
import { useAuth } from "../hooks/useAuth";

export const Secret = () => {
  const  logout  = useAuth()?.logout;
  if(logout===undefined){
    throw Error("Failed to log out")
  }

  const handleLogout = () => {
    logout();
    console.log("logout button is pressed", logout)
  };

  return (
    <div>
      <h1>This is a Secret page</h1>
      <button onClick={handleLogout}>Logout</button>
      <Chat></Chat>
    </div>
  );
};