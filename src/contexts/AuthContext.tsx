import { SignupPage } from "../components/SignupPage/SignupPage";
import { LoginPage } from "../components/LoginPage/LoginPage";
import { createContext, useContext, useState } from "react";
import AlertContext, { AlertContextProps } from "./AlertContext";

type User = {
  user_id: string;
  user_email?: string;
  phone_no?: string;
  auth_token?: string;
};

export type AuthContextProps = {
  currentUser: User | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, otp: string) => void;
  generateOtp: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

/**
 * Authentication Provider
 * This component maintains the currentuser state
 * This state can be accesed using the useContext(AuthContext)
 * @returns
 *
 * @example
 * In an any component this code can be used to access the currentUser state and modify it using the various functions
 * ```tsx
 * import AuthContext from "./AuthContext"
 * const {currentUser,login,signup,logout} = useContext(AuthContext)
 * ```
 *
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const {sendAlert} = useContext(AlertContext) as AlertContextProps
  //can return success message or promise if needed
  //pass one more parameter to verify if mobile / email login and change logic accordingly
  const login = async (email: string, password: string): Promise<void> => {
    const formData = new FormData();
    formData.append("user_email", email);
    formData.append("password", password);
    try {
      //try login
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {},
        body: formData,
    }).then((result):void => {
      result.json().then((res)=>{
        if (res.output == "fail") {
          sendAlert({ message: res.msg as string, type: "error" })
          return;
        }
        console.log(res.user)
        setCurrentUser(res.user)
      })
      })
      
    } catch (err) {
      // send error message to user
      console.log(err);
    }
  };
  const signup = async (email: string, password: string, otp: string): Promise<void> => {
    const formData = new FormData();
    formData.append("user_email", email);
    formData.append("password", password);
    formData.append("otp",otp)
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {},
        body: formData,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const generateOtp = async (email: string): Promise<void> => {
    const formData = new FormData();
    formData.append("user_email", email);
    try {
      const res = await fetch("http://localhost:3000/generateOtp", {
        method: "POST",
        headers: {},
        body: formData,
      });
      console.log(res.json());
    } catch (err) {
      console.log(err);
    }
  };
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, signup, logout, generateOtp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
