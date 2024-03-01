// SignUpFormWithImage.tsx

import React, { useContext, useEffect, useState } from "react";
import { InputField } from '../InputFieldComponent/InputField';
import { Button } from "../ButtonComponent/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { renderInput } from "../FormFieldRenderLogic";
import inputs from './SignupPageFields';
import SignupImg from "../../assets/signup.svg";
import styles from './SignupPage.module.css';
import { SvgIcon } from "../IconComponent/SvgIcon";
import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";

const SignupPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm();
  const{ signup,generateOtp} = useContext(AuthContext) as AuthContextProps
    const [otpActivated, setOtpActivated] = useState(false);
    const [isAllFieldsValid, setIsAllFieldsValid] = useState(false);
    const [password, setPassword] = useState("");
    
    const email = watch("user_email_id")
    const pass = watch("user_password");
    const confirmpass = watch("user_password_confirm");
    const otp = /398392/; //should be as a regex

    useEffect(() => {
        // if all three fields are filled and valid, enables GET OTP button
        if (email && pass && confirmpass && Object.keys(errors).length === 0 && pass===confirmpass) {
            setIsAllFieldsValid(true);
        } else {
            setIsAllFieldsValid(false);
        }
    }, [email, pass, confirmpass, errors]);

    /* useEffect(()=>{
      if(pass){
        setPassword(pass);
        //password = pass;
      }
    }) */


    //Handles all three buttons
        //Get OTP Button
    async function getOtp(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        event.preventDefault()
      console.log(`Your OTP: ${otp}`);
      generateOtp(watch("user_email_id"))
      setOtpActivated(true);
        
    }

        //Login Button
    function handleLogin(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        event.preventDefault()
        console.log("Redirect to login page...");
    }
        //Handles Signup Button
    const handleSignup: SubmitHandler<Record<string, any>> = (data, event) => {
        event?.preventDefault();
        // Submit function for Application Upload form
      console.log(data);
      signup(data.user_email_id, data.user_password,data.otp);
    }


    //triggers validation as soon as input is given
    const handleInputChange = async (e:any) => {
        const name = e.target.name;
        await trigger(name);
      };
      

  return (
    <div className={`${styles.signupcontainer}`}>
      <div className={`${styles.imagecontainer} illustration`}>
        <SignupImg/>
      </div>
      <div className={`${styles.signupform}`}>
        <form onSubmit={handleSubmit(handleSignup)} onChange={handleInputChange}>
            <h1 style={{ color: 'rgba(0, 153, 0, 1)' , fontSize: '28px',textAlign: 'left', fontWeight:'700'  }}>
              SignUp
            </h1>
            <h2 style={{ color: 'rgba(102, 102, 102, 1)' , fontSize: '20px',textAlign: 'left' }}>
              Join the Castrol Community and take your workshop to the next level!
            </h2>
           {inputs.map(input => renderInput(input, { register, errors, /* watch */ }))}

        {/* this div will be rendered here itself */}
          <div style={{ display: 'flex', alignItems: 'center',gap:"20px" }}>
            <InputField
                type="text" 
                name="otp" 
                label="OTP" 
                size="medium"
                placeholder="Enter OTP"
                maxlen={6}
                //required = {true}
                register={register}
                errors={errors}
                isDisabled={!otpActivated}
                validationSchema={{
                        required: true,
                        minLength: {
                            value: 6,
                            message: "Enter 6 digit OTP."
                        },
                        maxLength: {
                            value: 6,
                            message: "Enter 6 digit OTP."
                        },
                        // pattern: {
                        //     value: otp,
                        //     message: "Incorrect OTP."
                        // }
                }}
            />
            <Button 
                text="Get OTP" 
                size="md" 
                type="solid"
                onClick={getOtp}
                disabled={!isAllFieldsValid}
             />
          </div>
            <div className={`${styles.buttonscontainer}`}>
                <Button text="SignUp" size="md" type="solid" iconimg="signup_icon" action="submit"/>
                <span>or</span>
                <span>Already have an account?</span>
                <Button text="Login" size="md" type="outline" iconimg="login_icon" onClick={handleLogin}/>
            </div>
        </form>
      </div>
    </div>
  );
};


export { SignupPage };