import { Option } from "../components/DropDownComponent/Option";
export interface Input {
    id: number;
    name: string;
    type: string; //numbers like phone numbers and pincode or otp are included as a "text"
    text_type?:string;
    value?:string;
    placeholder?: string;
    errorMessage?: string;
    label: string;
    compulsorylist?: Option[] | undefined;
    optionlist?: Option[] | undefined;
    pattern?: RegExp;
    required?: boolean;
    maxlen?:number;
    minlen?:number;
    size?:"small" | "medium" | "large";
  }