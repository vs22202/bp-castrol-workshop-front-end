import React from "react";
import { InputField } from '../components/InputFieldComponent/InputField';
import { Checkbox } from '../components/CheckboxComponent/CheckboxComponent';
import { Input } from "./FormInputs";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormUtilsProps {
    register: any;
    errors: any;
}

export const renderInput = (input: Input, { register, errors }: FormUtilsProps) => {


    switch (input.type) {
        case "checkbox":
            return (
                <Checkbox
                    key={input.id}
                    name={input.name}
                    size={input.size ? input.size : "medium"}
                    text={input.label}
                    register={register}
                    validationSchema={{
                        required:input.required,
                    }}
                    required={input.required}
                />
            );
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
                       // validate: (v:string)=> v===matchwith || "Entered password doesnt match with the previous one."//input.errorMessage
                    }}
                />
            );
        default:
            // Handle other input types or return null
            return null;
    }
}