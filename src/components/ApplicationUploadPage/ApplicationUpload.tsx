import React from "react";
import { Checkbox } from "../CheckboxComponent/CheckboxComponent";
import { InputField } from "../InputFieldComponent/InputField";
import { Button } from "../ButtonComponent/Button";
import {useForm, SubmitHandler} from 'react-hook-form'
import { Input } from "components/FormInputs";
import inputs from './ApplicationUploadFormFields'
import { renderInput } from "../FormFieldRenderLogic";


const ApplicationUpload: React.FC = () =>{

  const {register, handleSubmit, formState:{errors}} = useForm<Input>();

  const submitForm:SubmitHandler<Input> = (data) => {
    console.log(data) //submit funciton
  }


  return(
    <div className="appContainer">
    <div className="contentContainer">
    <div className="formContainer">
      <form onSubmit={handleSubmit(submitForm)}>
        <h1 style={{ color: 'rgba(0, 153, 0, 1)' , fontSize: '28px',textAlign: 'left', fontWeight: 'bold'  }}>
          Certified Castrol Workshop Application
        </h1>
        <h2 style={{ color: 'rgba(102, 102, 102, 1)' , fontSize: '20px',textAlign: 'left' }}>
          Take your workshop to the next level!
        </h2> 
        {inputs.map(input => renderInput(input, { register, errors }))}
        <Button text="Submit" size="sm" type="solid" iconimg="submitW"/>
      </form>
    </div>
    </div>
    </div>
  )
}

export {ApplicationUpload} 

