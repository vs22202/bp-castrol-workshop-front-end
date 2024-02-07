import { Button } from './components/ButtonComponent/Button'
import './App.css'

function App() {

  return (
    <>
      <h1>Component</h1>

      <div className="button-container">
        <div className="button-row">
          <Button state="activesolid" size="sm"/>
          <Button state="activesolid" size="md"/>
          <Button state="activesolid" size="lg"/>
        </div>

        <div className="button-row">
          <Button state="hoversolid" size="sm"/>
          <Button state="hoversolid" size="md"/>
          <Button state="hoversolid" size="lg"/>
        </div>

        <div className="button-row">
          <Button state="disabledsolid" size="sm"/>
          <Button state="disabledsolid" size="md"/>
          <Button state="disabledsolid" size="lg"/>
        </div>

        <div className="button-row">
          <Button state="activeoutline" size="sm"/>
          <Button  state="activeoutline" size="md"/>
          <Button state="activeoutline" size="lg"/>
        </div>

        <div className="button-row">
          <Button state="hoveroutline" size="sm"/>
          <Button state="hoveroutline" size="md"/>
          <Button state="hoveroutline" size="lg"/>
        </div>

        <div className="button-row">
          <Button state="disabledoutline" size="sm"/>
          <Button state="disabledoutline" size="md"/>
          <Button state="disabledoutline" size="lg"/>
        </div>
      </div>
    </>
  )
}

export default App
