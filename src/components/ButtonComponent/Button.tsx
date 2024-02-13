import styles from "./Button.module.css";
import checkcirclesolid from "../../assets/check-circle-solid.svg"
import checkcircleoutline_active from "../../assets/check-circle-outline-active.svg"
import checkcircleoutline_hover from "../../assets/check-circle-outline-hover.svg"
import checkcircleoutline_disabled from "../../assets/check-circle-outline-disabled.svg"
import { useState } from "react";

/** The props type of {@link Button | `Button`}. */
export type ButtonProps = {
  /**
   * fill, state and size of the buttons
   */
  disabled?: boolean;
  type: "solid" | "outline";
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
 * <Button text="Button" type="outline" size="sm" disabled={true}/>
 * ```
 */

export function Button ({ text, type="solid", size, disabled=false }: ButtonProps ){

  const [iconSrc, setIconSrc] = useState<string>(type === 'solid' ? checkcirclesolid : 
                                                  disabled===true ? checkcircleoutline_disabled : checkcircleoutline_active
                                                );

  const handleMousEnter = () => {
    if(type==='outline' && disabled===false){
      setIconSrc(checkcircleoutline_hover)
    }
  };

  const handleMousExit = () => {
    if(type==='outline' && disabled===false){
      setIconSrc(checkcircleoutline_active)
    }
  };

  let iconsize
  switch(size){
    case "lg":
      iconsize=styles.large;
      break
    case "md":
      iconsize=styles.medium;
      break
    case "sm":
      iconsize=styles.small;
      break
    default:
      iconsize=styles.small;
  }

  return (
    <>
      <button 
        className={`${styles[type]} ${styles[size]}`}
        disabled={disabled}
        onMouseEnter={handleMousEnter}
        onMouseLeave={handleMousExit}
      >
        <div className="button-items">
          {text}
          <img src={iconSrc} className={`${iconsize}`} style={{paddingLeft:'var(--spacing-3xs)'}}/>
        </div>
      </button>
    </>
  );
};
