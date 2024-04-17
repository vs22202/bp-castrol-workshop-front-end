import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ButtonComponent/Button";
import styles from "./Homepage.module.css";
import LandingStat1 from "../../assets/landing-stat-1.svg";
import LandingStat2 from "../../assets/landing-stat-2.svg";
import MobileLandingStat2 from "../../assets/landing-stat-mobile.svg";
import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import { useScreenSize } from "../../components/ScreenSizeLogic";
import { List } from "../../components/Q&AComponent/List";
import { useContext, useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const screenSize = useScreenSize();
  const { currentUser } = useContext(AuthContext) as AuthContextProps;
  const [hasApplication, setHasApplication] = useState(false);
  useEffect(() => {
    const fetchUserApplication = async () => {

      const result = await fetch(
        `${
          process.env.VITE_BACKEND_URL || "http://localhost:3000"
        }/application/getUserApplication`,
        {
          headers: {
            Authorization: currentUser?.auth_token as string,
          },
        }
      );
      const res = await result.json();
      return res;
    };
    fetchUserApplication().then((res) => {
      if (res.output == "success") {
        setHasApplication(true)
      }
    });
    }, []);
  return (
    <div>
      <div className={`${styles.statCard} illustration`}>
        {screenSize == "small" ? <MobileLandingStat2 /> : <LandingStat1 />}
        <LandingStat2 />
      </div>
      <div className={styles.homePageButton}>   
      <Button
        type="solid"
        text={hasApplication ? "View Application" : "Apply Now"}
        iconimg="right-arrow"
        placeIconAfter={true}
        onClick={() => {
          navigate("/upload", { replace: true });
        }}
      />
      </div>
      <div className={styles.aboutProgram}>
        <h2>
          {" "}
          <span>CASTROL</span> IS GROWING ITS NETWORK OF TRUSTED WORKSHOPS IN
          INDIA
        </h2>
        <p className={styles.answer}>
          The landscape is shifting for independent workshops, as consumer
          perceptions change and their expectations of quality increase.
          <br />
          Together with our distributors, Castrol is taking this opportunity to
          create and support a network of trusted, branded workshops.
        </p>
        <div className={styles.qnaContainer}>
          <h2>Is Castrol Service For Your Workshop?</h2>
          <List
            items={[
              "Are you committed to quality maintenance and friendly customer service?",
              "Do you have at least 3 bays in your workshop?",
              "Are you a full service workshop?",
              "Are you ready to benefit from branding with Castrol?",
            ]}
            size={screenSize == "large" ? "large" : "small"}
          />
          <p className={styles.answer}>
            If the answers are yes, and you would like to understand the
            benefits of becoming a <span className={styles.primary}>Castrol SERVICE</span> or <span className={styles.primary}>Castrol AUTO SERVICE </span>
            workshop and the qualification criteria, we’d love to hear from you.
          </p>
          <h2>What To Expect?</h2>
          <List
            items={[
              "Operate under Castrol’s trusted brand, become a Castrol SERVICE or AUTO SERVICE workshop",
              "Membership of a workshop network committed to quality and friendly service",
              "Internal and external branding and signage packages, to help your workshop stand out",
              "Access to Castrol training solutions",
            ]}
            size={screenSize == "large" ? "large" : "small"}
          />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
