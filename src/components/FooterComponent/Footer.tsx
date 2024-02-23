// Import your CSS module file at the top
import React from "react";
import styles from "./Footer.module.css";

export function FooterWithLogo() {
  return (
    <div className={`${styles.footerContainer}`}>
      <img
        src="docs\assets\images\castrol_logo.svg"
        alt="logo-ct"
        className={`${styles.footerLogo}`}
      />
      <p className={` ${styles.footerParagraph}`}>
        Copyright © 1999-2024
      </p>
    </div>
  );
}
