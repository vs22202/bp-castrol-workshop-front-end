
import styles from "./Button.module.css";

/** The props type of {@link Button | `Button`}. */
export type ButtonProps = {
  /**
   * Size of the button
   */
  size: string;
};

/**
 *
 * Button Component
 * @category component
 * @returns {JSX.Element} The rendered button component.
 * 
 * @example
 * Render a button of size small
 * ```tsx
 * <Button size="sm"/>
 * ```
 */
export function Button ({ size }: ButtonProps ){
  return (
    <>
      {size == "sm" ? (
        <button className={`${styles.sm} ${styles.outline}`}>Button</button>
      ) : (
        <button className={`${styles.sm} ${styles.outline}`}>Button</button>
      )}
    </>
  );
};
