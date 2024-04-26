
import styles from "./LoadingSkeletonPage.module.css";

/**
 * SystemBootingPage component renders a loading indicator page.
 * It is typically used to indicate that the system is in the process of booting up or loading.
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