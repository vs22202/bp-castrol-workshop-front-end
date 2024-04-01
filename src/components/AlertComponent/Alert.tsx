import styles from "./Alert.module.css";

/**
 * Properties for the `Alert` component.
 */

export type AlertProps = {
  /** 
   * Defines the alert style type, either "success", "error", "info" or "warning".
   */
  type: "success" | "error" | "info" | "warning";
    /** 
   * The text to display for the alert.
   */
  message: string;
};

/**
 *
 * Renders a customizable `Alert` component.
 * 
 * This component allows for the creation of a alert with customizable properties such as message and type.
 * It gives a alert message.
 * 
 * @category component
 * @param props The {@link AlertProps} for the alert.
 * @returns The rendered 'Alert' component as a `JSX.Element`.
 *
 * @example
 * Render a error alert.
 * ```tsx
 * <Alert message="Your login failed" type="error" />
 * ```
 */

export function Alert({message,type}: AlertProps) {
  return (
      <div className={`${styles.alertContainer} ${styles[type]}`} role="alertcontainer">
          <p>{message}</p>
    </div>
  );
}
