// LoginFormWithImage.tsx

import React from "react";
import { InputField } from '../InputFieldComponent/InputField';
import { Button } from "../ButtonComponent/Button";
import { Checkbox } from '../CheckboxComponent/CheckboxComponent';
import loginimg from "../../assets/login.svg";
import inputs from "./LoginPageFields"
import styles from './LoginPage.module.css';
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../FormInputs";


const LoginPage: React.FC = () => {
    const {register, handleSubmit, formState:{errors}} = useForm();

    const submitForm: SubmitHandler<Record<string, any>> = (data) => {
        // Submit function for Application Upload form
        console.log(data);
    }

    const renderInput = (input:Input)=>{
        switch(input.type){
          case "checkbox":
            return(
                  <Checkbox
                    key={input.id}
                    name={input.name}
                    size={input.size? input.size : "medium"}
                    text={input.label}
                    register={register}
                    //OnChange={(e)=>field.onChange(e.target.checked)}
                    //checked={field.value}
                  />
            );
          case "text":
            return (
              <>
              <InputField 
                key={input.id}
                //type="text"
                type={input.text_type ? input.text_type : "text"}
                name={input.name}
                label={input.label}
                size={input.size? input.size : "medium"}
                register={register}
                maxlen={input.maxlen}
                errors={errors}
                placeholder={input.placeholder}
    
                /* input field validation conditions */
                validationSchema={{
                  required: input.required,
                  minLength: {
                    value: input.minlen,
                    message: input.errorMessage
                  },
                  maxLength: {
                    value: input.maxlen,
                    message: input.errorMessage
                  },
                  pattern: {
                    value: input.pattern,
                    message: input.errorMessage
                  }
                }}
              />
              </>
            );
          default:
            //file/image upload inputs
      
        }
      }
  return(
    <>
    <div className={`${styles.logincontainer}`}>
      <div className={`${styles.imagecontainer}`}>
        <img src={loginimg} alt="login" />
      </div>
        <div className={`${styles.loginform}`}>
            <div className="formContainer">
                <form onSubmit={handleSubmit(submitForm)}>
                    <h1 style={{ color: 'rgba(0, 153, 0, 1)' , fontSize: '28px',textAlign: 'left', fontWeight: 'bold'  }}>
                        Login
                    </h1>
                    <h2 style={{ color: 'rgba(102, 102, 102, 1)' , fontSize: '20px',textAlign: 'left' }}>
                        Welcome back to the Castrol Community!
                    </h2> 
                    {inputs.map(renderInput)}
                    <div className={`${styles.buttonscontainer}`}>
                        <Button text="Login" size="sm" type="solid" iconimg="loginW"/>
                        <span>or</span>
                        <span>New to Castrol?</span>
                        <Button text="SignUp" size="sm" type="outline" iconimg="signupG"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
};

export { LoginPage }