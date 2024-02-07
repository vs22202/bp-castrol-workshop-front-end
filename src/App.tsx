import { Button } from './components/ButtonComponent/Button'
import './App.css'

function App() {

  return (
    <>
      <h1>Component</h1>

      <div className="button-container">
        <div className="button-row">
          <Button state="active" size="sm"/>
          <Button state="active" size="md"/>
          <Button state="active" size="lg"/>
        </div>

        <div className="button-row">
          <Button state="hover" size="sm"/>
          <Button state="hover" size="md"/>
          <Button state="hover" size="lg"/>
        </div>

        <div className="button-row">
          <Button state="disabled" size="sm"/>
          <Button state="disabled" size="md"/>
          <Button state="disabled" size="lg"/>
        </div>

        <div className="button-row">
          <Button solid={false} state="active" size="sm"/>
          <Button solid={false}  state="active" size="md"/>
          <Button solid={false} state="active" size="lg"/>
        </div>

        <div className="button-row">
          <Button solid={false} state="hover" size="sm"/>
          <Button solid={false} state="hover" size="md"/>
          <Button solid={false} state="hover" size="lg"/>
        </div>

        <div className="button-row">
          <Button solid={false} state="disabled" size="sm"/>
          <Button solid={false} state="disabled" size="md"/>
          <Button solid={false} state="disabled" size="lg"/>
        </div>
      </div>
    </>
  )
}

export default App
