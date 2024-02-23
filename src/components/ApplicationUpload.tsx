import React, { ChangeEvent, FormEvent, useState } from "react";
import {InputField} from '../../src/components/InputFieldComponent/InputField'
import {Icon} from '../../src/components/IconComponent/Icon'
import {Checkbox} from '../../src/components/CheckboxComponent/CheckboxComponent'
import { Button } from "./ButtonComponent/Button";
interface Input {
  id: number;
  name: string;
  type: string;
  placeholder?: string;
  errorMessage?: string;
  label: string;
  pattern?: string;
  required?: boolean;
}

interface FormValues {
    [key: string]: string | number | boolean | string[]; // Updated index signature
  }

const ApplicationUpload: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    workshop_name: "",
    workshop_post_code: "",
    address:"",
    state: "",
    city: "",
    user_name: "",
    user_email: "",
    user_mobile: "",
    bay_count: "",
    services_offered: "",
    expertise: "",
    brands: "",
    consent_process_data: false,
    consent_being_contacted: false,
    consent_receive_info: false,
    file_paths: []

  });

  const inputs: Input[] =[
    {
        id: 1,
        name: "workshop_name",
        type: "text",
        placeholder: "Raj's Car Shop",
        errorMessage:
            "Workshop name should be 3-16 characters and shouldn't include any special character and Numbers!",
        label: "Workshop name",
        pattern: "^[A-Za-z]{3,16}$",
        required: true,
    },
    {
        id: 2,
        name: "workshop_post_code",
        type: "text",
        placeholder: "600062",
        errorMessage: "It should be a valid postcode!",
        label: "Workshop postcode",
        required: true,
    },
    {
        id: 3,
        name: "address",
        type: "text",
        placeholder: "Abj 11th cross street, silk mill",
        errorMessage: "It should be a valid address!",
        label: "Address",
        pattern: "/^[a-zA-Z0-9 ,.-]+$/",
        required: true,
    },
    {
        id: 4,
        name: "state",
        type: "text",
        placeholder: "Tamil Nadu",
        errorMessage:
            "It should be a valid state!",
        label: "State",
        pattern: "/^[A-Za-z\s]+$/",
        required: true,
    },
    {
        id: 5,
        name: "city",
        type: "text",
        placeholder: "Vellore",
        errorMessage: "It should be a valid City!",
        label: "City",
        pattern: "/^[A-Za-z\s]+$/",// only alphabets allowed
        required: true,
    },
    {
        id: 6,
        name: "user_name",
        type: "text",
        placeholder: "Rajesh",
        errorMessage: "Workshop name should be 3-16 characters and shouldn't include any special character and Numbers!",
        label: "Your Name",
        pattern: "^[A-Za-z]{3,16}$",
        required: true,
    },
    {
        id: 7,
        name: "user_email",
        type: "email",
        placeholder: "raj_car@gmail.com",
        errorMessage:"It should be a valid email address!",
        label: "Your Email",
        required: true,
    },
    {
        id: 8,
        name: "user_mobile",
        type: "number",
        placeholder: "044-2222-1234",
        errorMessage: "Mobile No. should be 10 digit!",
        label: "Your telephone number",
        pattern: `^[0-9]{10-10}$`,
        required: true,
    },
    {
        id: 9,
        name: "bay_count",
        type: "number",
        placeholder: "4",
        errorMessage: "Please enter a valid number of bays!",
        label: "Number of bays in your workshop",
        required: true,
    },
    {
        id: 10,
        name: "services_offered",
        type: "text",
        placeholder: "Bodywork, Paint Jobs",
        errorMessage:"Please enter a valid services that are offered",
        label: "Services Offered",
        required: true,
    },
    {
        id: 11,
        name: "expertise",
        type: "text",
        placeholder: "German Cars",
        errorMessage: "It should be a valid expertise!",
        label: "Expertise",
        // pattern: "/^[A-Za-z\s]+$/",// only alphabets allowed
        required: true,
    },
    {
        id: 12,
        name: "brands",
        type: "text",
        placeholder: "ABC,BCA",
        errorMessage: "Workshop name should be 3-16 characters and shouldn't include any special character and Numbers!",
        label: "Manufacturer Specializations",
        // pattern: "^[A-Za-z]{3,16}$",
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
  ];


  const handleInputChange = (name: string, value: string| number|boolean|string[]) => {
    // console.log(`Checkbox with value ${name} is now ${value? "checked" : "unchecked"}`);
    // console.log(`Input Field with value ${name} is now ${value}`);
    setValues({ ...values, [name]: value });
  };

  const renderInput = (input: Input) => {
    switch (input.type) {
      case "checkbox":
        return (
          <Checkbox 
          key={input.id}
          text={input.label}
          size="medium"
          value={input.name}
          // Pass a callback to handle state change
          onCheckboxChange={(value, isChecked) => handleInputChange(value, isChecked)}
          />
        );
      case "string[]":
        return (
          <InputField // it will be file upload 
          key={input.id}
          label={input.label}
          // value={values[input.name] as string[]}
          onChange={(value) => handleInputChange(input.name, value)}
          />
        );
      default:
        return (
          <InputField 
          key={input.id}
          type={input.type as "number" | "text" | "password" | "disabled"}
          label={input.label}
          value={values[input.name] as string}
          onChange={(value) => handleInputChange(input.name, value)}
          />
        );
    }
  };

  const postData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { workshop_name, workshop_post_code, address, state, city, user_name, user_email, user_mobile, bay_count, services_offered, expertise, brands, consent_process_data, consent_being_contacted, consent_receive_info, file_paths } = values;
    const res = await fetch("http://localhost:5173/applicationupload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workshop_name, workshop_post_code, address, state, city, user_name, user_email, user_mobile, bay_count, services_offered, expertise, brands, consent_process_data, consent_being_contacted, consent_receive_info, file_paths
      }),
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("invalid");
    } else {
      window.alert("Workshop Application Submitted");
    }
  };

  return (
    <div className="appContainer">
    <div className="contentContainer">
    <div className="formContainer">
      <form method="POST" onSubmit={postData}>
      <h1 style={{ color: 'rgba(0, 153, 0, 1)' , fontSize: '28px',textAlign: 'left', fontWeight: 'bold'  }}>
        Certified Castrol Workshop Application
      </h1>
      <h2 style={{ color: 'rgba(102, 102, 102, 1)' , fontSize: '20px',textAlign: 'left' }}>
      Take your workshop to the next level!
      </h2>
      
      {inputs.map((input) => renderInput(input))}
        <Button text="Submit" size="sm" type="solid" iconimg="submitW" />
      </form>
    </div>
    </div>
    </div>
  );
};

export {ApplicationUpload};
