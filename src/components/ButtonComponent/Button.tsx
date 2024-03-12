import styles from "./Button.module.css";
import { SvgIcon } from "../IconComponent/SvgIcon";

/**
 * Properties for the `Button` component.
 */
export type ButtonProps = {
  /** 
   * Determines if the button is disabled. Defaults to `false`.
   */
  disabled?: boolean;
  /** 
   * Defines the button style type, either "solid" or "outline".
   */
  type: "solid" | "outline";
  /** 
   * Specifies the size of the button: "sm" for small, "md" for medium, and "lg" for large.
   */
  size?: "sm" | "md" | "lg";
  /** 
   * The text to display on the button.
   */
  text: string;
  /** 
   * Optional icon image to display on the button. Requires the name of the icon as defined in `SvgIcon` component.
   */
  iconimg?: string;
  /** 
   * The button action type: "button", "submit", or "reset". Defaults to "button".
   */
  action?: "button" | "submit" | "reset";
  /**
   * The place the icon aftert the text
   */
  placeIconAfter?:boolean;
  /** 
   * Optional click handler for the button. Receives the mouse event as an argument.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** 
   * Optional test id for testing the component as well as the pages it is used in.
   */
  datatestid?: string;
};

/**
 * Renders a customizable `Button` component.
 * 
 * This component allows for the creation of a button with customizable properties such as text, type, size, and optional icons.
 * It supports being disabled and can handle click events.
 * 
 * @category Components
 * @param props The {@link ButtonProps} for the button.
 * @returns The rendered `Button` component as a `JSX.Element`.
 * 
 * @example
 * ```tsx
 * <Button text="Submit" type="solid" size="md" disabled={false} action="submit" />
 * ```
 * 
 * @example
 * ```tsx
 * <Button text="Cancel" type="outline" size="sm" disabled iconimg="crossIcon" onClick={() => console.log('Clicked!')} />
 * ```
 */
export function Button({
  text,
  type = "solid",
  size,
  disabled = false,
  action = "button",
  placeIconAfter,
  iconimg,
  datatestid,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles[type]} ${styles[size || ""]} ${styles.button} ${placeIconAfter ? styles.reverse : ""}`}
      type={action}
      disabled={disabled}
      onClick={onClick}
      data-testid={datatestid}
    >
      {iconimg && <SvgIcon iconName={iconimg} wrapperStyle={size} />}
      <span>{text}</span>
    </button>
  );
}
