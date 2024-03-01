import styles from "./Alert.module.css";
/** The props type of {@link Alert | `Alert`}. */

export type AlertProps = {
  /**
   * fill, state and size of the buttons
   */
  type: "success" | "error" | "info" | "warning";
  message: string;
};

/**
 *
 * Alert Component
 * @category component
 *
 * @returns {JSX.Element} The rendered alert component.
 *
 * @example
 * Render a error alert.
 * ```tsx
 * <Alert message="Your login failed" type="error" />
 * ```
 */

export function Alert({message,type}: AlertProps) {
  return (
      <div className={`${styles.alertContainer} ${styles[type]}`}>
          <p>{message}</p>
    </div>
  );
}
