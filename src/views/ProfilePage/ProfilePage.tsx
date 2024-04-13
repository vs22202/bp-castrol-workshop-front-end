// LoginFormWithImage.tsx

import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../components/ButtonComponent/Button";
import ProfileImg from "../../assets/profile_illustration.svg";
import inputs from "./ProfilePageFields";
import styles from "./ProfilePage.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { renderInput } from "../../components/FormFieldRenderLogic";
import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import AlertContext, { AlertContextProps } from "../../contexts/AlertContext";
import { useScreenSize } from "../../components/ScreenSizeLogic";
import { useNavigate } from "react-router-dom";
import { SvgIcon } from "../../components/IconComponent/SvgIcon";

/**
 * `ProfilePage` Page
 *
 * Renders a profile page where users can view and edit their profile information.
 * The page includes a form for users to change their password and displays user details such as email or mobile number.
 * It provides a user-friendly interface with form validation, dynamic error feedback, and responsiveness for an optimal user experience.
 *
 * @category Pages
 * @returns The rendered `ProfilePage` component as a `JSX.Element`.
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
 * The profile page form includes the following fields:
 * - `user_email_id`: User's email address (required).
 * - `user_mobile`: User's mobile number (required).
 * - `user_password`: User's new password (required, 10-100 characters with special characters, numbers, and capital letters).
 * - `user_old_password`: User's old password (required for password change).
 *
 * @example
 * ```tsx
 * <ProfilePage />
 * ```
 *
 * ## Props
 * - None
 *
 */

const ProfilePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    trigger,
    setValue,
  } = useForm();
  const { changePassword, currentUser } = useContext(
    AuthContext
  ) as AuthContextProps;
  const { sendAlert } = useContext(AlertContext) as AlertContextProps;
  const inputSize = useScreenSize();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [phoneReset, setPhoneReset] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"new" | "edit">("new");

  inputs[0].type = !phoneReset ? "text" : "hidden";
  inputs[0].text_type = !phoneReset ? "text" : "hidden";
  inputs[0].required = !phoneReset;
  inputs[1].type = phoneReset ? "text" : "hidden";
  inputs[1].text_type = phoneReset ? "text" : "hidden";
  inputs[1].required = phoneReset;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetch(
        `${
          process.env.VITE_BACKEND_URL || "http://localhost:3000"
        }/user/`,
        {
          headers: {
            Authorization: currentUser?.auth_token as string,
          },
        }
      );
      const res = await result.json();
      return res;
    };
    fetchData().then((res) => {
      if (res.output == "success") {
        if (res.result.user_mobile != null) {
          if (phoneReset == false) setPhoneReset(true);
          setTimeout(() => {
            setValue("user_mobile", res.result.user_mobile);
          }, 500);
        } else {
          if (phoneReset == true) setPhoneReset(false);
          setValue("user_email_id", res.result.user_email);
        }
      } else if (res.output === "error" || res.output === "fail") {
        sendAlert({ message: res.msg as string, type: "error" });
        navigate("/"); // Redirect to home page or handle as per your application flow
      }
      setFormMode("edit");
      setLoading(false);
    });
  }, []);
  //triggers validation as soon as the input is given
  const handleInputChange = async (e: any) => {
    const name = e.target.name;
    await trigger(name);
  };

  //Handles Change Password Button click
  const handleReset: SubmitHandler<Record<string, any>> = async (data) => {
    if (data.user_confirm_password != data.user_password) {
      setError('user_confirm_password', { type: 'custom', message: 'New passwords do not match' });
      return;
    }
    setLoading(true);
    let result = "";
    result = await changePassword(data.user_password, data.user_old_password);
    setLoading(false);
    if (result == "success") navigate("/", { replace: true });
  };

  return (
    <>
      <div
        className={`${styles.logincontainer} ${
          loading ? styles.loadingState : ""
        }`}
      >
        <div className={`${styles.imagecontainer} illustration`}>
          <ProfileImg />
        </div>
        <div className={`${styles.loginform}`}>
          <form
            onSubmit={handleSubmit(handleReset)}
            onChange={handleInputChange}
            data-testid="ResetForm"
            name="ProfilePageForm"
          >
            <h1>
              <SvgIcon iconName="user_profile" />
              <span>Profile</span>
            </h1>
            <h2>Thank you for being part of our Castrol Community!</h2>
            {inputs.map((input) => {
              if (
                input.name === "user_email_id" ||
                input.name === "user_mobile"
              ) {
                return renderInput(input, {
                  register,
                  errors,
                  watch,
                  formMode,
                });
              }
              return renderInput(input, { register, errors, watch });
            })}
            <div className={`${styles.buttonscontainer}`}>
              <Button
                text="Change Password"
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
    </>
  );
};

export default ProfilePage;
