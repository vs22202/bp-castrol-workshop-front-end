// CheckboxComponent.tsx

import React, { useState } from "react";
import styles from './CheckboxComponent.module.css'

interface ICheckboxProps {
  size: "small" | "medium" | "large";
  text: string;
  value: string;
  onCheckboxChange: (value: string, isChecked: boolean) => void;
}

const Checkbox: React.FC<ICheckboxProps> = ({ size, text,value, onCheckboxChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  
  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
    onCheckboxChange(value, !isChecked);
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
        <input type="checkbox" checked={isChecked} value={value} />  
        <div className={styles.icon}>{getIcon()}</div>
        <div className={`${styles.text} ${styles[size]}`}>{text}</div>
      </div>
    </div>
  );
};

export { Checkbox };