import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext, { AlertContextProps } from "../../contexts/AlertContext";


const PageNotFound: React.FC = () => {
const { sendAlert } = useContext(AlertContext) as AlertContextProps;
  const navigate = useNavigate();
  useEffect(() => {
      sendAlert({ message: "That route does not exist", type: "error" });
    navigate("/", { replace: true });
  }, []);
  return <></>;
};
export default PageNotFound;
