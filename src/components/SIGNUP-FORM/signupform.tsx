// SignUpFormWithImage.tsx

import React, { useState } from "react";
import { InputField } from '../InputFieldComponent/InputField';
import { Button } from "../ButtonComponent/Button";

import signupimg from "../../assets/signup.svg";

import './signupform.css'; // Import a CSS file for styling (create SignUpFormWithImage.css in the same directory)

interface SignUpFormWithImageProps {
  onSubmit: (formData: { email: string; password: string; confirmPassword: string; otp: string }) => void;
}

const SignUpFormWithImage: React.FC<SignUpFormWithImageProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="signup-container">
      <div className="image-container">
        <img src={signupimg} alt="Signup" />
      </div>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <div>
            <h1 style={{ color: 'rgba(0, 153, 0, 1)', fontSize: '38px', textAlign: 'left', fontWeight: 'bold', padding: '0px 20px 10px 10px' }}>
              SignUp
            </h1>
          </div>
          <div>
            <h1 style={{ color: 'rgba(102, 102, 102, 1)', fontSize: '20px', textAlign: 'left', fontWeight: 'bold', padding: '0px 20px 10px 10px' }}>
              Join the Castrol Community and take your workshop to the next level!
            </h1>
          </div>
          <div>
            <InputField type="email" id="email" name="email" label="Email ID" size="lg" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <InputField type="password" id="password" name="password" size="lg" label="Password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <InputField type="password" id="confirmPassword" name="confirmPassword" size="lg" label="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <InputField type="text" id="otp" name="otp" label="OTP" size="lg" value={formData.otp} onChange={handleChange} required style={{ width: 'calc(70% - 10px)' }} />
            <Button text="Get OTP" size="lg" type="solid" style={{ marginLeft: '10px', width: '30%' }} />
          </div>
          <div style={{ padding: '0px 50px 10px 10px' }}>
            <Button text="SignUp" type="solid" size="md" iconimg="signupW" />
          </div>
          <div>
            <h2 style={{ color: 'rgba(102, 102, 102, 1)', fontSize: '18px', textAlign: 'left', paddingLeft: '100px', fontWeight: 'bold' }}>
              or
            </h2>
            <h2 style={{ color: 'rgba(102, 102, 102, 1)', fontSize: '18px', textAlign: 'left', fontWeight: 'bold', padding: '0px 20px 10px 10px' }}>
              Already have an account?
            </h2>
          </div>
          <div style={{ padding: '0px 50px 10px 10px' }}>
            <Button text="Login" size="md" type="outline" iconimg="loginG" />
          </div>
        </form>
      </div>
    </div>
  );
};

export { SignUpFormWithImage };
