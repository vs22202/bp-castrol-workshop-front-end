import { Option } from "../components/DropDownComponent/Option";
export interface Input {
  id: number;
  name: string;
  type: string; //numbers like phone numbers and pincode or otp are included as a "text"
  text_type?: string;
  value?: string;
  placeholder?: string;
  errorMessage?: string;
  label: string;
  compulsorylist?: Option[] | undefined;
  optionlist?: Option[] | undefined;
  pattern?: RegExp;
  required?: boolean;
  maxlen?: number;
  minlen?: number;
  size?: "small" | "medium" | "large";
}
export interface ApplicationInputFields {
  application_id?: number;
  workshop_name: string;
  workshop_post_code: string;
  address: string;
  state: string;
  city: string;
  user_name: string;
  user_email: string;
  user_mobile: number;
  bay_count: number;
  services_offered: string;
  expertise: string;
  brands: string;
  consent_process_data: boolean;
  consent_being_contacted: boolean;
  consent_receive_info: boolean;
  file_paths: string;
  files:File[];
  application_status: string;
  last_modified_date: string;
}
