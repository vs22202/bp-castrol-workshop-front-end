import styles from "./Footer.module.css";
/** The props type of {@link Footer | `Footer`}. */

/**
 * A footer component with a logo.
 * 
 * This component is designed to render a static footer that includes a logo and copyright information.
 * It's a simple, reusable component that can be added to any page within an application to maintain consistency in branding and copyright notices.
 * 
 * @category Component
 * @returns {JSX.Element} The rendered footer component, including a logo image and copyright text.
 *
 * @example
 * Here's how you can render the `FooterWithLogo` component within your application:
 * 
 * ```tsx
 * <FooterWithLogo />
 * ```
 */

export function FooterWithLogo() {
  return (
    <div className={`${styles.footerContainer}`}>
      <img
        src="src\assets\castrol_logo.svg"
        alt="logo-ct"
        className={`${styles.footerLogo}`}
      />
      <p className={` ${styles.footerParagraph}`}>
        Copyright © 1999-2024
      </p>
    </div>
  );
}
