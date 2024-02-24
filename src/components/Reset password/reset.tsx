import React, { useState } from "react";
import { InputField } from '../InputFieldComponent/InputField';
import { Button } from "../ButtonComponent/Button";

import { Checkbox } from '../CheckboxComponent/CheckboxComponent';

import resetimg from "../../assets/reset.svg";

import './reset.css'; // Import a CSS file for styling (create SignUpFormWithImage.css in the same directory)

interface ResetFormWithImageProps {
  onSubmit: (formData: { email: string; password: string; confirmPassword: string; otp: string }) => void;
}

const ResetFormWithImage: React.FC<ResetFormWithImageProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });

  const [otpSent, setOtpSent] = useState(false); // Track whether OTP has been sent

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetOtpClick = () => {
    // Logic to send OTP
    setOtpSent(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="reset-container">
      <div className="image-container">
        <img src={resetimg} alt="Reset" />
      </div>
      <div className="reset-form">
        <form onSubmit={handleSubmit}>
          <div>
            
            <div style={{ backgroundColor: '#E6E6E6', fontSize: '25px',textAlign: 'center', padding: '10px 10px 10px 10px', fontWeight: 'bold', marginTop: '10px' }}>
              OTP has been sent to your Email ID
            </div>
          

            <h1 style={{ color: 'rgba(0, 153, 0, 1)', fontSize: '38px', textAlign: 'left', fontWeight: 'bold', padding: '10px 20px 10px 10px' }}>
                Reset Password
            </h1>
          </div>
          <div>
            <h1 style={{ color: 'rgba(102, 102, 102, 1)', fontSize: '20px', textAlign: 'left', fontWeight: 'bold', padding: '10px 20px 10px 10px' }}>
                Enter the four digit OTP to reset your password.
            </h1>
          </div>
          <div>
            <InputField type="email" id="email" name="email" label="Email ID" size="lg" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div >
            <InputField type="text" id="otp" name="otp" label="Enter OTP" size="lg" value={formData.otp} onChange={handleChange} required  />
           
          </div>
          <div>
            <InputField type="password" id="password" name="password" size="lg" label="New Password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <InputField type="password" id="confirmPassword" name="confirmPassword" size="lg" label="Confirm New Password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <div style={{ display: 'flex', padding: '10px 20px 10px 10px'}}>
              <Checkbox  
                key="Consent"
                type="checkbox"
                size="large"
                value="Consent"
                onChange={handleChange}
                style={{ color: 'rgba(102, 102, 102, 1)', fontSize: '10px',marginTop: '10px', padding: '10px 20px 10px 10px' }} // Add margin-top for spacing
              />
                <h1 style={{ color: 'rgba(102, 102, 102, 1)', fontSize: '20px', textAlign: 'left', fontWeight: 'bold' }}>
                I understand that changing my password will log me out in my other devices.
            </h1>
            </div>
            <Button text="Reset Password" size="lg" type="solid" style={{ marginLeft: '10px', width: '30%', padding: '10px 20px 10px 10px' }} />
        </form>
      </div>
    </div>
  );
};

export { ResetFormWithImage };
