import styles from "./CheckboxComponent.module.css";

/**
 * Properties for the `Checkbox` component.
 * 
 * Defines the configuration and behavior of the Checkbox component,
 * including its size, display text, and validation handling.
 */
export type CheckboxProps = {
  /**
   * The name attribute of the checkbox input element. Used to identify the element when submitting a form.
   */
  name: string;
  /**
   * The size of the checkbox. This controls the scaling of the checkbox's appearance.
   * While currently a string, consider restricting this to specific size options like "small", "medium", or "large" for consistency.
   */
  size: string; // Consider changing to size: "small" | "medium" | "large";
  /**
   * The display text associated with the checkbox. This text is shown to the user alongside the checkbox itself.
   */
  text: string;
  /**
   * Indicates whether the checkbox input is required for form submission. Defaults to `false`.
   */
  required?: boolean;
  /**
   * Function to "register" the input in the context of a form library (like React Hook Form) for handling form submission and validation.
   */
  register: any; // Consider providing a more specific type if possible, for better type safety.
  /**
   * The current value of the checkbox. Determines whether the checkbox is checked (`true`) or unchecked (`false`).
   */
  value?: boolean;
  /**
   * Object containing error messages or validation state, typically used with form libraries to indicate validation errors.
   */
  errors: any; // Consider providing a more specific type based on the structure of the errors object.
  /**
   * Schema or rules for validating the checkbox input, used in conjunction with `register` to enforce validation constraints.
   */
  validationSchema?: any; // Consider providing a more specific type for better type safety.
  /**
   * to provide an ID for testing checkbox
   */
  datatestid?:string;
}

/**
 * Renders a `Checkbox` component with customizable properties.
 * 
 * This component is designed to be used within forms, supporting custom sizes, required validation,
 * and integration with form handling libraries through the `register` prop.
 * 
 * @param props The {@link CheckboxProps} to configure the checkbox.
 * @returns A JSX element representing a stylized checkbox input, with associated label text.
 */
export function Checkbox({ name, size, text, required = false, register, errors, validationSchema, datatestid }: CheckboxProps) {
  const checkboxRegister = register(name, validationSchema);

  return (
    <>
      <div className={`${styles[size]}`} id={name}>
        <div className={`${styles.group} ${styles[size]}`}>
          <input
            name={name}
            aria-label={name}
            {...checkboxRegister}
            type="checkbox"
            data-testid={datatestid}
            className={`${styles["icon" + size]} ${errors && errors[name] ? styles.error : ""}`}
          />
          <div className={`${errors && errors[name] ? styles.texterror : styles.text} ${styles[size]}`}>{text}{required && <span style={{ color: 'red' }}>*</span>}</div>
        </div>
      </div>
    </>
  );
}
