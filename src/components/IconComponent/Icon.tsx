

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

/**
 * Props for the Icon component.
 * 
 * @property {string} src - The source key for the icon to display. It should match one of the keys in the `icons` object.
 * @property {"sm" | "md" | "lg"} size - The size of the icon. Can be 'sm' for small, 'md' for medium, or 'lg' for large.
 */

export type IconProps = {
     /**
     * The source key for the icon. This should correspond to one of the keys in the `icons` object.
     */
    src: string;
    /**
     * The size of the icon. Can be 'sm' for small, 'md' for medium, or 'lg' for large.
     */
    size: "sm" | "md" | "lg";
    /**
     * an alt text for the icon image
     */
    alt?:string;
  };
  
 /**
 * Renders an Icon component.
 * 
 * This component is designed to render an icon based on the `src` prop provided. The `src` prop corresponds to keys in the `icons` object, which maps to different SVG assets. The size of the icon can be controlled via the `size` prop.
 * 
 * @category Component
 * @param props The props for the Icon component.
 * @returns {JSX.Element} The rendered Icon component.
 * 
 * @example
 * Here's how to render an icon of size small with the 'loginW' key:
 * ```tsx
 * <Icon src="loginW" size="sm" alt="icon"/>
 * ```
 */
  
  export function Icon ({size, src, alt}: IconProps ){
  
    return (
      <>
        <img src={icons[src]} className={`${styles[size]}`} alt={alt}/>
      </>
    );
  };
  