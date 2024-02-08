import styles from "./Button.module.css";

/** The props type of {@link Button | `Button`}. */
export type ButtonProps = {
  /**
   * fill, state and size of the buttons
   */
  disabled?: boolean;
  state: "solid" | "outline";
  size: "sm" | "md" | "lg";
  text: string
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

export function Button ({ text, state="solid", size, disabled=false }: ButtonProps ){
  return (
    <>
      <button 
        className={`${styles[state]} ${styles[size]}`}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
};
