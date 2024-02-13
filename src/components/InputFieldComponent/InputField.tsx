import { useState } from 'react';
import styles from './InputField.module.css'

/** The props type of {@link InputField | `InputField`}. */
export type InputFieldProps = {
    isWrong?:boolean;
    label: string;
    type: "password" | "text" | "disabled";
    isDisabled?:boolean;
    size:'sm'|'md'|'lg';
}

/**
 *
 * Input Field Component
 * @category component
 * @returns {JSX.Element} The rendered button component.
 * 
 * @example
 * Render an Input Field 
 * ```tsx
 * <InputField isWrong={false}/>
 * ```
 */

export function InputField ({ label, isWrong=false, type, isDisabled=false, size } : InputFieldProps){

    const [inputValue, setInputValue] = useState('');
    const [inputType, setInputType] = useState(type);
    let iconsize;

    switch(size){
        case "lg":
          iconsize=styles.large;
          break
        case "md":
          iconsize=styles.medium;
          break
        case "sm":
          iconsize=styles.small;
          break
        default:
          iconsize=styles.small;
      }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setInputValue(event.target.value)
    }

    const togglefield = ()=>{
        setInputType(inputType==='password'?'text' : 'password')
    }

    return(
        <>
        <div className="form-container">
            <div className={`${isWrong ? styles.isWronginputfieldcontainer: styles.defaultinputfieldcontainer} `}>
                <input value={inputValue} onChange={handleInputChange} placeholder={label} className={`${isWrong ? styles.isWronginputfield: styles.defaultinputfield} ${styles[size]}`} type={inputType} disabled={isDisabled} required/>
                {type==='password' 
                ? (isWrong ? <div className={`${styles.passwordWrong} ${iconsize}`} onClick={togglefield} /> : <div className={`${styles.passwordRight} ${iconsize}`} onClick={togglefield}/>) 
                : (inputValue && 
                    (isWrong ? <div className={`${styles.textWrong} ${iconsize}`} onClick={()=>setInputValue('')}/> 
                     :<div className={`${styles.textRight} ${iconsize}`} onClick={()=>setInputValue('')}/>
                    )
                  )
                }
            </div>
        </div>
        </>
    )

}