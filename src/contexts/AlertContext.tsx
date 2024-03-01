import { createContext, useState } from "react";

export type Alert = {
  type: "success" | "error" | "info" | "warning";
  message: string;
};

export type AlertContextProps = {
  alert: Alert | null;
  sendAlert: (alert: Alert) => void;
};

const AlertContext = createContext<AlertContextProps | null>(null);

/**
 * Alert display
 * This component maintains the alerts needed to display to user across pages & components
 * This state can be accesed using the useContext(AlertContext)
 * @returns
 *
 * @example
 * In an any component this code can be used to display using the below code
 * ```tsx
 * import AlertContext ,{Alert} from "./AlertContext"
 * const { sendAlert } = useContext(AlertContext) as AlertContextProps;
 *
 * //Ideally inside some event handler
 * sendAlert({type:"error",message: "Your login failed"});
 * ```
 *
 */
export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<Alert | null>(null);

  //can return success message or promise if needed
  //pass one more parameter to verify if mobile / email login and change logic accordingly
  const sendAlert = (alert: Alert): void => {
    setAlert(alert);
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <AlertContext.Provider value={{ alert, sendAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
export default AlertContext;
