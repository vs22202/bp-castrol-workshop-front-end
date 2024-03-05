import { Input } from "../FormInputs";

const SignupPageFields: Input[] = [{
    id: 1,
    size:"medium",
    name: "user_email_id",
    type: "text",
    text_type: "string",
    placeholder: "raj_car@gmail.com",
    errorMessage:"email id should be of minimum 5 characters.",
    label: "Enter Email ID",
    minlen:5,
    maxlen:100,
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    datatestid:'signupemailid',
    required: true,
},
{
    id: 2,
    size:"medium",
    name: "user_password",
    type: "text",
    text_type: "password",
    placeholder: "Enter password",
    pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-_=+{}|;:'",.<>?]).{10,100}$/, //contains 1-special char, capital letter, number and should have 10 to 100 characters
    minlen:10,
    maxlen:100,
    errorMessage: "Password should be 10 characters long. Add special characters, number and Capital Letters.",
    label: "Enter Password",
    datatestid:'signuppassword',
    required: true,
},
{
    id: 3,
    size:"medium",
    name: "user_password_confirm",
    type: "text",
    text_type: "password",
    placeholder: "Enter password",
    //pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-_=+{}|;:'",.<>?]).{10,100}$/,//new RegExp(password as string) ,
    //minlen:10,
    //maxlen:100,
    //errorMessage: "Passwords do not match.",
    label: "Confirm Password",
    required: true,
    //customValidation: {(value)=>value === getValue("user_password")}
    datatestid:'signuppasswordconfirm'
},
]

  export default SignupPageFields;