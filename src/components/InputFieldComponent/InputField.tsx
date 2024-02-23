import { useState } from 'react';
import styles from './InputField.module.css'

/** The props type of {@link InputField | `InputField`}. */
export type InputFieldProps = {
    value?: string| number;
    onChange?: (value: string | number) => void;
    isWrong?:boolean;
    label: string;
    type: "password" | "text" | "disabled"| "number";
    isDisabled?:boolean;
    size:'sm'|'md'|'lg';
    required?:boolean;
}

/**
 *
 * Input Field Component
 * @category component
 * @returns {JSX.Element} The rendered input field component.
 * 
 * @example
 * Render an Input Field 
 * ```tsx
 * <InputField isWrong={false}/>
 * ```
 */

export function InputField ({ value: propValue = '',onChange: propOnChange,label, isWrong=false, type, isDisabled=false, size, required=false } : InputFieldProps){

    const [inputValue, setInputValue] = useState(propValue);
    const [inputType, setInputType] = useState(type);
    const [isFocused, setIsFocused] = useState(false);
    let iconsize;
    let labelsize;

    switch(size){
        case "lg":
          iconsize=styles.large;
          labelsize = styles.labellg;
          break
        case "md":
          iconsize=styles.medium;
          labelsize = styles.labelmd;
          break
        case "sm":
          iconsize=styles.small;
          labelsize = styles.labelsm;
          break
        default:
          iconsize=styles.small;
          labelsize=styles.labelsm;
      }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const newValue = event.target.value;

        setInputValue(newValue);

        if (propOnChange) {
            propOnChange(newValue);
          }
    }

    const togglefield = ()=>{
        setInputType(inputType==='password'?'text' : 'password')
    }

    const handleInputFocus = () => {
        setIsFocused(true);
    }

    const handleInputBlur = () => {
        setIsFocused(inputValue !== '');
    }

    return(
        <>
        <div className="form-container">
            <div className={`${isWrong ? styles.isWronginputfieldcontainer: styles.defaultinputfieldcontainer} `}>
                <input 
                    value={inputValue} 
                    onChange={handleInputChange} 
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className={`${isWrong ? styles.isWronginputfield: styles.defaultinputfield} ${styles[size]}`} 
                    type={inputType} 
                    disabled={isDisabled} 
                    required={required}/>
                <label className={`${isFocused || inputValue ? styles.floatingLabel : styles.floatingLabeldefault} ${isWrong ? styles.isWrongLabel : ''} ${isFocused || inputValue ? styles.labelsizefloating : labelsize}`}>
                    {label}{required && <span style={{ color: 'red' }}>*</span>}
                </label>
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