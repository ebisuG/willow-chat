import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }>
    = ({ children }) => {
        const isAuth = useAuth()?.user?.isAuth;
        console.log(isAuth)
        if (!isAuth) {
            return <Navigate to="/" />;
        }
        return children;
    };