// LoginFormWithImage.tsx

import React from "react";
import { Button } from "../ButtonComponent/Button";
import loginimg from "../../assets/login.svg";
import inputs from "./LoginPageFields"
import styles from './LoginPage.module.css';
import { SubmitHandler, useForm } from "react-hook-form";
import { renderInput } from "../FormFieldRenderLogic";


const LoginPage: React.FC = () => {
    const {register, handleSubmit, formState:{errors}, trigger} = useForm();

    //triggers validation as soon as the input is given
    const handleInputChange = async(e:any) =>{
      const name = e.target.name;
      await trigger(name);
    }

    //HandlesSignup Button click
    const handleSignup = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      event.preventDefault();
      console.log("redirecting to Signup page...")
    }

    //Handles Login Button click
    const handleLogin: SubmitHandler<Record<string, any>> = (data) => {
        console.log(data);
    }

  return(
    <>
    <div className={`${styles.logincontainer}`}>
      <div className={`${styles.imagecontainer}`}>
        <img src={loginimg} alt="login" />
      </div>
        <div className={`${styles.loginform}`}>
            <div className="formContainer">
                <form onSubmit={handleSubmit(handleLogin)} onChange={handleInputChange}>
                    <h1 style={{ color: 'rgba(0, 153, 0, 1)' , fontSize: '28px',textAlign: 'left', fontWeight: 'bold'  }}>
                        Login
                    </h1>
                    <h2 style={{ color: 'rgba(102, 102, 102, 1)' , fontSize: '20px',textAlign: 'left' }}>
                        Welcome back to the Castrol Community!
                    </h2> 
                    {inputs.map(input => renderInput(input, { register, errors }))}
                    <div className={`${styles.buttonscontainer}`}>
                        <Button text="Login" size="md" type="solid" iconimg="loginW"/>
                        <span>or</span>
                        <span>New to Castrol?</span>
                        <Button text="SignUp" size="md" type="outline" iconimg="signupG" onClick={handleSignup}/>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
};

export { LoginPage }