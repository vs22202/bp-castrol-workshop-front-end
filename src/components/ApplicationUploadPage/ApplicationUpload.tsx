import React from "react";
import { Checkbox } from "../CheckboxComponent/CheckboxComponent";
import { InputField } from "../InputFieldComponent/InputField";
import { Button } from "../ButtonComponent/Button";
import {useForm, SubmitHandler, Controller} from 'react-hook-form'
import { Input } from "components/FormInputs";
import inputs from './ApplicationUploadFormDataFields'


const ApplicationUpload: React.FC = () =>{

  const {register, handleSubmit, formState:{errors}, control} = useForm<Input>();
  

  const renderInput = (input:Input)=>{
    switch(input.type){
      case "checkbox":
        return(
              <Checkbox
                key={input.id}
                name={input.name}
                size={input.size? input.size : "medium"}
                text={input.label}
                register={register}
                //OnChange={(e)=>field.onChange(e.target.checked)}
                //checked={field.value}
              />
        );
      case "text":
        return (
          <>
          <InputField 
            key={input.id}
            //type="text"
            type={input.text_type ? input.text_type : "text"}
            name={input.name}
            label={input.label}
            size={input.size? input.size:"medium"}
            register={register}
            maxlen={input.maxlen}
            errors={errors}
            placeholder={input.placeholder}

            /* input field validation conditions */
            validationSchema={{
              required: input.required,
              minLength: {
                value: input.minlen,
                message: input.errorMessage
              },
              maxLength: {
                value: input.maxlen,
                message: input.errorMessage
              },
              pattern: {
                value: input.pattern,
                message: `${input.label} format is wrong.`
              }
            }}
          />
          </>
        );
      default:
        //file/image upload inputs
  
    }
  }


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
       {inputs.map(renderInput)}
         <Button text="Submit" size="sm" type="solid" iconimg="submitW"/>
      </form>
    </div>
    </div>
    </div>
  )
}

export {ApplicationUpload} 

