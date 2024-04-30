/**
 * Configuration for Signup Page Fields.
 * @typedef {Object} Input
 * @property {number} id - The unique identifier for the input field.
 * @property {"small"|"medium"|"large"} [size="medium"] - The size of the input field.
 * @property {string} name - The name of the input field.
 * @property {string} type - The type of input field (e.g., "text", "hidden").
 * @property {string} [text_type] - The specific type of text for the input field (e.g., "string", "password").
 * @property {string} [placeholder] - The placeholder text for the input field.
 * @property {string} [errorMessage] - The error message to display when input validation fails.
 * @property {string} label - The label text for the input field.
 * @property {Option[]} [compulsorylist] - The list of compulsory options for the input field.
 * @property {Option[]} [optionlist] - The list of options for the input field.
 * @property {RegExp} [pattern] - The regular expression pattern for input validation.
 * @property {boolean} [required=false] - Indicates whether the input field is required.
 * @property {number} [minlen] - The minimum length of input value allowed.
 * @property {number} [maxlen] - The maximum length of input value allowed.
 * @property {string} [datatestid] - The data-test-id attribute value for testing purposes.
 */

/**
 * @type {Input[]} SignupPageFields
 */

import { Input } from "../../components/FormInputs";

const SignupPageFields: Input[] = [
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
    placeholder: "Password",
    pattern:
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:\"<>?`\-=[\];',./]).{10,100}$/, //contains 1-special char, capital letter, number and should have 10 to 100 characters
    minlen: 10,
    maxlen: 100,
    errorMessage:
      "Your password must contain at least 10 characters and include a mix of uppercase letters, lowercase letters, numbers, and special characters.",
    label: "Password",
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

export default SignupPageFields;
