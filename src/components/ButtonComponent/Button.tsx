import styles from "./Button.module.css";
import { Icon } from "../IconComponent/Icon";

/** The props type of {@link Button | `Button`}. */
export type ButtonProps = {
  /**
   * fill, state and size of the buttons
   */
  disabled?: boolean;
  type: "solid" | "outline";
  size: "sm" | "md" | "lg";
  text: string;
  iconimg: string;
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
 * <Button text="Button" type="outline" size="sm" disabled={true}/>
 * ```
 */

export function Button ({ text, type="solid", size, disabled=false, iconimg }: ButtonProps ){

  return (
    <>
      <button 
        className={`${styles[type]} ${styles[size]}`}
        disabled={disabled}
      >
        <div className={`${styles.buttonItems}`}>
          <Icon 
              src={iconimg} 
              size={size}
           />
          {text}
        </div>
      </button>
    </>
  );
};
