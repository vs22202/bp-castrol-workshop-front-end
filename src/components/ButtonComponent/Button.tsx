import styles from "./Button.module.css";
import { SvgIcon } from "../IconComponent/SvgIcon";
/** The props type of {@link Button | `Button`}. */

export type ButtonProps = {
  /**
   * fill, state and size of the buttons
   */
  disabled?: boolean;
  type: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  text: string;
  iconimg?: string;
  action?: "button" | "submit" | "reset";
  onClick?:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void;
};

/**
 *
 * Button Component
 * @category component
 * 
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

export function Button ({ text, type="solid", size, disabled=false,action ="button", iconimg,onClick }: ButtonProps ){

  return (
    <button className={`${styles[type]} ${styles[size || ""]} ${styles.button}`} type={action} disabled={disabled} onClick={onClick}>
      {iconimg && <SvgIcon iconName={iconimg} wrapperStyle={size} />}
      <div>{text}</div>
    </button>
  );
}
