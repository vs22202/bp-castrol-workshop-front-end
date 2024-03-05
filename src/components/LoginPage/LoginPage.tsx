// LoginFormWithImage.tsx

import React, { useContext, useState } from "react";
import { Button } from "../ButtonComponent/Button";
import LoginImg from "../../assets/login.svg";
import inputs from "./LoginPageFields";
import styles from "./LoginPage.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { renderInput } from "../FormFieldRenderLogic";
import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import { useScreenSize } from "../ScreenSizeLogic";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const { login } = useContext(AuthContext) as AuthContextProps;
  const inputSize = useScreenSize();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const from = location.state?.from?.pathname || "/";

  //triggers validation as soon as the input is given
  const handleInputChange = async (e: any) => {
    const name = e.target.name;
    await trigger(name);
  };

  //HandlesSignup Button click
  const handleSignup = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    navigate("/signup", { replace: true });
  };

  //Handles Login Button click
  const handleLogin: SubmitHandler<Record<string, any>> = async (data) => {
    setLoading(true);
    const result = await login(data.user_email_id, data.user_password);
    setLoading(false);
    if (result == "success") navigate(from, { replace: true });
    
  };

  return (
    <>
      <div className={`${styles.logincontainer} ${loading ? styles.loadingState:""}`}>
        <div className={`${styles.imagecontainer} illustration`}>
          <LoginImg />
        </div>
        <div className={`${styles.loginform}`}>
          <div className="formContainer">
            <form
              onSubmit={handleSubmit(handleLogin)}
              onChange={handleInputChange}
              data-testid = "LoginForm"
            >
              <h1
                style={{
                  color: "rgba(0, 153, 0, 1)",
                  fontSize: "28px",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Login
              </h1>
              <h2
                style={{
                  color: "rgba(102, 102, 102, 1)",
                  fontSize: "20px",
                  textAlign: "left",
                }}
              >
                Welcome back to the Castrol Community!
              </h2>
              {inputs.map((input) => renderInput(input, { register, errors }))}
              <div className={`${styles.buttonscontainer}`}>
                <Button
                  text="Login"
                  size={inputSize==="small" ? "sm" : inputSize==="medium" ? "md" : "lg"}
                  type="solid"
                  iconimg="login_icon"
                  action="submit"
                  datatestid="LoginPageLoginBtn"
                />
                <span>or</span>
                <span>New to Castrol?</span>
                <Button
                  text="SignUp"
                  size={inputSize==="small" ? "sm" : inputSize==="medium" ? "md" : "lg"}
                  type="outline"
                  iconimg="signup_icon"
                  datatestid="LoginPageSignupBtn"
                  onClick={handleSignup}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export { LoginPage };
