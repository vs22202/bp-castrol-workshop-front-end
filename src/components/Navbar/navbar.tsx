import React, { useState } from 'react';
import styles from './navbar.module.css';
import { Button } from '../ButtonComponent/Button';
import HamburgerIcon from "../../assets/hamburger_icon.svg"
import CrossIcon from '../../assets/cross_icon.svg'
import ApplicationsIcon from '../../assets/application_icon.svg';
import ProfileIcon from '../../assets/profile_icon.svg';
import LogoutIcon from '../../assets/logout_icon.svg';

function Navbar() {
  // adding the states 
  const [isActive, setIsActive] = useState(false);

  // add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  // clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className={`${styles.navbar}`}>
          {/* logo */}
          <a href='#home' className={`${styles.logo}`}>
            <img src="src\assets\Castrol.svg" alt="Logo" />
          </a>

          <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`} onClick={toggleActiveClass}>
          <img src={isActive ? CrossIcon : HamburgerIcon} alt={isActive ? 'Cross' : 'Hamburger'} />
          </div>
          
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
            <li onClick={removeActive}>
              <img src={ApplicationsIcon} alt="Applications" className={`${styles.icon}`} />
              <a href='#home' className={`${styles.text}`}>Applications</a>
            </li>
            <li onClick={removeActive}>
              <img src={ProfileIcon} alt="Profile" className={`${styles.icon}`} />
              <a href='#home' className={`${styles.text}`}>Profile</a>
            </li>
            <li onClick={removeActive}>
              <img src={LogoutIcon} alt="Logout" className={`${styles.icon}`} />
              <a href='#home' className={`${styles.text}`}>Logout</a>
            </li>

            <li className={`${styles.button}`}>
              <Button text="developer@bpcap.com" type="outline" size="sm" />
            </li>
            <li className={`${styles.button}`}>
              <Button text="+91 97000 09045" type="outline" size="sm" />
            </li>
        
          </ul>



        </nav>
      </header>
    </div>
  );
}

export {Navbar};
