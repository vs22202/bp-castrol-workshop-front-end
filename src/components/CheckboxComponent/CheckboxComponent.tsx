// CheckboxComponent.tsx

import React, { useState } from "react";
import styles from './CheckboxComponent.module.css'

interface ICheckboxProps {
    /**
   * size,text,value, onCheckboxChange of the Checkbox
   */
  size: "small" | "medium" | "large";
  text: string;
  value: string;
  onCheckboxChange?: (value: string, isChecked: boolean) => void;
}

/** The props type of {@link Checkbox | `Checkbox`}. */


/**
 *
 * Checkbox Component
 * @category component
 * @param size The size of the checkbox. It can be "small", "medium", or "large".
 * @param text The label text associated with the checkbox.
 * @param value The value of the checkbox.
 * @param onCheckboxChange A function to handle checkbox state changes. It receives the value and the current checked state.
 *
 * @returns {JSX.Element} The rendered checkbox component.
 *
 * @example
 * Render a checkbox of size medium,  text "I consent to having my data processed according to the privacy statement" and value="Data Consent"
 * ```tsx
 * <Checkbox size="medium" text="I consent to having my data processed according to the privacy statement" value="Data Consent" />
 * ```
 */
const Checkbox: React.FC<ICheckboxProps> = ({ size, text,value, onCheckboxChange }) => {

  const [isChecked, setIsChecked] = useState(false);
  
  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
    if (onCheckboxChange) {
      onCheckboxChange(value, !isChecked);
    }
  };

  const getIcon = () => {
    return (
      <svg
        width={size === "large" ? "32" : size === "medium" ? "24" : "16"}
        height={size === "large" ? "32" : size === "medium" ? "24" : "16"}
        /* className={`${styles[size]}`} */
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isChecked ? (
          <>
            {/* Add SVG path for the checked state */}
            <path
              d="M10.5 29.75L24.5 43.75L45.5 12.25"
              stroke="#009900"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="3"
              y="4.16667"
              width="47.6667"
              height="47.6667"
              stroke="#009900"
            />
          </>
        ) : (
          <>
            {/* Add SVG path for the unchecked state */}
            <rect
              x="3"
              y="4.16675"
              width="47.6667"
              height="47.6667"
              stroke="#009900"
            />
          </>
        )}
      </svg>
    );
  };

  
  return (
    <div
      className={`${styles.checkboxComponent} ${styles[`${size}`]}`}
      onClick={handleCheckboxClick}
    >
      <div className={`${styles.group} `}>
        <input type="checkbox" checked={isChecked} value={value} onChange={() => {}}/>  
        <div className={styles.icon}>{getIcon()}</div>
        <div className={`${styles.text} ${styles[size]}`}>{text}</div>
      </div>
    </div>
  );
};

export { Checkbox };