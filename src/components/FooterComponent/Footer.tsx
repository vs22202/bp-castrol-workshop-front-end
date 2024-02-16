// Import your CSS module file at the top
import styles from './Footer.module.css';

export function FooterWithLogo() {
  return (
    <footer className={`w-full ${styles.footerContainer} p-8`}>
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
        <img
          src="docs\assets\images\castrol_logo.svg"
          alt="logo-ct"
          className={`w-full ${styles.footerLogo}`}
        />
        <div>
          <p className={`font-normal transition-colors ${styles.footerParagraph}`}>
            Copyright © 1999-2024
          </p>
          {/* Add similar paragraph elements for other content */}
        </div>
      </div>
    </footer>
  );
}
