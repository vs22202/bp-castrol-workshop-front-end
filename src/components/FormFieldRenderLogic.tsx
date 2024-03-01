import React from "react";
import { InputField } from '../components/InputFieldComponent/InputField';
import { Checkbox } from '../components/CheckboxComponent/CheckboxComponent';
import { Input } from "./FormInputs";
import { Control, Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { DropDown } from "./DropDownComponent/DropDown";

interface FormUtilsProps {
    register: any;
    errors: any;
    control?:any;
}

export const renderInput = (input: Input, { register, errors, control }: FormUtilsProps) => {

    switch (input.type) {
        case "checkbox":
            return (
                <Checkbox
                    key={input.id}
                    name={input.name}
                    size={input.size ? input.size : "medium"}
                    text={input.label}
                    register={register}
                    errors={errors}
                    validationSchema={{
                        required:input.required,
                    }}
                    required={input.required}
                />
            );
        case "dropdown":
            const defaultValue = input.compulsorylist ? input.compulsorylist.map((option) => option.value).join(',') : undefined;
            return(
                <>
                <Controller
                name={input.name}
                control={control as unknown as Control<FieldValues>}
                defaultValue={defaultValue}
                render={({field:{onChange, value}})=>(
                    <DropDown
                        name={input.name}
                        key={input.id}
                        //value
                        placeholder={input.label}
                        // register={register}
                        compulsoryList={input.compulsorylist}
                        optionList= {input.optionlist}
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
            ) 
        case "text":
            return (
                <InputField
                    key={input.id}
                    type={input.text_type ? input.text_type : "text"}
                    name={input.name}
                    label={input.label}
                    size={input.size ? input.size : "medium"}
                    register={register}
                    maxlen={input.maxlen}
                    errors={errors}
                    required={input.required}
                    placeholder={input.placeholder}
                    validationSchema={{
                        required: input.required,
                        minLength: {
                            value: input.minlen,
                            message: input.errorMessage
                        },
                        maxLength: {
                            value: input.maxlen,
                            message: input.errorMessage
                        },
                        pattern: {
                            value: input.pattern,
                            message: input.errorMessage
                        },
                    }}
                />
            );
        default:
            // Handle other input types or return null
            return null;
    }
}