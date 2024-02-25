// CheckboxComponent.tsx
import styles from "./CheckboxComponent.module.css";

export type CheckboxProps = {
  name:string;
  size: "small" | "medium" | "large";
  text: string;
  required?:boolean;
  register:any;
  value?:boolean;
  errors?:any;
}

export function Checkbox({name, size, text, required=false, register, errors} : CheckboxProps){
   const checkboxRegister = register(name)
  
  return (
    <>
    <div
      className={`${styles[size]}`}
      id={name}
    >
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
