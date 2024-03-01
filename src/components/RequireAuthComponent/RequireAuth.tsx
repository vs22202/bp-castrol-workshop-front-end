import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function RequireAuth({ children, requireAuth=true }: { children: JSX.Element,requireAuth?:boolean }) {
    const { currentUser } = useContext(AuthContext) as AuthContextProps
    let location = useLocation();
    if (requireAuth) {
        if (!currentUser) {
          return <Navigate to="/login" state={{ from: location }} replace />;
        }
    }
    else {
        if (currentUser) {
            return <Navigate to="/" state={{ from: location }} replace />;
        }
    }
  
    return children;
  }