import { Button } from './components/ButtonComponent/Button'
import './App.css'

function App() {

  return (
    <>
      <h1>Component</h1>

      <div className="button-container">
        <div className="button-row">
          <Button text="Button" state="solid" size="sm"/>
          <Button text="Button" state="solid" size="md"/>
          <Button text="Button" state="solid" size="lg"/>
        </div>

        <div className="button-row">
          <Button text="Button" state="solid" size="sm" disabled={true}/>
          <Button text="Button" state="solid" size="md" disabled={true}/>
          <Button text="Button" state="solid" size="lg" disabled={true}/>
        </div>

        <div className="button-row">
          <Button text="Button" state="outline" size="sm"/>
          <Button text="Button" state="outline" size="md"/>
          <Button text="Button" state="outline" size="lg"/>
        </div>

        <div className="button-row">
          <Button text="Button" state="outline" size="sm" disabled={true}/>
          <Button text="Button" state="outline" size="md" disabled={true}/>
          <Button text="Button" state="outline" size="lg" disabled={true}/>
        </div>
      </div>
    </>
  )
}

export default App
