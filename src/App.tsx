import { Navbar } from "./components/Navbar/navbar";
import { Button } from "./components/ButtonComponent/Button";
import { InputField } from "./components/InputFieldComponent/InputField";
import { ListItem } from "./components/Q&AComponent/ListeItem";
import { FooterWithLogo } from "./components/FooterComponent/Footer";
import { Checkbox } from "./components/CheckboxComponent/CheckboxComponent";
import "./App.css";

function App() {
  const checkboxtext =
    "I consent to having my data processed according to the privacy statement";

  return (
    <>
      {/* <h1>Component</h1> */}
      <Navbar />
      <div className="appContainer">
        <div className="contentContainer">
        <Checkbox size="small" text="I consent to having my data processed according to the privacy statement" />
        <Checkbox size="medium" text="I consent to having my data processed according to the privacy statement" />
          <Checkbox size="large" text="I consent to having my data processed according to the privacy statement" /> 
          <ListItem  size="large" />
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
  /* 
      <div>
    <ListItem />
    </div>
    <div>
    <ListItem  size="large" />
    </div> */
}

{
  /* <Checkbox size="small" text="I consent to having my data processed according to the privacy statement" />
    <Checkbox size="medium" text="I consent to having my data processed according to the privacy statement" />
    <Checkbox size="large" text="I consent to having my data processed according to the privacy statement" /> */
}

export default App;
