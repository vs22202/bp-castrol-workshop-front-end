import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


/**
 * @description LogoutPage component handles the logout functionality.
 * It retrieves the logout function from the AuthContext and triggers it.
 * After logout, it redirects the user to the home page.
 * @component
 * @returns {React.FC} Returns the LogoutPage component.
 */

const LogoutPage: React.FC = () => {
  const { logout } = useContext(AuthContext) as AuthContextProps;
  const navigate = useNavigate();

   /**
   * @description Executes logout and redirects to the home page on component mount.
   * @returns {void}
   */
  
  useEffect(() => {
    logout();
    navigate("/", { replace: true });
  }, []);
  return <></>;
};
export default LogoutPage;
