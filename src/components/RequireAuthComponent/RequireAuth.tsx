import AlertContext, { AlertContextProps } from "../../contexts/AlertContext";
import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function RequireAuth({
  children,
  requireAuth = true,
}: {
  children: JSX.Element;
  requireAuth?: boolean;
}) {
  const { currentUser } = useContext(AuthContext) as AuthContextProps;
  const { sendAlert } = useContext(AlertContext) as AlertContextProps;
  let location = useLocation();
  if (requireAuth) {
    if (!currentUser) {
      sendAlert({
        message: "You need to login before you apply",
        type: "error",
      });
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  } else {
    if (currentUser) {
      sendAlert({
        message: "You are already logged in",
        type: "error",
      });
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }

  return children;
}
