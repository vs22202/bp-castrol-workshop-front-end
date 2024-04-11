// LoginFormWithImage.tsx

import React, { useContext, useState } from "react";
import { Button } from "../../components/ButtonComponent/Button";
import LoginImg from "../../assets/login.svg";
import inputs from "./LoginPageFields";
import styles from "./LoginPage.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { renderInput } from "../../components/FormFieldRenderLogic";
import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import { useScreenSize } from "../../components/ScreenSizeLogic";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * `LoginPage` Page
 *
 * Renders a login page where users can enter their email and password to log into the Castrol Community.
 * The page provides a welcoming interface with a login form and the option to sign up for new users.
 * It includes form validation, dynamic error feedback, and responsiveness for an optimal user experience.
 *
 * @category Pages
 * @returns The rendered `LoginPage` component as a `JSX.Element`.
 *
 *
 * ## Features
 * - **Dynamic Form Fields**: The login form dynamically adapts to varying screen sizes and includes fields for user email, password, and a "Remember me" checkbox.
 * - **Form Validation**: Utilizes React Hook Form for robust form validation, providing real-time error feedback to enhance user experience.
 * - **Responsive Design**: The component is designed to be responsive, ensuring a seamless user experience across different devices and screen sizes.
 * - **User Authentication**: Supports user authentication by utilizing the `login` function from the `AuthContext`.
 * - **Loading State**: Displays a loading state while the login process is in progress to provide visual feedback to the user.
 * - **Navigation**: Allows users to navigate to the signup page for new registrations.
 *
 * ## Form Fields
 * The login form includes the following fields:
 * - `user_email_id`: User's email address (required).
 * - `user_password`: User's password (required).
 * - `remember_me?`: Checkbox for remembering the user's login state.
 *
 * @example
 * ```tsx
 * <LoginPage />
 * ```
 *
 * ## Props
 * - None
 *
 * Whether users are returning to the Castrol Community or signing in for the first time,
 * the `LoginPage` page provides a user-friendly interface for a smooth login experience.
 */

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const { login ,loginMobile} = useContext(AuthContext) as AuthContextProps;
  const inputSize = useScreenSize();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [phoneLogin, setPhoneLogin] = useState<boolean>(location.state?.phoneLogin || false);
  const from = location.state?.from?.pathname || "/";

  inputs[0].type = !phoneLogin ? "text" : "hidden";
  inputs[0].text_type = !phoneLogin ? "text" : "hidden";
  inputs[0].required = !phoneLogin;
  inputs[1].type = phoneLogin ? "text" : "hidden";
  inputs[1].text_type = phoneLogin ? "text" : "hidden";
  inputs[1].required = phoneLogin;
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
    let result = "";
    if (phoneLogin) {
      result = await(loginMobile(data.user_mobile, data.user_password))
    }
    else {result = await login(data.user_email_id, data.user_password); }
    setLoading(false);
    if (result == "success") navigate(from, { replace: true });
  };

  return (
    <>
      <div
        className={`${styles.logincontainer} ${
          loading ? styles.loadingState : ""
        }`}
      >
        <div className={`${styles.imagecontainer} illustration`}>
          <LoginImg />
        </div>
        <div className={`${styles.loginform}`}>
          <form
            onSubmit={handleSubmit(handleLogin)}
            onChange={handleInputChange}
            data-testid="LoginForm"
          >
            <h1>Login</h1>
            <h2>Welcome back to the Castrol Community!</h2>
            <p
              className={styles.loginOptionToggler}
              onClick={() => setPhoneLogin((s) => !s)}
            >
              {!phoneLogin
                ? "Login using phone instead?"
                : "Login using email instead?"}
            </p>
            <div className={styles.inputFieldsContainer}>
            {inputs.map((input) => renderInput(input, { register, errors }))}
              <p className={`${styles.loginOptionToggler} ${styles.forgotPassword}`} onClick={() => { navigate("/resetPassword", { replace: true }); }}>forgot password?</p>
            </div>
            <div className={`${styles.buttonscontainer}`}>
              <Button
                text="Login"
                size={
                  inputSize === "small"
                    ? "sm"
                    : inputSize === "medium"
                    ? "md"
                    : "lg"
                }
                type="solid"
                iconimg="login_icon"
                action="submit"
                datatestid="LoginPageLoginBtn"
              />
              <span>or</span>
              <span>New to Castrol?</span>
              <Button
                text="Sign Up"
                size={
                  inputSize === "small"
                    ? "sm"
                    : inputSize === "medium"
                    ? "md"
                    : "lg"
                }
                type="outline"
                iconimg="signup_icon"
                datatestid="LoginPageSignupBtn"
                onClick={handleSignup}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { LoginPage };
