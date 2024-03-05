import { Input } from "../../components/FormInputs";

const LoginPageFields: Input[] = [{
    id: 1,
    size:"medium",
    name: "user_email_id",
    type: "text",
    text_type: "string",
    placeholder: "raj_car@gmail.com",
    label: "Enter Email ID",
    datatestid:'loginemailid',
    required: true,
},
{
    id: 2,
    size:"medium",
    name: "user_password",
    type: "text",
    text_type: "password",
    placeholder: "Enter password here",
    label: "Enter Password",
    datatestid:'loginpassword',
    required: true,
},
{
    id: 3,
    size:"medium",
    name: "remember_me?",
    type: "checkbox",
    label: "Remember me?",
    errorMessage:"remember me error",
    required: true,
},
]

  export default LoginPageFields;