import { InputField } from "../components/InputFieldComponent/InputField";
import { Checkbox } from "../components/CheckboxComponent/CheckboxComponent";
import { Input } from "./FormInputs";
import {
  Control,
  Controller,
  FieldValues,
} from "react-hook-form";
import { DropDown } from "./DropDownComponent/DropDown";
import ListItem from "./Q&AComponent/ListItem";
import FileGrid from "./FileGridComponent/FileGrid";
import { useScreenSize } from "./ScreenSizeLogic";
import { Option } from "./DropDownComponent/Option";

export interface OptionsUtilsProps {
  services_offered: Option[];
  expertise: Option[];
}
export interface FileData {
  filename: string; type: string; fileurl: string; key: string;
}
interface FormUtilsProps {
  register: any;
  errors: any;
  control?: any;
  formMode?: string;
  existingOptionsList?: OptionsUtilsProps;
  existingFiles?: FileData[];
}


export const renderInput = (
  input: Input,
  {
    register,
    errors,
    control,
    formMode,
    existingOptionsList,
    existingFiles,
  }: FormUtilsProps
) => {
  const inputSize = useScreenSize();

  switch (input.type) {
    case "checkbox":
      return (
        <Checkbox
          key={input.id}
          name={input.name}
          //size={input.size ? input.size : "medium"}
          size={inputSize}
          text={input.label}
          register={register}
          errors={errors}
          validationSchema={{
            required: input.required,
          }}
          required={input.required}
        />
      );
    case "dropdown":
      let defaultValue;
      let optionsList: Option[] | undefined;
      if (formMode == "edit") {
        if (input.name == "services_offered") {
          defaultValue = existingOptionsList?.services_offered
            .map((option) => option.value)
            .join(",");
          optionsList = existingOptionsList?.services_offered.slice(
            input.compulsorylist?.length
          );
        } else {
          defaultValue = existingOptionsList?.expertise
            .map((option) => option.value)
            .join(",");
          optionsList = existingOptionsList?.expertise.slice(
            input.compulsorylist?.length
          );
        }
        defaultValue += input.compulsorylist
          ? input.compulsorylist.map((option) => option.value).join(",")
          : "";
      } else {
        defaultValue = input.compulsorylist
          ? input.compulsorylist.map((option) => option.value).join(",")
          : undefined;
      }
      return (
        <>
          <Controller
            name={input.name}
            control={control as unknown as Control<FieldValues>}
            defaultValue={defaultValue}
            render={({ field: { onChange} }) => (
              <DropDown
                name={input.name}
                key={input.id}
                //value
                placeholder={input.label}
                // register={register}
                compulsoryList={input.compulsorylist}
                optionList={input.optionlist}
                existingDataList={optionsList || []}
                // {...field}
                size={inputSize}
                required={input.required}
                register={register}
                errors={errors}
                onchange={onChange}
                validationSchema={{
                  required: input.required,
                }}
              />
            )}
          />
        </>
      );
    case "hidden":
    case "text":
      return (
        <InputField
          key={input.id}
          type={input.text_type ? input.text_type : "text"}
          name={input.name}
          label={input.label}
          size={inputSize}
          datatestid = {input.datatestid}
          //size={input.size ? input.size : "medium"}
          register={register}
          maxlen={input.maxlen}
          errors={errors}
          required={input.required}
          placeholder={input.placeholder}
          validationSchema={{
            required: input.required,
            minLength: {
              value: input.minlen,
              message: input.errorMessage,
            },
            maxLength: {
              value: input.maxlen,
              message: input.errorMessage,
            },
            pattern: {
              value: input.pattern,
              message: input.errorMessage,
            },
          }}
        />
      );
    default:
      // Handle other input types or return null
      return (
        <>
          {formMode == "edit" ? (
            <FileGrid
              oldFiles={existingFiles}
            />
          ) : (
            <FileGrid />
          )}

          <ListItem
            size={inputSize}
            text="Upload the videos and images of workshop and garage"
          />
          <ListItem
            size={inputSize}
            text="The images and videos of the services provided by the workshop can also be uploaded"
          />
        </>
      );
  }
};
