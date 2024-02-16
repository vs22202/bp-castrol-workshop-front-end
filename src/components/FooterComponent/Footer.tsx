// Import your CSS module file at the top
import styles from './Footer.module.css';

export function FooterWithLogo() {
  return (
    <footer className={`w-full ${styles.footerContainer} p-8`}>
        <img
          src="docs\assets\images\castrol_logo.svg"
          alt="logo-ct"
          className={`w-full ${styles.footerLogo}`}
        />
        <p className={`font-normal transition-colors ${styles.footerParagraph}`}>
            Copyright © 1999-2024
          </p>
        
      
    </footer>
  );
}
