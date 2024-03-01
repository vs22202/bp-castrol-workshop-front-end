import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
