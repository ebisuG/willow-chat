import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }>
    = ({ children }) => {
        const isAuth = useAuth()?.user?.isAuth;
        if (!isAuth) {
            // user is not authenticated
            return <Navigate to="/chat" />;
        }
        return children;
    };