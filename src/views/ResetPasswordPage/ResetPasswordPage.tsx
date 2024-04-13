import React, { useContext, useEffect, useState } from "react";
import { InputField } from "../../components/InputFieldComponent/InputField";
import { Button } from "../../components/ButtonComponent/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { renderInput } from "../../components/FormFieldRenderLogic";
import inputs, { checkboxInputs } from "./ResetPasswordPageFields";
import ResetImg from "../../assets/reset_illustration.svg";
import styles from "./ResetPasswordPage.module.css";
import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useScreenSize } from "../../components/ScreenSizeLogic";

/**
 * `ResetPasswordPage` Page
 *
 * Renders a reset page for users to reset their password.
 * The page includes a reset password form with dynamic validations, OTP generation, and user-friendly interactions.
 * @category Page
 * @returns The rendered `ResetPasswordPage` component as a `JSX.Element`.
 *
 *
 * ## Features
 * - **Dynamic Form Fields**: The reset password form adapts to different screen sizes and includes fields for user email, mobile number, password, password confirmation, and OTP.
 * - **Form Validation**: Utilizes React Hook Form for form validation, providing real-time error feedback and ensuring data integrity.
 * - **OTP Generation**: Allows users to request and receive a one-time password (OTP) for secure password reset.
 * - **Loading State**: Displays a loading state while the password reset process is in progress to provide visual feedback to the user.
 * - **Alerts**: Utilizes the `AuthContext` to handle password reset requests and display success messages upon successful password reset.
 * - **Responsive Design**: The component is designed to be responsive, ensuring a seamless user experience across different devices and screen sizes.
 *
 * ## Form Fields
 * The reset password form includes the following fields:
 * - `user_email_id`: User's email address (required, valid email format).
 * - `user_mobile`: User's mobile no. (required, valid mobile no. format).
 * - `user_password`: User's password (required, 10-100 characters with special characters, numbers, and capital letters).
 * - `user_password_confirm`: Confirmation of the user's password (required, matches the entered password).
 * - `otp`: One-time password for account verification (required, 6 digits).
 *
 * @example
 * ```tsx
 * <ResetPasswordPage />
 * ```
 */

const ResetPasswordPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm();
  const { generateResetOtp, resetPassword } = useContext(
    AuthContext
  ) as AuthContextProps;
  const [otpActivated, setOtpActivated] = useState(false);
  const [isAllFieldsValid, setIsAllFieldsValid] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState("02:00");
  const [loading, setLoading] = useState(false);
  const [phoneReset, setPhoneReset] = useState<boolean>(false);
  const navigate = useNavigate();

  inputs[0].type = !phoneReset ? "text" : "hidden";
  inputs[0].text_type = !phoneReset ? "text" : "hidden";
  inputs[0].required = !phoneReset;
  inputs[1].type = phoneReset ? "text" : "hidden";
  inputs[1].text_type = phoneReset ? "text" : "hidden";
  inputs[1].required = phoneReset;

  const email = watch("user_email_id");
  const mobile = watch("user_mobile");
  const pass = watch("user_password");
  const confirmpass = watch("user_password_confirm");
  const inputSize = useScreenSize();

  useEffect(() => {
    // if all three fields are filled and valid, enables GET OTP button
    console.log(errors);
    if (
      (email || mobile) &&
      pass &&
      confirmpass &&
      Object.keys(errors).length === 0 &&
      pass === confirmpass
    ) {
      setIsAllFieldsValid(true);
    } else {
      setIsAllFieldsValid(false);
    }
  }, [email, mobile, pass, confirmpass, errors]);

  //Handles all three buttons
  //Get OTP Button
  async function getOtp(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    setOtpSent(true);
    startOtpTimer();
    if (phoneReset) {
      generateResetOtp(undefined, watch("user_mobile"));
    } else {
      generateResetOtp(watch("user_email_id"));
    }
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

  //Handles Reset Password Button
  const handleResetPassword: SubmitHandler<Record<string, any>> = async (
    data,
    event
  ) => {
    event?.preventDefault();
    setLoading(true);
    let result = "";
    if (phoneReset) {
      result = await resetPassword(
        data.user_password,
        data.otp,
        undefined,
        data.user_mobile
      );
    } else {
      result = await resetPassword(
        data.user_password,
        data.otp,
        data.user_email_id
      );
    }
    setLoading(false);
    if (result == "success") {
      navigate("/login", { replace: true, state: { phoneLogin: phoneReset } });
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
        <ResetImg />
      </div>
      <div className={`${styles.signupform}`}>
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          onChange={handleInputChange}
          data-testid="ResetPasswordForm"
          name="ResetPasswordForm"
        >
          <h1>Reset Password</h1>
          <h2>Enter the six digit OTP to reset your password. </h2>
          <p
            className={styles.loginOptionToggler}
            onClick={() => setPhoneReset((s) => !s)}
          >
            {!phoneReset
              ? "send OTP to mobile number instead?"
              : "send OTP to email instead?"}
          </p>
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
              />
            )}
          </div>
          {checkboxInputs.map((input) =>
            renderInput(input, { register, errors })
          )}
          <div className={`${styles.buttonscontainer}`}>
            <Button
              text="Reset Password"
              size={
                inputSize === "small"
                  ? "sm"
                  : inputSize === "medium"
                  ? "md"
                  : "lg"
              }
              type="solid"
              action="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
