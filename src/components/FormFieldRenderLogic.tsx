/*
Facilitates rendering various form input components based on the provided input configuration. 
It supports rendering checkboxes, dropdowns, text inputs, and hidden inputs, utilizing components 
like Checkbox, DropDown, and InputField. Additionally, it handles the rendering of a FileGrid 
component for file uploads, with options for existing files in edit mode.
*/
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
  brands: Option[];
}
export interface FileData {
  filename: string; type: string; fileurl: string; key: string;
}
interface FormUtilsProps {
  register: any;
  errors: any;
  control?: any;
  watch?: any;
  formMode?: string;
  existingOptionsList?: OptionsUtilsProps;
  existingFiles?: FileData[];
}

/**
 * Renders form input components based on the provided configuration.
 * Supports rendering checkboxes, dropdowns, text inputs, and hidden inputs.
 * @param input The configuration object for the input component.
 * @param register The function for registering form inputs.
 * @param errors Object containing form validation errors.
 * @param control Object for controlling form inputs in React Hook Form.
 * @param watch Function to watch form input values.
 * @param formMode The mode of the form (e.g., 'edit').
 * @param existingOptionsList Object containing existing options for dropdowns.
 * @param existingFiles Array of existing file data for file uploads.
 * @returns The rendered JSX element of the input component.
 */

export const renderInput = (
  input: Input,
  {
    register,
    errors,
    control,
    watch,
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
          size={inputSize as "small" | "medium" | "large"}
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
        } else if (input.name == "expertise") {
          defaultValue = existingOptionsList?.expertise
            .map((option) => option.value)
            .join(",");
          optionsList = existingOptionsList?.expertise.slice(
            input.compulsorylist?.length
          );
        }
        else {
          defaultValue = existingOptionsList?.brands
          .map((option) => option.value)
          .join(",");
        optionsList = existingOptionsList?.brands.slice(
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
                placeholder={input.label}
                compulsoryList={input.compulsorylist}
                optionList={input.optionlist}
                existingDataList={optionsList || []}
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
          register={register}
          maxlen={input.maxlen}
          errors={errors}
          watch={watch}
          required={input.required}
          placeholder={input.placeholder}
          isDisabled={input.isDisabled}
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
          hasFocus={formMode == "edit" ? true : false}
        />
      );
    default:
      // Handle other input types or return null
      return (
        <>
          <ListItem
            size={inputSize}
            text="Upload high quality videos and images of the workshop and garage service bays."
          />
          <ListItem
            size={inputSize}
            text="Make sure to upload images and videos showcasing the various services your workshop offers."
          />
          {formMode == "edit" ? (
            <FileGrid
              oldFiles={existingFiles}
            />
          ) : (
            <FileGrid />
          )}

        </>
      );
  }
};
