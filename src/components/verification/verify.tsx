import React from "react";
import { Button } from "../ButtonComponent/Button";
import verifyImg from "../../assets/verificationMail.svg";
import './verification.css';

interface VerifyWithImageProps {
  onSubmit: () => void;
}

const VerifyWithImage: React.FC<VerifyWithImageProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="verify-container">
      <div className="image-container">
        <img src={verifyImg} alt="verify Img" />
      </div>
      <div className="verify-form">
        <form onSubmit={handleSubmit}>
          <div style={{ backgroundColor: '#E6E6E6', fontSize: '25px', textAlign: 'center', padding: '10px 10px 10px 10px', fontWeight: 'bold' }}>
            Please verify your Email to login
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Button text="Login" type="solid" size="lg" iconimg="loginW" disabled={true} />
          </div>
        </form>
      </div>
    </div>
  );
};

export { VerifyWithImage };
