

import styles from './Icon.module.css';
import loginW from '../../assets/loginW.svg'
import loginG from '../../assets/loginG.svg'
import signupW from '../../assets/signupW.svg'
import signupG from '../../assets/signupG.svg'
import submitW from '../../assets/submitW.svg'
import submitG from '../../assets/submitG.svg'
import chevronW from '../../assets/chevron-rightW.svg'
import chevronG from '../../assets/chevron-rightG.svg'
import editW from '../../assets/editW.svg'
import editG from '../../assets/editG.svg'
import checkcircleW from '../../assets/checkcircleW.svg'
import checkcircleG from '../../assets/checkcircle-outline-activeG.svg'


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

    let url;
    switch(src){
        case "loginW":
            url = loginW
            break;
        case "loginG":
            url = loginG
            break;
        case "signupW":
            url = signupW
            break;
        case "signupG":
            url = signupG
            break;
        case "submitW":
            url = submitW
            break;
        case "submitG":
            url = submitG
            break;
        case "ChevronW":
            url = chevronW
            break;
        case "chevronG":
            url = chevronG
            break;
        case "editW":
            url = editW
            break;
        case "editG":
            url = editG
            break;
        case "checkcircleW":
            url = checkcircleW
            break
        case "checkcircleG":
            url = checkcircleG
            break
        default:
            
        }
  
    return (
      <>
        <img src={url} className={`${styles[size]}`}/>
      </>
    );
  };
  