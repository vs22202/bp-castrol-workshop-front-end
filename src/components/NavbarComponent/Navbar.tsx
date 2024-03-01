import { useState, useEffect, useContext } from "react";
import styles from "./Navbar.module.css";
import { Button } from "../ButtonComponent/Button";
import { SvgIcon } from "../IconComponent/SvgIcon";
import AlertContext, { AlertContextProps } from "../../contexts/AlertContext";
import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import { Link, Outlet, useNavigate } from "react-router-dom";

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
  const { currentUser } = useContext(AuthContext) as AuthContextProps;
  const navigate = useNavigate()
  const userAuth = currentUser;
  // add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  // clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false);
  };
  return (
    <>
      <nav className={`${styles.navbar}`}>
        {/* logo */}
        <div className={`${styles.logoContainer}`}>
          <Link to="/">
            <img src="src\assets\Castrol.svg" alt="Logo" />
          </Link>

          <div
            className={`${isActive ? styles.active : ""}`}
            onClick={toggleActiveClass}
          >
            {!isActive ? (
              <SvgIcon iconName="hamburger" data-testid="hamburger_icon" />
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
                <Link to="/upload">Applications</Link>
                <a href="#home"></a>
              </li>
              <li onClick={removeActive}>
                <SvgIcon iconName="profile" />
                <Link to="/profile">Profile</Link>
              </li>
              <li onClick={removeActive}>
                <SvgIcon iconName="logout" />
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          ) : (
            <>
              <ul className={`${styles.navMenu} ${styles.mobileNav}`}>
                <li onClick={removeActive}>
                  <SvgIcon iconName="login_icon" />
                  <Link to="/login">Login</Link>
                </li>
                <li onClick={removeActive}>
                  <SvgIcon iconName="signup_icon" />
                  <Link to="/signup">SignUp</Link>
                </li>
              </ul>

              <div className={`${styles.authContainer}`}>
                <Button
                  text="Login"
                  type="solid"
                  size="md"
                    iconimg="login_icon"
                    onClick={() => {
                      navigate('/login', { replace: true });
                    }}
                />
                <div className={`${styles.verticalDivider}`}></div>
                <Button
                  text="SignUp"
                  type="outline"
                  size="md"
                    iconimg="signup_icon"
                    onClick={() => {
                      navigate('/signup', { replace: true });
                    }}
                />
              </div>
            </>
          )}
          <div className={`${styles.contactDetails}`}>
            <Button
              text="developer@bpcap.com"
              type="outline"
              size="sm"
              iconimg="mail"
            />
            <Button
              text="+91 97000 09045"
              type="outline"
              size="sm"
              iconimg="phone"
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export { Navbar };
