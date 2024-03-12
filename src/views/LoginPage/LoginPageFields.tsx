import { Input } from "../../components/FormInputs";

const LoginPageFields: Input[] = [
  {
    id: 1,
    size: "medium",
    name: "user_email_id",
    type: "text",
    text_type: "string",
    placeholder: "raj_car@gmail.com",
    label: "Email ID",
    datatestid: "loginemailid",
    required: true,
  },
  {
    id: 4,
    size: "medium",
    name: "user_mobile",
    type: "text",
    text_type: "text",
    placeholder: "9612347132",
    label: "Mobile Number",
    datatestid: "loginemobileno",
    required: true,
  },
  {
    id: 2,
    size: "medium",
    name: "user_password",
    type: "text",
    text_type: "password",
    placeholder: "Password",
    label: "Password",
    datatestid: "loginpassword",
    required: true,
  },
  {
    id: 3,
    size: "medium",
    name: "remember_me?",
    type: "checkbox",
    label: "Remember me?",
    errorMessage: "remember me error",
    required: false,
  },
];

export default LoginPageFields;
