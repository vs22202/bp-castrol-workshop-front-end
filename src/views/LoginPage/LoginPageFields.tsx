import { Input } from "../../components/FormInputs";

const LoginPageFields: Input[] = [
  {
    id: 0,
    size: "medium",
    name: "user_id",
    type: "text",
    text_type: "string",
    placeholder: "raj_car@gmail.com/919623009234",
    label: "Email ID / Phone Number",
    datatestid: "loginuserid",
    required: true,
  },
  {
    id: 1,
    size: "medium",
    name: "user_email_id",
    type: "hidden",
    text_type: "hidden",
    placeholder: "raj_car@gmail.com",
    label: "Email ID",
    datatestid: "loginemailid",
    required: false,
  },
  {
    id: 4,
    size: "medium",
    name: "user_mobile",
    type: "hidden",
    text_type: "hidden",
    placeholder: "9612347132",
    label: "Mobile Number",
    datatestid: "loginemobileno",
    required: false,
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
