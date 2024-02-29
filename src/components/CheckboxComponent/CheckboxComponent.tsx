// CheckboxComponent.tsx
import { useEffect } from "react";
import styles from "./CheckboxComponent.module.css";
/** The props type of {@link Checkbox | `Checkbox`}. */
export type CheckboxProps = {
   /**
   * name,size,text,required, register, value of the Checkbox
   */
  name:string;
  size: "small" | "medium" | "large";
  text: string;
  required?:boolean;
  register:any;
  value?:boolean;
  errors?:any;
  validationSchema?:any;
}
/**
 * Checkbox Component
 * @category Component
 *
 * @param {string} name - The name of the checkbox.
 * @param {string} size - The size of the checkbox. It can be "small", "medium", or "large".
 * @param {string} text - The label text associated with the checkbox.
 * @param {boolean} required - Indicates whether the checkbox is required.
 * @param {function} register - A function to register the checkbox in a form.
 * @param {boolean} value - The value of the checkbox checked or not.
 *
 * @returns {JSX.Element} The rendered checkbox component.
 *
 * @example
 * // Render a medium-sized checkbox with the label text "I consent to having my data processed according to the privacy statement" and value "true"
 * <Checkbox name="dataConsent" size="medium" text="I consent to having my data processed according to the privacy statement" required={true} register={register} value="true" />
 */
export function Checkbox({name, size, text, required=false, register, errors, validationSchema} : CheckboxProps){
   const checkboxRegister = register(name, validationSchema)

   /* useEffect(()=>{
    console.log(errors);
   }) */
  
  return (
    <>
    <div className={`${styles[size]}`} id={name}>
      <div className={`${styles.group} ${styles[size]}`}>
        <input
              name={name}
              {...checkboxRegister}
              type="checkbox"
              required={required}
              className={`${styles["icon"+size]}`}
        />
        <div className={`${styles.text} ${styles[size]}`}>{text}{required && <span style={{ color: 'red' }}>*</span>}</div>
      </div>
    </div>
    </>
  );
};
