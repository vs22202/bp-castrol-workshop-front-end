import {Navbar} from "./components/Navbar/navbar";
import { Button } from './components/ButtonComponent/Button'
import {InputField} from './components/InputFieldComponent/InputField'
import { ListItem } from "./components/Q&AComponent/ListItem";
import { List } from "./components/Q&AComponent/List";
import {FooterWithLogo} from "./components/FooterComponent/Footer"
import { Checkbox } from "./components/CheckboxComponent/CheckboxComponent";
import './App.css'


function App() {

  /*for list
  const items = ['Are you committed to quality maintenance and friendly customer service?', 'Do you have at least 3 bays in your workshop?', 'Are you a full service workshop?', 'Are you ready to benefit from branding with Castrol?'];*/

  return (
    <>
      {/* <h1>Component</h1> */}

      < Navbar/>

      {/* Buttons */}
      {/* <div className="button-container">
        <div className="button-row">
          <Button text="Button" type="solid" size="sm"/>
          <Button text="Button" type="solid" size="md"/>
          <Button text="Button" type="solid" size="lg"/>
        </div>

        <div className="button-row">
          <Button text="Button" type="solid" size="sm" disabled={true}/>
          <Button text="Button" type="solid" size="md" disabled={true}/>
          <Button text="Button" type="solid" size="lg" disabled={true}/>
        </div>

        <div className="button-row">
          <Button text="Button" type="outline" size="sm"/>
          <Button text="Button" type="outline" size="md"/>
          <Button text="Button" type="outline" size="lg"/>
        </div>

        <div className="button-row">
          <Button text="Button" type="outline" size="sm" disabled={true}/>
          <Button text="Button" type="outline" size="md" disabled={true}/>
          <Button text="Button" type="outline" size="lg" disabled={true}/>
        </div>
      </div> */}
      <InputField type="text" label='Label' size='sm' isWrong={true}/>
      {/* <InputField type="text" label='Label' size='sm' isWrong={false}/>
      <InputField type="text" label='Label' size='sm' isWrong={true}/>
      <InputField type="password" label='Label' size='md' isWrong={true}/>
      <InputField type="password" label='Label' size='lg' isWrong={false}/> */}

    {
    /*List-QnA*/
    /* <div>
      <List items={items} size="large" />
    </div>
    <div>
      <List items={items} size="small" />
    </div> */}


 {/* <Checkbox size="small" text="I consent to having my data processed according to the privacy statement" />
    <Checkbox size="medium" text="I consent to having my data processed according to the privacy statement" />
    <Checkbox size="large" text="I consent to having my data processed according to the privacy statement" /> */}

    { /*<FooterWithLogo />*/ }

    {/* <ListItem size="large" text="Are you committed to quality maintenance and friendly customer service?" />
    <ListItem size="small" text="Are you committed to quality maintenance and friendly customer service?" /> */}

    </>
  )
}

export default App
