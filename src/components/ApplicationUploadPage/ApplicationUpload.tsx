import React from "react";
import { Checkbox } from "../CheckboxComponent/CheckboxComponent";
import { InputField } from "../InputFieldComponent/InputField";
import { Button } from "../ButtonComponent/Button";
import { DropDown, DropDownProps } from "../DropDownComponent/DropDown";
import {
  useForm,
  SubmitHandler,
  Controller,
  Control,
  FieldValues,
  FormProvider,
} from "react-hook-form";
import { Input } from "components/FormInputs";
import { Option } from "components/DropDownComponent/Option";
import inputs from "./ApplicationUploadFormFields";
import { renderInput } from "../FormFieldRenderLogic";
// import { renderInput } from "../FormFieldRenderLogic";
interface FormUtilsProps {
  register: any;
  errors: any;
}

const ApplicationUpload: React.FC = () => {
  const methods = useForm<Input>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    control,
  } = methods


  const handleInputChange = async (event: any) => {
    const name = event?.target.name;
  
    // Find the corresponding input field in the inputs array
    const inputField = inputs.find((input) => input.name === name);
  
    // Check if the input field is of type "input" or "checkbox"
    if (inputField && (inputField.type === 'text' || inputField.type === 'checkbox')) {
      // Trigger validation for the specified input fields
      await trigger(name);
    }
  
    console.log(errors);
  };
  
/*   const renderInput = (input: Input, { register, errors }: FormUtilsProps) => {
    switch (input.type) {
      case "checkbox":
        return (
          <Checkbox
            key={input.id}
            name={input.name}
            size="medium"
            text={input.label}
            register={register}
            errors={errors}
            validationSchema={{
              required: input.required,
            }}
            required={input.required}
            //OnChange={(e)=>field.onChange(e.target.checked)}
            //checked={field.value}
          />
        );
      case "text":
        return (
          <>
            <InputField
              key={input.id}
              type="text"
              name={input.name}
              label={input.label}
              size="large"
              register={register}
              required={input.required}
              maxlen={input.maxlen}
              errors={errors}
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
                  message: `${input.label} format is wrong.`,
                },
              }}
            />
          </>
        );

      case "dropdown":
        const defaultValue = input.compulsorylist
          ? input.compulsorylist.map((option) => option.value).join(",")
          : undefined;
        return (
          <>
            <Controller
              name={input.name}
              control={control as unknown as Control<FieldValues>}
              defaultValue={defaultValue}
              render={({ field: { onChange, value } }) => (
                <DropDown
                  name={input.name}
                  key={input.id}
                  //value
                  placeholder={input.label}
                  // register={register}
                  compulsoryList={input.compulsorylist}
                  optionList={input.optionlist}
                  // {...field}
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

      default:

      //file/image upload inputs
    }
  };
 */
  
  const submitForm: SubmitHandler<Input> = (data) => {
    console.log(data); //submit funciton
  };

  return (
    <div className="appContainer">
      <div className="contentContainer">
        <div className="formContainer">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submitForm)} onChange={handleInputChange}>
              <h1
                style={{
                  color: "rgba(0, 153, 0, 1)",
                  fontSize: "28px",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Certified Castrol Workshop Application
              </h1>
              <h2
                style={{
                  color: "rgba(102, 102, 102, 1)",
                  fontSize: "20px",
                  textAlign: "left",
                }}
              >
                Take your workshop to the next level!
              </h2>
              {inputs.map((input) => renderInput(input, { register, errors, control }))}
              <Button text="Submit" size="sm" type="solid" action="submit"/>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export { ApplicationUpload };