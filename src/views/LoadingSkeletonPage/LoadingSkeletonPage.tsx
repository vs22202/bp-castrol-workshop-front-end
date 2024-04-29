
import styles from "./LoadingSkeletonPage.module.css";

/**
 * @description SystemBootingPage component renders a loading indicator page.
 * It is typically used to indicate that the system is in the process of booting up or loading.
 * @component
 * @returns {React.FC} Returns the SystemBootingPage component.
 */

const SystemBootingPage: React.FC = () => {
  return (
    <>
      <div className={`${styles.container}`}>
          <h1> Loading...</h1>
      </div>
    </>
  );
};
export default SystemBootingPage;