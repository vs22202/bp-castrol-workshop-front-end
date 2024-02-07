
import styles from "./Button.module.css";

/** The props type of {@link Button | `Button`}. */
export type ButtonProps = {
  /**
   * fill, state and size of the buttons
   */
  solid?: boolean;
  state: "active" | "hover" | "disabled";
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

function changeColorWithState(varColor:string, state:string, isShadow:boolean){
  switch(state){
    case "active":
        varColor = !isShadow ? "var(--primary---main500)" : "var(--primaryshdw--md)";
        break;
      case "hover":
        varColor = !isShadow ? "var(--primary---main300)" : "var(--primaryshdw--lg)";
        break;
      case "disabled":
        varColor = !isShadow ? "var(--neutral---main150)" : "var(--neutralshdw--lg)";
        break;
      default:
        varColor = "white";
  }
  return varColor
}
export function Button ({ solid=true, state="active", size }: ButtonProps ){

  const bgcolor = changeColorWithState("", state, false)
  const fontcolor = solid ? "var(--shades---main-white)" : changeColorWithState("", state, false)
  const shadowcolor = changeColorWithState("", state, true)

  const buttonStyle = {
    padding: "var(--spacing-2xs)",
    borderRadius: " var(--spacing-4xs)",
    backgroundColor: solid ? bgcolor : "var( --shades---main-white)",
    border: solid ? "none" : `2px solid ${bgcolor}`,
    color : fontcolor,
    boxShadow: `2px ${shadowcolor}`
  }
  
  return (
    <>
      <button 
        className={`${styles.solid} ${styles[size]}`}
        style={buttonStyle}
        disabled={state==='disabled'}
      >
        Button
      </button>
    </>
  );
};
