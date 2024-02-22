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
 * @param text text on the button
 * @param type if the button is solid or outlined
 * @param size the size of the button could be small, medium, large
 * @param disabled the button could be active or disabled
 * @param iconimg the image or icon that has to be included within the button
 * 
 * @returns {JSX.Element} The rendered button component.
 * 
 * @example
 * Render a button of size small, type outline, and text "button"
 * ```tsx
 * <Button text="Button" type="outline" size="sm" disabled={true} iconimg="chevronG"/>
 * ```
 */

export function Button ({ text, type="solid", size, disabled=false, iconimg="" }: ButtonProps ){

  return (
    <>
      <button 
        className={`${styles[type]} ${styles[size]}`}
        disabled={disabled}
      >
        <div className={`${styles.buttonItems}`}>
          {iconimg && <Icon 
              src={iconimg} 
              size={size}
           />}
          {text}
        </div>
      </button>
    </>
  );
};
