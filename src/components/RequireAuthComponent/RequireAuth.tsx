/**
 * This RequireAuth component manages route authentication, redirecting users based on their authentication status
 * and displaying alert messages using context.
 *
 * @component
 * @example
 * // Basic usage
 * <RequireAuth>
 *   <ProtectedRoute />
 * </RequireAuth>
 *
 * @param {Object} props - The props for the RequireAuth component.
 * @param {JSX.Element} props.children - The child component to be rendered if the user meets the authentication requirements.
 * @param {boolean} [props.requireAuth=true] - The flag indicating whether the user is required to be authenticated or not.
 *
 * @returns {JSX.Element} The rendered RequireAuth component.
 */

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
