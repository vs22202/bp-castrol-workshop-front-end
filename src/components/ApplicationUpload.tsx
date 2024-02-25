import React from "react";
import { Checkbox } from "./CheckboxComponent/CheckboxComponent";
import { InputField } from "./InputFieldComponent/InputField";
import { Button } from "./ButtonComponent/Button";
import {useForm, SubmitHandler, Controller} from 'react-hook-form'

type Input = {
  id: number;
  name: string;
  type: string;
  text_type?:string;
  value?:string;
  placeholder?: string;
  errorMessage?: string;
  label: string;
  pattern?: RegExp;
  required?: boolean;
  maxlen?:number;
  minlen?:number;
}


const ApplicationUpload: React.FC = () =>{

  const {register, handleSubmit, formState:{errors}, control} = useForm<Input>();

  //input fields can be : text, password, phone number, email id, number, 
  const inputs: Input[] = [{
    id: 1,
    name: "workshop_name",
    type: "text",
    text_type: "string",
    placeholder: "Raj's Car Shop",
    errorMessage:
        "Workshop name should be 3-16 characters and shouldn't include any special character and Numbers!",
    label: "Workshop name",
    minlen:3,
    maxlen:16,
    pattern: /^[A-Za-z,' ]{3,16}$/,
    required: true,
},
{
    id: 2,
    name: "workshop_post_code",
    type: "text",
    text_type: "number",
    placeholder: "600062",
    pattern: /^\d{6}$/,
    minlen:6,
    maxlen:6,
    errorMessage: "It should be a valid postcode!",
    label: "Workshop postcode",
    required: true,
},
{
    id: 3,
    name: "address",
    type: "text",
    text_type:"string",
    placeholder: "Abj 11th cross street, silk mill",
    errorMessage: "It should be a valid address!",
    label: "Address",
    minlen: 15,
    maxlen:1000,
    pattern: /^[a-zA-Z0-9 ,.-]+$/,
    required: true,
},
{
    id: 4,
    name: "state",
    type: "text",
    text_type:"string",
    placeholder: "Tamil Nadu",
    errorMessage:
        "It should be a valid state!",
    label: "State",
    minlen:3,
    maxlen:50,
    pattern: /^[A-Za-z\s]+$/,
    required: true,
},
{
    id: 5,
    name: "city",
    type: "text",
    text_type:"string",
    placeholder: "Vellore",
    errorMessage: "It should be a valid City!",
    label: "City",
    minlen:3,
    maxlen:100,
    pattern: /^[A-Za-z\s]+$/,// only alphabets allowed
    required: true,
},
{
    id: 6,
    name: "user_name",
    type: "text",
    text_type:"string",
    placeholder: "Rajesh",
    errorMessage: "Workshop name should be 3-16 characters and shouldn't include any special character and Numbers!",
    label: "Your Name",
    minlen:3,
    maxlen:16,
    pattern: /^[A-Za-z\s]{3,16}$/,
    required: true,
},
{
    id: 7,
    name: "user_email",
    type: "text",
    text_type:"email",
    placeholder: "raj_car@gmail.com",
    errorMessage:"It should be a valid email address!",
    label: "Your Email",
    minlen:5,
    maxlen:100,
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    required: true,
},
{
    id: 8,
    name: "user_mobile",
    type: "text",
    text_type:"string",
    placeholder: "044-2222-1234",
    errorMessage: "Mobile No. should be 11-12 digit(including country code)!",
    label: "Your telephone number",
    //minlen:15,
    //maxlen:16,
    //pattern:/^\+\d{1,2}\ \d{3}-\d{3}-\d{4}$/,
    minlen:11,
    maxlen:12,
    pattern:   /\d{11,12}/,
    required: true,
},
{
    id: 9,
    name: "bay_count",
    type: "text",
    text_type:"number",
    placeholder: "4",
    errorMessage: "Please enter a valid number of bays!",
    label: "Number of bays in your workshop",
    pattern:/\d{1,10}/,
    minlen:1,
    maxlen:10,
    required: true,
},
{
    id: 10,
    name: "services_offered",
    type: "text",
    text_type:"string",
    placeholder: "Bodywork, Paint Jobs",
    errorMessage:"Please enter a valid services that are offered",
    label: "Services Offered",
    pattern: /^[^0-9]*$/,
    minlen:5,
    maxlen:1000,
    required: true,
},
{
    id: 11,
    name: "expertise",
    type: "text",
    text_type:"string",
    placeholder: "German Cars",
    errorMessage: "It should be a valid expertise!",
    label: "Expertise",
    pattern: /^[A-Za-z\s]+$/,// only alphabets allowed
    minlen:5,
    maxlen:1000,
    required: true,
},
{
    id: 12,
    name: "brands",
    type: "text",
    text_type:"string",
    placeholder: "ABC,BCA",
    errorMessage: "Workshop name should be 3-16 characters and shouldn't include any special character and Numbers!",
    label: "Manufacturer Specializations",
    pattern: /^[A-Za-z,\s]+$/,
    minlen:5,
    maxlen:1000,
    required: true,
},
{
    id: 13,
    name: "file_paths",
    type: "string[]",
    label: "File Upload",
    // pattern: "^[A-Za-z]{3,16}$",
    required: true,
},
{
    id: 14,
    name: "consent_process_data",
    type: "checkbox",
    label: "I consent to having my data processed according to the privacy statement",
    required: true,
},
{
    id: 15,
    name: "consent_being_contacted",
    type: "checkbox",
    label: "I consent to being contacted by a Castrol distributor for the purpose of discussing my interest in joining the Castrol network",
    required: true,
},
{
    id: 16,
    name: "consent_receive_info",
    type: "checkbox",
    label: "I am interested in receiving additional information by email on Castrol products or services from time to time",
    required: true,
},
  ]

  const renderInput = (input:Input)=>{
    switch(input.type){
      case "checkbox":
        return(
              <Checkbox
                key={input.id}
                name={input.name}
                size="medium"
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
            type="text"
            name={input.name}
            label={input.label}
            size="large"
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

