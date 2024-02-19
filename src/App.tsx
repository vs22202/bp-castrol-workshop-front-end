import { Button } from './components/ButtonComponent/Button'
import {InputField} from './components/InputFieldComponent/InputField'
import './App.css'

function App() {

  const checkboxtext = "I consent to having my data processed according to the privacy statement"

  return (
    <>
      <h1>Component</h1>

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

      {/* InputField */}
      <InputField type="text" label='Label' size='sm' isWrong={false}/>
      <InputField type="text" label='Label' size='sm' isWrong={true} required={true}/>
      <InputField type="password" label='Label' size='md' isWrong={true}/>
      <InputField type="password" label='Label' size='lg' isWrong={false}/>
    </>
  )
}

export default App
