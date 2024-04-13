
import styles from "./LoadingSkeletonPage.module.css";
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