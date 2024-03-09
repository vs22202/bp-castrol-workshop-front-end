import React, { useContext, useEffect, useState } from "react";
import { InputField } from "../../components/InputFieldComponent/InputField";
import { Button } from "../../components/ButtonComponent/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { renderInput } from "../../components/FormFieldRenderLogic";
import inputs from "./SignupPageFields";
import SignupImg from "../../assets/signup.svg";
import styles from "./SignupPage.module.css";
import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AlertContext, { AlertContextProps } from "../../contexts/AlertContext";
import { useScreenSize } from "../../components/ScreenSizeLogic";

/**
 * `SignupPage` Page
 *
 * Renders a signup page for users to join the Castrol Community and elevate their workshop experience.
 * The page includes a signup form with dynamic validations, OTP generation, and user-friendly interactions.
 *
 * @category Page
 * @returns The rendered `SignupPage` component as a `JSX.Element`.
 *
 *
 * ## Features
 * - **Dynamic Form Fields**: The signup form adapts to different screen sizes and includes fields for user email, password, password confirmation, and OTP.
 * - **Form Validation**: Utilizes React Hook Form for form validation, providing real-time error feedback and ensuring data integrity.
 * - **OTP Generation**: Allows users to request and receive a one-time password (OTP) for secure account creation.
 * - **Loading State**: Displays a loading state while the signup process is in progress to provide visual feedback to the user.
 * - **Alerts**: Utilizes the `AlertContext` to display success messages upon successful signup.
 * - **Responsive Design**: The component is designed to be responsive, ensuring a seamless user experience across different devices and screen sizes.
 *
 * ## Form Fields
 * The signup form includes the following fields:
 * - `user_email_id`: User's email address (required, valid email format).
 * - `user_password`: User's password (required, 10-100 characters with special characters, numbers, and capital letters).
 * - `user_password_confirm`: Confirmation of the user's password (required, matches the entered password).
 * - `otp`: One-time password for account verification (required, 6 digits).
 *
 * @example
 * ```tsx
 * <SignupPage />
 * ```
 *
 * ## Props
 * - None
 *
 *
 * Whether users are setting up their workshop for the first time or returning to the Castrol Community,
 * the `SignupPage` offers a smooth and secure signup process.
 */

const SignupPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm();
  const { signup, generateOtp } = useContext(AuthContext) as AuthContextProps;
  const [otpActivated, setOtpActivated] = useState(false);
  const { sendAlert } = useContext(AlertContext) as AlertContextProps;
  const [isAllFieldsValid, setIsAllFieldsValid] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState("02:00");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = watch("user_email_id");
  const pass = watch("user_password");
  const confirmpass = watch("user_password_confirm");
  const inputSize = useScreenSize();

  useEffect(() => {
    // if all three fields are filled and valid, enables GET OTP button
    console.log(errors);
    if (
      email &&
      pass &&
      confirmpass &&
      Object.keys(errors).length === 0 &&
      pass === confirmpass
    ) {
      setIsAllFieldsValid(true);
    } else {
      setIsAllFieldsValid(false);
    }
  }, [email, pass, confirmpass, errors]);

  //Handles all three buttons
  //Get OTP Button
  async function getOtp(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    setOtpSent(true);
    startOtpTimer();

    generateOtp(watch("user_email_id"));
    setOtpActivated(true);
  }

  //for otp button timer
  const startOtpTimer = () => {
    let seconds = 120; // 2 minutes = 120 seconds

    const interval = setInterval(() => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;

      // Format minutes and seconds with leading zeros if needed
      const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
      const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;

      // Set the formatted timer string
      const timerString = `${formattedMins}:${formattedSecs}`;

      setOtpTimer(timerString);

      if (seconds === 0) {
        clearInterval(interval);
        // Reset OTP sent state and timer when timer reaches 0
        setOtpSent(false);
        setOtpTimer("02:00"); // Reset the timer to initial value
      } else {
        seconds -= 1;
      }
    }, 1000);
  };

  //Login Button
  function handleLogin(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    navigate("/login", { replace: true });
  }
  //Handles Signup Button
  const handleSignup: SubmitHandler<Record<string, any>> = async (
    data,
    event
  ) => {
    event?.preventDefault();
    setLoading(true);
    const result = await signup(
      data.user_email_id,
      data.user_password,
      data.otp
    );
    setLoading(false);
    if (result == "success") {
      sendAlert({
        message: "SignUp was successful",
        type: "success",
      });
      navigate("/login", { replace: true });
    }
  };

  //triggers validation as soon as input is given
  const handleInputChange = async (e: any) => {
    const name = e.target.name;
    await trigger(name);
  };

  return (
    <div
      className={`${styles.signupcontainer} ${
        loading ? styles.loadingState : ""
      }`}
    >
      <div className={`${styles.imagecontainer} illustration`}>
        <SignupImg />
      </div>
      <div className={`${styles.signupform}`}>
        <form
          onSubmit={handleSubmit(handleSignup)}
          onChange={handleInputChange}
          data-testid="SignupForm"
        >
          <h1>SignUp</h1>
          <h2>
            Join the Castrol Community and take your workshop to the next level!
          </h2>
          {inputs.map((input) => renderInput(input, { register, errors }))}

          {/* this div will be rendered here itself */}
          <div className={styles.otpContainer}>
            <InputField
              type="text"
              name="otp"
              label="OTP"
              size={inputSize}
              placeholder="Enter OTP"
              maxlen={6}
              //required = {true}
              register={register}
              errors={errors}
              isDisabled={!otpActivated}
              datatestid="signupotp"
              required={true}
              validationSchema={{
                required: true,
                minLength: {
                  value: 6,
                  message: "Enter 6 digit OTP.",
                },
                maxLength: {
                  value: 6,
                  message: "Enter 6 digit OTP.",
                },
              }}
            />
            {!otpSent ? (
              <Button
                text="Get OTP"
                size={
                  inputSize === "small"
                    ? "sm"
                    : inputSize === "medium"
                    ? "md"
                    : "lg"
                }
                type="solid"
                onClick={getOtp}
                disabled={!isAllFieldsValid}
                datatestid="SignupPageOtpBtnActive"
              />
            ) : (
              <Button
                text={`Resend OTP ${otpTimer}`}
                size={
                  inputSize === "small"
                    ? "sm"
                    : inputSize === "medium"
                    ? "md"
                    : "lg"
                }
                type="outline"
                disabled={true}
                datatestid="SignupPageOtpBtnInactive"
              />
            )}
          </div>
          <div className={`${styles.buttonscontainer}`}>
            <Button
              text="SignUp"
              size={
                inputSize === "small"
                  ? "sm"
                  : inputSize === "medium"
                  ? "md"
                  : "lg"
              }
              type="solid"
              iconimg="signup_icon"
              action="submit"
              datatestid="SignupPageSignupBtn"
            />
            <span>or</span>
            <span>Already have an account?</span>
            <Button
              text="Login"
              size={
                inputSize === "small"
                  ? "sm"
                  : inputSize === "medium"
                  ? "md"
                  : "lg"
              }
              type="outline"
              iconimg="login_icon"
              datatestid="SignupPageLoginBtn"
              onClick={handleLogin}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export { SignupPage };
