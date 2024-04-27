/**
 * SystemBootingPage component displays a message indicating that system resources are booting.
 * Pages will load automatically after resources are ready.
 * 
 * Dependencies:
 * - BootingImg: SVG image component for system booting illustration.
 * - styles: CSS module for styling SystemBootingPage component.
 * 
 * @module SystemBootingPage
 */

import BootingImg from "../../assets/system_booting.svg";
import styles from "./SystemBootingPage.module.css";
const SystemBootingPage: React.FC = () => {
  return (
    <>
      <div className={`${styles.logincontainer}`}>
        <div className={`${styles.imagecontainer} illustration`}>
          <BootingImg />
        </div>
        <div className={`${styles.loginform}`}>
          <h1>System resources are booting, please wait.</h1>
          <h2>Pages will load automatically after resources are ready.</h2>
          <p>
            Since this application is hosted using free tier services,
            inactivity pauses the servers. These servers are started when a user
            like you visits the website.
          </p>
          <p>This should take about 1-2 mins</p>
        </div>
      </div>
    </>
  );
};
export default SystemBootingPage;