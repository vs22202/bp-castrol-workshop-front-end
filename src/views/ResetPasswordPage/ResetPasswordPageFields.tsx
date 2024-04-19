import { Input } from "../../components/FormInputs";

const ResetPasswordPageFields: Input[] = [
  {
    id: 0,
    size: "medium",
    name: "user_id",
    type: "text",
    text_type: "string",
    placeholder: "raj_car@gmail.com/919623009234",
    errorMessage: "Please enter a valid email Id / phone number(with country code).",
    label: "Email ID / Phone Number",
    minlen: 5,
    maxlen: 100,
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$|\d{12}/,
    datatestid: "signupuserid",
    required: true,
  },
  {
    id: 1,
    size: "medium",
    name: "user_email_id",
    type: "hidden",
    text_type: "hidden",
    placeholder: "raj_car@gmail.com",
    errorMessage: "Email address must be at least 5 characters long.",
    label: "Email ID",
    minlen: 5,
    maxlen: 100,
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    datatestid: "signupemailid",
    required: false,
  },
  {
    id: 4,
    size: "medium",
    name: "user_mobile",
    type: "hidden",
    text_type: "hidden",
    placeholder: "919612347132",
    errorMessage: "Mobile number should be of 12 digits including country code",
    label: "Mobile Number",
    pattern: /\d{12}/,
    datatestid: "singupemobileno",
    required: false,
  },
  {
    id: 2,
    size: "medium",
    name: "user_password",
    type: "text",
    text_type: "password",
    placeholder: "Enter password",
    pattern:
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:\"<>?`\-=[\];',./]).{10,100}$/, //contains 1-special char, capital letter, number and should have 10 to 100 characters
    minlen: 10,
    maxlen: 100,
    errorMessage:
      "Your password must contain at least 10 characters and include a mix of uppercase letters, lowercase letters, numbers, and special characters.",
    label: "Enter Password",
    datatestid: "signuppassword",
    required: true,
  },
  {
    id: 3,
    size: "medium",
    name: "user_password_confirm",
    type: "text",
    text_type: "password",
    placeholder: "Enter password",
    label: "Confirm Password",
    required: true,
    datatestid: "signuppasswordconfirm",
  },
];

export const checkboxInputs: Input[] = [
  {
    id: 5,
    size: "medium",
    name: "delete_warning",
    type: "checkbox",
    label:
      "I understand that changing my password will log me out in my other devices.",
    errorMessage: "remember me error",
    required: false,
  },
];
export default ResetPasswordPageFields;
