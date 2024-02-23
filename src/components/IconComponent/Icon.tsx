

import styles from './Icon.module.css';

import loginW from '../../assets/button-icons/loginW.svg'
import loginG from '../../assets/button-icons/loginG.svg'
import loginD from '../../assets/button-icons/loginD.svg'

import signupW from '../../assets/button-icons/signupW.svg'
import signupG from '../../assets/button-icons/signupG.svg'
import signupD from '../../assets/button-icons/signupD.svg'

import submitW from '../../assets/button-icons/submitW.svg'
import submitG from '../../assets/button-icons/submitG.svg'
import submitD from '../../assets/button-icons/submitD.svg'

import chevronW from '../../assets/button-icons/chevron-rightW.svg'
import chevronG from '../../assets/button-icons/chevron-rightG.svg'
import chevronD from '../../assets/button-icons/chevron-rightD.svg'

import editW from '../../assets/button-icons/editW.svg'
import editG from '../../assets/button-icons/editG.svg'
import editD from '../../assets/button-icons/editD.svg'

import checkcircleW from '../../assets/button-icons/checkcircleW.svg'
import checkcircleG from '../../assets/button-icons/checkcircleG.svg'
import checkcircleD from '../../assets/button-icons/checkcircleD.svg'

//G - Green outlined | W - White outlined | D - Disabled

const icons : Record<string, string> = {
    loginD,
    loginW,
    loginG, 
    signupD,
    signupG,
    signupW,
    submitD,
    submitW,
    submitG,
    chevronD,
    chevronW,
    chevronG,
    editD,
    editW,
    editG,
    checkcircleD,
    checkcircleW,
    checkcircleG,
}

/** The props type of {@link Icon | `Icon`}. */
export type IconProps = {
    /**
     *size of the icons
     */
    src: string;
    size: "sm" | "md" | "lg";
  };
  
  /**
   *
   * Icon Component
   * @category component
   * @returns {JSX.Element} The rendered icon component.
   * 
   * @example
   * Render a icon of size small
   * ```tsx
   * <Icon size="sm"/>
   * ```
   */
  
  export function Icon ({size, src}: IconProps ){
  
    return (
      <>
        <img src={icons[src]} className={`${styles[size]}`}/>
      </>
    );
  };
  