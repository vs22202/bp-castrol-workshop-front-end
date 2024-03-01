import { SignupPage } from "../components/SignupPage/SignupPage";
import { LoginPage } from "../components/LoginPage/LoginPage";
import { createContext, useState } from "react";

type User = {
  id: string;
  email?: string;
  phone_no?: string;
  auth_token?: string;
};

type AuthContextProps = {
  currentUser: User | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
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

  //can return success message or promise if needed
  //pass one more parameter to verify if mobile / email login and change logic accordingly
  const login = (email: string, password: string): void => {
    try {
      //try login
      console.log(email);
      console.log(password);
      setCurrentUser({ id: "1" });
    } catch (err) {
      // send error message to user
      console.log(err);
    }
  };
  const signup = (email: string, password: string): void => {};
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
