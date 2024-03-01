import { Navbar } from "./components/NavbarComponent/Navbar";
import { Button } from "./components/ButtonComponent/Button";
import { InputField } from "./components/InputFieldComponent/InputField";
import { ListItem } from "./components/Q&AComponent/ListItem";
import { List } from "./components/Q&AComponent/List";
import { FooterWithLogo } from "./components/FooterComponent/Footer";
import { ApplicationUpload } from "./components/ApplicationUploadPage/ApplicationUpload";
import { Checkbox } from "./components/CheckboxComponent/CheckboxComponent";
import "./App.css";
import { Icon } from "./components/IconComponent/Icon";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { SignupPage } from "./components/SignupPage/SignupPage";
import { Alert } from "./components/AlertComponent/Alert";
import AlertContext, { AlertContextProps } from "./contexts/AlertContext";
import { useContext } from "react";

function App() {
  const { alert } = useContext(AlertContext) as AlertContextProps;
  /*for list*/
  const items = [
    "Are you committed to quality maintenance and friendly customer service?",
    "Do you have at least 3 bays in your workshop?",
    "Are you a full service workshop?",
    "Are you ready to benefit from branding with Castrol?",
  ];
  return (
    <>
      {alert && <Alert message={alert.message} type={alert.type} />}
      {/* <h1>Component</h1> */}
      <Navbar />
      <div className="appContainer">
        <div className="contentContainer">
          {/* <ApplicationUpload /> */}
          <LoginPage />
          {/* <SignupPage /> */}

          {/* <List items={items} size="small" /> 
<List items={items} size="large" />  
              <ListItem size="large" text="Are you committed to quality maintenance and friendly customer service?" />
    <ListItem size="small" text="Are you committed to quality maintenance and friendly customer service?" />  */}

          {/* <Checkbox size="small" text="I consent to having my data processed according to the privacy statement" value="Data Consent" />
        <Checkbox size="medium" text="I consent to having my data processed according to the privacy statement" value="Data Consent" />
          <Checkbox size="large" text="I consent to having my data processed according to the privacy statement" value="Data Consent" /> 
          <List items={items} size="large" />  */}
        </div>
        <FooterWithLogo />
      </div>
    </>
  );
}
{
  /* Buttons */
}
{
  /* <InputField type="text" label='Label' size='sm' isWrong={true}/> */
}
{
  /* <InputField type="text" label='Label' size='sm' isWrong={false}/>
      <InputField type="text" label='Label' size='sm' isWrong={true}/>
      <InputField type="password" label='Label' size='md' isWrong={true}/>
      <InputField type="password" label='Label' size='lg' isWrong={false}/> */
}

{
  /* <Checkbox size="small" text="I consent to having my data processed according to the privacy statement" />
    <Checkbox size="medium" text="I consent to having my data processed according to the privacy statement" />
    <Checkbox size="large" text="I consent to having my data processed according to the privacy statement" /> */
}

{
  /*<FooterWithLogo />*/
}

export default App;
