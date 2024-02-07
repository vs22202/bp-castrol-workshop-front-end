import styles from "./Button.module.css";

/** The props type of {@link Button | `Button`}. */
export type ButtonProps = {
  /**
   * fill, state and size of the buttons
   */
  solid?: boolean;
  /* state: "active" | "hover" | "disabled"; */
  state: "activesolid"|"activeoutline"|"hoversolid"|"hoveroutline"|"disabledsolid"|"disabledoutline"
  size: "sm" | "md" | "lg";
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

export function Button ({ state="activesolid", size }: ButtonProps ){
  return (
    <>
      <button 
        className={`${styles[state]} ${styles[size]}`}
      >
        Button
      </button>
    </>
  );
};
