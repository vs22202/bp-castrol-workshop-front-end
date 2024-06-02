import styles from "./Footer.module.css";
import FooterLogo from "../../assets/castrol_logo.svg";
import { SvgIcon } from "../IconComponent/SvgIcon";
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
    <div className={`${styles.footerContainer} illustration`} data-testid="footercontainer">
      <FooterLogo/>
      <div className={styles.footercontactinfo}>
        <div className={styles.email}>
          <SvgIcon iconName="mail" wrapperStyle="sm"/>
          <a href="mailto:developer@bpcap.com">developer@bpcap.com</a>
        </div>
        <div className={`${styles.verticalDivider}`}></div>
        <div className={styles.phoneno}>
          <SvgIcon iconName="phone" wrapperStyle="sm"/>
          <a href="tel:+9196000009045">+91 97000 09045</a>
        </div>
      </div>
      <p className={` ${styles.footerParagraph}`}>
        Copyright © 1999-2024
      </p>
    </div>
  );
}
