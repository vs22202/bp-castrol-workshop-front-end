import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext, { AlertContextProps } from "../../contexts/AlertContext";

/**
 * PageNotFound component renders when a page route is not found.
 * It displays an error message to the user and redirects them to the home page.
 * Optionally, it can display a different message when a backend status is provided.
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} [props.backendStatus] - Indicates if there is a backend status affecting the page.
 * @returns {JSX.Element} The rendered PageNotFound component.
 */

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
