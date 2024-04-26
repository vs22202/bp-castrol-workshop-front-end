import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/**
 * LogoutPage component handles the logout functionality.
 * It retrieves the logout function from the AuthContext and triggers it.
 * After logout, it redirects the user to the home page.
 */

const LogoutPage: React.FC = () => {
  const { logout } = useContext(AuthContext) as AuthContextProps;
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/", { replace: true });
  }, []);
  return <></>;
};
export default LogoutPage;
