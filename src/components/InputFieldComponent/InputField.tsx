import { useState } from 'react';
import styles from './InputField.module.css'
import TextField from '@mui/material/TextField';

/** The props type of {@link InputField | `InputField`}. */
export type InputFieldProps = {
    isWrong?:boolean;
    label: string;
    type: "password" | "text" | "disabled";
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

export function InputField ({ label, isWrong=false, type, isDisabled=false, size } : InputFieldProps){

    const [inputValue, setInputValue] = useState('');
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
        setInputValue(event.target.value)
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
                    required/>
                <label className={`${isFocused || inputValue ? styles.floatingLabel : styles.floatingLabeldefault} ${isWrong ? styles.isWrongLabel : ''} ${labelsize}`}>
                    {label}
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

/* export function InputField({ label, isWrong = false, type, isDisabled = false, size, required=false }: InputFieldProps) {

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

    const togglefield = () => {
        setInputType(prevType => prevType === 'password' ? 'text' : 'password');
    }

    return (
        <div className="form-container">
            <div className={`${isWrong ? styles.isWronginputfieldcontainer : styles.defaultinputfieldcontainer} ${styles[size]}`}>
                <TextField
                    value={inputValue}
                    onChange={handleInputChange}
                    label={label}
                    className={`${isWrong ? styles.isWronginputfield: styles.defaultinputfield} ${styles[size]}`}
                    type={inputType}
                    disabled={isDisabled}
                    required={required}
                    sx={{
                        '& .MuiInputBase-root': {
                          color: isWrong ? 'var(--error---main900)' : 'var(--primary---main700)',
                          fontSize: size === 'sm' ? 'var(--spacing-xs)' :
                                    size === 'md' ? 'var(--spacing-sm)' : 'var(--spacing-lg)',
                          height: size === 'sm' ? 'var(--spacing-sm)' :
                                  size === 'md' ? 'var(--spacing-xl)' : 'var(--spacing-4xl)',
                        },
                        '& .MuiInputLabel-root': {
                            fontSize: size === 'sm' ? 'var(--spacing-2xs)' :
                                    size === 'md' ? 'var(--spacing-xs)' : 'var(--spacing-sm)',
                          },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '0', // Remove border radius
                          '& fieldset': {
                            borderWidth: '0', // Remove border
                          },
                          '&:hover fieldset': {
                            borderWidth: '0', // Remove border on hover
                          },
                          '&.Mui-focused fieldset': {
                            borderWidth: '0', // Remove border on focus
                          },
                        },
                      }}
                />
                {type === 'password' ? (
                    isWrong
                        ? <div className={`${styles.passwordWrong} ${iconsize}`} onClick={togglefield}/>
                        : <div className={`${styles.passwordRight} ${iconsize}`} onClick={togglefield}/>
                ):
                (
                    isWrong
                        ? <div className={`${styles.textWrong} ${iconsize}`} onClick={()=>setInputValue('')}/>
                        : <div className={`${styles.textRight} ${iconsize}`} onClick={()=>setInputValue('')}/>
                )
                }
            </div>
        </div>
    );
} */