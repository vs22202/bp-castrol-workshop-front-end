import React, { useState } from "react";
import styles from "./InputField.module.css";
import { SvgIcon } from "../IconComponent/SvgIcon";

/** The props type of {@link InputField | `InputField`}. */
export type InputFieldProps = {
  name: string;
  value?: string;
  placeholder?: string;
  label: string;
  //type: "password" | "text" | "disabled";
  type: string; //password, text, disabled
  isDisabled?: boolean;
  //size:"small" | "medium"| "large";
  size: string;
  required?: boolean;
  maxlen?: number;
  register: any;
  validationSchema?: any;
  errors: any;
  customValidation?: any;
  datatestid?:string;
};

/**
 * `InputField` Component
 * 
 * This component is designed to be a versatile input field for forms, supporting various configurations
 * including dynamic type switching (e.g., for password visibility) and extensive validation feedback.
 * It integrates with form validation libraries (like React Hook Form) through the `register`
 * and `validationSchema` props.
 * 
 * ## Features
 * - **Dynamic Type Switching**: Particularly useful for password fields, allowing users to toggle visibility.
 * - **Validation Feedback**: Displays error messages based on the provided `errors` prop, which is expected to
 *   follow a structure similar to what form validation libraries output.
 * - **Floating Label**: Enhances UX by transitioning the label based on the input focus and value state.
 * - **Customizable**: Supports different sizes, disabled state, and required fields, with styling that adapts
 *   to the presence of errors.
 * 
 * @category Component
 * @param props The props for the InputField component.
 * @returns {JSX.Element} The rendered input field component.
 *
 * @example
 * Basic usage with manual error handling:
 * ```tsx
 * <InputField
 *   name="username"
 *   label="Username"
 *   placeholder="Enter your username"
 *   type="text"
 *   size="medium"
 *   register={register}
 *   errors={{ username: { message: "Username is required" } }}
 * />
 * ```
 * 
 * @example
 * Usage with password visibility toggle:
 * ```tsx
 * <InputField
 *   name="password"
 *   label="Password"
 *   placeholder="Enter your password"
 *   type="password"
 *   size="medium"
 *   register={register}
 *   errors={{}}
 * />
 * ```
 * 
 * ## Props
 * 
 * - `name`: The name of the input, used for form submission and validation.
 * - `value`: (Optional) The default value of the input.
 * - `placeholder`: (Optional) The input's placeholder text.
 * - `label`: The floating label text.
 * - `type`: The type of the input (e.g., "text", "password"). Special handling for "password" type.
 * - `isDisabled`: (Optional) If true, the input will be disabled.
 * - `size`: The size of the input, affecting its visual presentation.
 * - `required`: (Optional) If true, the field will be marked as required.
 * - `maxlen`: (Optional) The maximum length of the input value.
 * - `register`: Function from form validation library to register the input for validation.
 * - `validationSchema`: (Optional) Schema used for validation (compatible with form validation libraries).
 * - `errors`: Object containing validation errors, where each key corresponds to an input name.
 * - `customValidation`: (Optional) Additional custom validation logic.
 * - `datatestid`: (Optional) For unit testing of the component and the pages it is used in.
 */

export function InputField({
  name,
  label,
  placeholder,
  value,
  type,
  isDisabled = false,
  size,
  required = false,
  maxlen,
  register,
  validationSchema,
  errors,
  datatestid,
}: InputFieldProps) {
  const [inputValue, setInputValue] = useState(value);
  const [inputType, setInputType] = useState(type);
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const inputfieldRegister = register(name, validationSchema);
  const iconsize = size === "small" ? "sm" : size === "medium" ? "md" : "lg";
  const labelsize = "label" + size;
  const [passIconName, setPassIconName] = useState("eye-slash");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    value = inputValue;
  };

  const togglefield = () => {
    setInputType(inputType === "password" ? "text" : "password");
    setPassIconName(passIconName === "eye-slash" ? "eye" : "eye-slash");
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setPlaceholderText(placeholder + "");
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(inputValue !== "");
    setPlaceholderText("");
    setIsFocused(event.target.value !== "");
  };

  return (
    <>
      <div className={`${type == "hidden" ? styles.hidden : ""}`}>
        <div
          className={`${
            errors[name]
              ? styles.isWronginputfieldcontainer
              : styles.defaultinputfieldcontainer
          } `}
        >
          <input
            id={name}
            name={name}
            type={inputType}
            {...inputfieldRegister}
            onChange={(e) => {
              inputfieldRegister.onChange(e);
              handleInputChange(e);
            }}
            value={inputValue}
            //value={placeholder}
            placeholder={placeholderText}
            onFocus={handleInputFocus}
            onBlur={(e) => handleInputBlur(e)}
            maxLength={maxlen}
            className={`${
              errors[name] ? styles.isWronginputfield : styles.defaultinputfield
            } ${styles[size]}`}
            disabled={isDisabled}
            data-testid = {datatestid}
            //required={required}
          />

          {/* floatingLabel */}
          <label
            htmlFor={name} 
            className={`${
              isFocused || inputValue
                ? styles.floatingLabel
                : styles.floatingLabeldefault
            } ${errors[name] ? styles.isWrongLabel : ""} ${
              isFocused || inputValue
                ? styles.labelsizefloating
                : styles[labelsize]
            }`}
          >
            {label}
            {required && <span style={{ color: "red" }}>*</span>}
          </label>

          {/* cross/eye-icon - color of svg will change based on the presence of error */}
          {type === "password"
            ? inputValue && (
                <div
                  className={`${styles.icon}`}
                  onClick={togglefield}
                  style={{
                    color: errors[name]
                      ? "var(--neutral---main350)"
                      : "var(--primary---main300)",
                  }}
                >
                  <SvgIcon iconName={passIconName} wrapperStyle={iconsize} />
                </div>
              )
            : inputValue && (
                <div
                  className={`${styles.icon}`}
                  onClick={() => setInputValue("")}
                  style={{
                    color: errors[name]
                      ? "var(--error---main900)"
                      : "var(--neutral---main350)",
                  }}
                >
                  <SvgIcon iconName="x-circle" wrapperStyle={iconsize} />
                </div>
              )}
        </div>
      </div>
      <div></div>
      {errors && errors[name] && (
        <span className={`${styles.error}`}>{errors[name]?.message}</span>
      )}
    </>
  );
}
