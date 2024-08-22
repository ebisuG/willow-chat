import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import type { authInfo, authContext } from "../types/types";
const AuthContext = createContext<authContext|null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (data: authInfo) => {
        setUser(data);
        navigate("/chat");
    };

    // call this function to sign out logged in user
    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    const value = useMemo<authContext>(
        () => ({
            user,
            login,
            logout,
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    console.log(AuthProvider)
    return useContext(AuthContext);
};