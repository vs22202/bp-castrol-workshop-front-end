// LoginFormWithImage.tsx

import React, { useState } from "react";
import { InputField } from '../InputFieldComponent/InputField';
import { Button } from "../ButtonComponent/Button";
import { Checkbox } from '../CheckboxComponent/CheckboxComponent';

import loginimg from "../../assets/login.svg";

import './login.css'; // Import a CSS file for styling (create SignUpFormWithImage.css in the same directory)

interface LoginFormWithImageProps {
  onSubmit: (formData: { email: string; password: string; }) => void;
}

const LoginFormWithImage: React.FC<LoginFormWithImageProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '', 
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
    <div className="login-container">
      <div className="image-container">
        <img src={loginimg} alt="login" />
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div>
            <h1 style={{ color: 'rgba(0, 153, 0, 1)', fontSize: '38px', textAlign: 'left', fontWeight: 'bold', padding: '0px 20px 10px 10px' }}>
              Login
            </h1>
          </div>
          <div>
            <h1 style={{ color: 'rgba(102, 102, 102, 1)', fontSize: '20px', textAlign: 'left', fontWeight: 'bold', padding: '0px 20px 10px 10px' }}>
              Welcome back to the Castrol Community!
            </h1>
          </div>
          <div>
            <InputField type="email" id="email" name="email" label="Email ID" size="lg" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <InputField type="password" id="password" name="password" size="lg" label="Password" value={formData.password} onChange={handleChange} required />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 50px 10px 10px' }}>
            <div>
            <div style={{ display: 'flex'}}>
              <Checkbox  
                key="Remember me"
                type="checkbox"
                size="medium"
                value="Remember me"
                onChange={handleChange}
                style={{ color: 'rgba(102, 102, 102, 1)', fontSize: '10px',marginTop: '10px' }} // Add margin-top for spacing
              />
                <h1 style={{ color: 'rgba(102, 102, 102, 1)', fontSize: '20px', textAlign: 'left',marginTop: '10px', fontWeight: '500' }}>
                Remember me
            </h1>
            </div>
            </div>
            <div>
              <a href="/forgot-password" style={{ color: 'rgba(102, 102, 102, 1)', fontSize: '18px', textDecoration: 'none',fontWeight: 'bold' }}>Forgot Password?</a>
            </div>
          </div>
          <div style={{ padding: '0px 50px 10px 10px' }}>
            <Button text="Login" type="solid" size="md" iconimg="loginW" />
          </div>
          <div>
            <h2 style={{ color: 'rgba(102, 102, 102, 1)', fontSize: '18px', textAlign: 'left', paddingLeft: '50px', fontWeight: 'bold' }}>
              or
            </h2>
            <h2 style={{ color: 'rgba(102, 102, 102, 1)', fontSize: '18px', textAlign: 'left', fontWeight: 'bold', padding: '0px 20px 10px 10px' }}>
              New to Castrol?
            </h2>
          </div>
          <div style={{ padding: '0px 50px 10px 10px' }}>
            <Button text="SignUp" size="md" type="outline" iconimg="signupG" />
          </div>
        </form>
      </div>
    </div>
  );
};

export { LoginFormWithImage };
