import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext, { AlertContextProps } from "../../contexts/AlertContext";

export type PageNotFoundProps = {
  backendStatus?:boolean
}
const PageNotFound = ({backendStatus} :PageNotFoundProps) => {
const { sendAlert } = useContext(AlertContext) as AlertContextProps;
  const navigate = useNavigate();
  useEffect(() => {
    let message = "That route does not exist"
    if (backendStatus != undefined) {
      message ="Please wait until system resources are up."
    }
    sendAlert({ message: message, type: "error" });
    navigate("/", { replace: true });
  }, []);
  return <></>;
};
export default PageNotFound;
