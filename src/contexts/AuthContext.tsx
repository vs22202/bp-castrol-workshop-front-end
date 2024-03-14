import { createContext, useContext, useState } from "react";
import AlertContext, { AlertContextProps } from "./AlertContext";

type User = {
  user_id: string;
  user_email?: string;
  user_mobile?: string;
  auth_token?: string;
};

export type AuthContextProps = {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<string>;
  loginMobile: (mobile_no: string, password: string) => Promise<string>;
  signup: (email: string, password: string, otp: string) => Promise<string>;
  signupMobile: (
    mobile_no: string,
    password: string,
    otp: string
  ) => Promise<string>;
  generateOtp: (email: string) => void;
  generateOtpMobile: (mobile_no: string) => void;
  changePassword: (password: string, old_password: string) => Promise<string>;
  generateResetOtp: (email?: string, mobile?: string) => void;
  resetPassword: (password: string, otp: string, email?: string, mobile?: string) => Promise<string>;
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
  const checkUserAuth = () => {
    const user = window.localStorage.getItem("user");
    if (user != null) {
      return JSON.parse(user) as User;
    }
    return user;
  };
  const [currentUser, setCurrentUser] = useState<User | null>(checkUserAuth());
  const { sendAlert } = useContext(AlertContext) as AlertContextProps;
  //can return success message or promise if needed
  //pass one more parameter to verify if mobile / email login and change logic accordingly
  const loginWithToken = async (): Promise<string> => {
    const result = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        Authorization: currentUser?.auth_token as string,
      },
    });
    const res = await result.json();
    if (res.output == "fail") {
      setCurrentUser(null);
      window.localStorage.removeItem("user");
      return "failure";
    }
    return "success";
  };
  const login = async (email: string, password: string): Promise<string> => {
    if (currentUser) return loginWithToken();

    const formData = new FormData();
    formData.append("user_email", email);
    formData.append("password", password);
    try {
      //try login
      const result = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {},
        body: formData,
      });
      const res = await result.json();
      if (res.output == "fail") {
        sendAlert({ message: res.msg as string, type: "error" });
        return "failure";
      }
      setCurrentUser({ auth_token: res.auth_token, ...res.user });
      window.localStorage.setItem(
        "user",
        JSON.stringify({ auth_token: res.auth_token, ...res.user })
      );
      sendAlert({ message: "Logged In Successfully", type: "success" });
      return "success";
    } catch (err) {
      // send error message to user
      console.log(err);
      return "failure";
    }
  };
  const loginMobile = async (
    mobile_no: string,
    password: string
  ): Promise<string> => {
    if (currentUser) return loginWithToken();

    const formData = new FormData();
    formData.append("user_mobile", mobile_no);
    formData.append("password", password);
    try {
      //try login
      const result = await fetch("http://localhost:3000/login/mobile", {
        method: "POST",
        headers: {},
        body: formData,
      });
      const res = await result.json();
      if (res.output == "fail") {
        sendAlert({ message: res.msg as string, type: "error" });
        return "failure";
      }
      setCurrentUser({ auth_token: res.auth_token, ...res.user });
      window.localStorage.setItem(
        "user",
        JSON.stringify({ auth_token: res.auth_token, ...res.user })
      );
      sendAlert({ message: "Logged In Successfully", type: "success" });
      return "success";
    } catch (err) {
      // send error message to user
      console.log(err);
      return "failure";
    }
  };
  const signup = async (
    email: string,
    password: string,
    otp: string
  ): Promise<string> => {
    const formData = new FormData();
    formData.append("user_email", email);
    formData.append("password", password);
    formData.append("otp", otp);
    try {
      const result = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {},
        body: formData,
      });
      const res = await result.json();
      if (res.output == "fail") {
        sendAlert({ message: res.msg as string, type: "error" });
        return "failure";
      }
      return "success";
    } catch (err) {
      console.log(err);
      return "failure";
    }
  };
  const signupMobile = async (
    mobile_no: string,
    password: string,
    otp: string
  ): Promise<string> => {
    const formData = new FormData();
    formData.append("user_mobile", mobile_no);
    formData.append("password", password);
    formData.append("otp", otp);
    try {
      const result = await fetch("http://localhost:3000/register/mobile", {
        method: "POST",
        headers: {},
        body: formData,
      });
      const res = await result.json();
      if (res.output == "fail") {
        sendAlert({ message: res.msg as string, type: "error" });
        return "failure";
      }
      return "success";
    } catch (err) {
      console.log(err);
      return "failure";
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
    window.localStorage.removeItem("user");
    setCurrentUser(null);
    sendAlert({ message: "Logged Out Successfully", type: "success" });
  };
  const generateOtpMobile = async (mobile_no: string): Promise<void> => {
    const formData = new FormData();
    formData.append("user_mobile", mobile_no);
    try {
      const res = await fetch("http://localhost:3000/generateOtp/mobile", {
        method: "POST",
        headers: {},
        body: formData,
      });
      console.log(res.json());
    } catch (err) {
      console.log(err);
    }
  };
  const changePassword = async (
    password: string,
    old_password: string
  ): Promise<string> => {
    const formData = new FormData();
    formData.append("new_password", password);
    formData.append("old_password", old_password);
    try {
      const res = await fetch("http://localhost:3000/user/changepassword", {
        method: "POST",
        headers: {
          Authorization: currentUser?.auth_token as string,
        },
        body: formData,
      });
      const result = await res.json();
      if (result.output == "fail") {
        sendAlert({ message: result.msg as string, type: "error" });
        return "failure";
      }
      sendAlert({ message: "Password Changed Successfully", type: "success" });
      return "success";
    } catch (err) {
      console.log(err);
      return "failure";
    }
  };
  const generateResetOtp = async (
    email?: string,
    mobile?: string
  ): Promise<void> => {
    let formData = new FormData();
    let message = "";
    if (email) {
      formData.append("user_email", email);
      message = "OTP sent to email";
    } else if (mobile) {
      formData.append("user_mobile", mobile);
      message = "OTP sent to mobile number";
    } else {
      sendAlert({
        message: "Please provide either email or mobile number",
        type: "error",
      });
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/user/generateResetOtp", {
        method: "POST",
        headers: {},
        body: formData,
      });
      const result = await res.json();
      if (result.output == "fail") {
        sendAlert({ message: result.msg, type: "error" });
        return;
      }
      sendAlert({ message, type: "success" });
    } catch (err) {
      console.log(err);
    }
  };
  const resetPassword = async (
    password: string,
    otp: string,
    email?: string,
    mobile?: string
  ): Promise<string> => {
    let formData = new FormData();
    if (email) {
      formData.append("user_email", email);
    } else if (mobile) {
      formData.append("user_mobile", mobile);
    } else {
      sendAlert({
        message: "Please provide either email or mobile number",
        type: "error",
      });
      return "failure";
    }
    formData.append("password", password);
    formData.append("otp", otp);
    try {
      const res = await fetch("http://localhost:3000/user/resetPassword", {
        method: "POST",
        headers: {},
        body: formData,
      });
      const result = await res.json();
      if(result.output == "fail"){
        sendAlert({message:result.msg,type:"error"})
        return "failure"
      }
      sendAlert({message:"Password Reset Successfully",type:"success"})
      return "success"
    } catch (err) {
      console.log(err);
      return "failure"
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        loginMobile,
        signup,
        signupMobile,
        logout,
        generateOtp,
        generateOtpMobile,
        changePassword,
        generateResetOtp,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
