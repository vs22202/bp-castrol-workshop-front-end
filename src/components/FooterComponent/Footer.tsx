
import styles from "./Footer.module.css";
/** The props type of {@link Footer | `Footer`}. */

/**
 *
 * Footer Component
 * @category component
 * 
 *
 * @returns {JSX.Element} The rendered footer component.
 *
 * @example
 * Render a footer
 * ```tsx
 * <FooterWithLogo />
 * ```
 */

export function FooterWithLogo() {
  return (
    <div data-testid="footerContainer" className={`${styles.footerContainer}`}>
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
