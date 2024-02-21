import { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { Button } from "../ButtonComponent/Button";
import HamburgerIcon from "../../assets/hamburger_icon.svg";
import CrossIcon from "../../assets/cross_icon.svg";
import ApplicationsIcon from "../../assets/application_icon.svg";
import ProfileIcon from "../../assets/profile_icon.svg";
import LogoutIcon from "../../assets/logout_icon.svg";

/** The props type of {@link Navbar | `Navbar`}. */
export type NavbarProps = {
  /**
   * Authentication state of the user
   */
  userState?: Object | null;
};
/**
 *
 * Navbar Component
 * @category component
 * @returns {JSX.Element} The rendered Navbar Component.
 *
 * @example
 * Render the navbar when user is not authenticated
 * ```tsx
 * <Navbar/>
 * ```
 *
 */
function Navbar() {
  // adding the states
  const [isActive, setIsActive] = useState(false);
  const [userAuth, setUserAuth] = useState(false);

  // add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  // clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false);
  };
  useEffect(() => {
    function checkUserAuth() {
      const item = localStorage.getItem("userAuth");
      console.log(item);
      if (item == "true") {
        setUserAuth(true);
      } else {
        setUserAuth(false);
      }
    } 
    window.addEventListener("storage", checkUserAuth);
    checkUserAuth();
    return () => {
      window.removeEventListener("storage", checkUserAuth);
    };
  }, []);

  return (
    <nav className={`${styles.navbar}`}>
      {/* logo */}
      <div className={`${styles.logoContainer}`}>
        <a href="#home">
          <img src="src\assets\Castrol.svg" alt="Logo" />
        </a>
        <div
          className={`${isActive ? styles.active : ""}`}
          onClick={toggleActiveClass}
        >
          <img
            src={isActive ? CrossIcon : HamburgerIcon}
            alt={isActive ? "Cross" : "Hamburger"}
          />
        </div>
      </div>
      <div
        className={`${styles.optionsContainer} ${
          isActive ? styles.active : ""
        }`}
      >
        {userAuth ? (
          <ul className={`${styles.navMenu}`}>
            <li onClick={removeActive}>
              <img src={ApplicationsIcon} alt="Applications" />
              <a href="#home">Applications</a>
            </li>
            <li onClick={removeActive}>
              <img src={ProfileIcon} alt="Profile" />
              <a href="#home">Profile</a>
            </li>
            <li onClick={removeActive}>
              <img src={LogoutIcon} alt="Logout" />
              <a href="#home">Logout</a>
            </li>
          </ul>
        ) : (
          <>
            <ul className={`${styles.navMenu} ${styles.mobileNav}`}>
              <li onClick={removeActive}>
                <img src={ApplicationsIcon} alt="Login" />
                <a href="#home">Login</a>
              </li>
              <li onClick={removeActive}>
                <img src={ProfileIcon} alt="SignUp" />
                <a href="#home">SignUp</a>
              </li>
            </ul>

            <div className={`${styles.authContainer}`}>
              <Button text="Login" type="solid" size="md" iconimg="loginW" />
              <div className={`${styles.verticalDivider}`}></div>
              <Button text="SignUp" type="outline" size="md" iconimg="signupG"/>
            </div>
          </>
        )}
        <div className={`${styles.contactDetails}`}>
          <Button text="developer@bpcap.com" type="outline" size="sm" iconimg="checkcircleG"/>
          <Button text="+91 97000 09045" type="outline" size="sm" iconimg="checkcircleG"/>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
