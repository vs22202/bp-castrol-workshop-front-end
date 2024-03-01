import { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { Button } from "../ButtonComponent/Button";
import { SvgIcon } from "../IconComponent/SvgIcon";

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
          {!isActive ? (
            <SvgIcon iconName="hamburger" data-testid="hamburger_icon"/>
          ) : (
            <SvgIcon iconName="cross" />
          )}
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
              <SvgIcon iconName="application" />
              <a href="#home">Applications</a>
            </li>
            <li onClick={removeActive}>
              <SvgIcon iconName="profile" />
              <a href="#home">Profile</a>
            </li>
            <li onClick={removeActive}>
              <SvgIcon iconName="logout" />
              <a href="#home">Logout</a>
            </li>
          </ul>
        ) : (
          <>
            <ul className={`${styles.navMenu} ${styles.mobileNav}`}>
              <li onClick={removeActive}>
                <SvgIcon iconName="login_icon" />
                <a href="#home">Login</a>
              </li>
              <li onClick={removeActive}>
                <SvgIcon iconName="signup_icon" />
                <a href="#home">SignUp</a>
              </li>
            </ul>

            <div className={`${styles.authContainer}`}>
              <Button text="Login" type="solid" size="md" iconimg="loginW" />
              <div className={`${styles.verticalDivider}`}></div>
              <Button
                text="SignUp"
                type="outline"
                size="md"
                iconimg="signupG"
              />
            </div>
          </>
        )}
        <div className={`${styles.contactDetails}`}>
          <Button
            text="developer@bpcap.com"
            type="outline"
            size="sm"
            iconimg="checkcircleW"
          />
          <Button
            text="+91 97000 09045"
            type="outline"
            size="sm"
            iconimg="checkcircleW"
          />
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
