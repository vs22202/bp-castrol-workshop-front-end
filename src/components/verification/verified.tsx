import React from "react";
import { Button } from "../ButtonComponent/Button";
import verifyImg from "../../assets/verificationMail.svg";
import './verification.css';

interface VerifyWithImageProps {
  onSubmit: () => void;
}

const VerifiedWithImage: React.FC<VerifyWithImageProps> = ({ onSubmit }) => {

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
          
          <div style={{ backgroundColor: '#E6E6E6', fontSize: '25px',textAlign: 'center', padding: '10px 10px 10px 10px', fontWeight: 'bold' }}>
             Your Email has been verified
            </div> 
          <div style={{ padding: '10px 20px 10px 10px' }}>
            <p style={{ color: 'rgba(102, 102, 102, 1)', fontSize: '20px', textAlign: 'center', fontWeight: 'bold' }}>
              You can login now!
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0px' }}>
            <Button text="Login" type="solid" size="lg" iconimg="loginW" />
          </div>
         
          </form>
      </div>
    </div>
  );
};

export { VerifiedWithImage };
