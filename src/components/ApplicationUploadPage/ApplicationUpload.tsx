import React, { useContext, useState } from "react";
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
import { ApplicationInputFields } from "../FormInputs";
import { Option } from "components/DropDownComponent/Option";
import inputs from "./ApplicationUploadFormFields";
import { renderInput } from "../FormFieldRenderLogic";
import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AlertContext, { AlertContextProps } from "../../contexts/AlertContext";
import styles from "./ApplicationUpload.module.css";
// import { renderInput } from "../FormFieldRenderLogic";
interface FormUtilsProps {
  register: any;
  errors: any;
}

const ApplicationUpload: React.FC = () => {
  const methods = useForm<ApplicationInputFields>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { sendAlert } = useContext(AlertContext) as AlertContextProps;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    control,
  } = methods;

  const { currentUser } = useContext(AuthContext) as AuthContextProps;
  const handleInputChange = async (event: any) => {
    const name = event?.target.name;

    // Find the corresponding input field in the inputs array
    const inputField = inputs.find((input) => input.name === name);

    // Check if the input field is of type "input" or "checkbox"
    if (
      inputField &&
      (inputField.type === "text" || inputField.type === "checkbox")
    ) {
      // Trigger validation for the specified input fields
      await trigger(name);
    }

    console.log(errors);
  };

  const submitForm: SubmitHandler<ApplicationInputFields> = async (data) => {
    setLoading(true);
    const formData = new FormData();
    let key: keyof ApplicationInputFields;
    console.log(data.files);
    for (key in data) {
      if (key == "files") {
        continue;
      }
      formData.append(key, `${data[key]}`);
    }
    for (const file in data.files) formData.append("files", data.files[file]);
    formData.set("user_email", currentUser?.user_email || "");
    console.log(formData.getAll("files"));
    try {
      const result = await fetch("http://localhost:3000/application", {
        method: "POST",
        body: formData,
      });
      const res = await result.json();
      if (res.output == "success") {
        console.log("hello");
        setLoading(false);
        sendAlert({
          message: "Application Submitted Succesfully",
          type: "success",
        });
        navigate("/", { replace: true });
        return;
      }
      sendAlert({ message: res.msg, type: "error" });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className={`${styles.formContainer} ${loading ? styles.loadingState : ""}`}>
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
          {inputs.map((input) =>
            renderInput(input, { register, errors, control })
          )}
          <Button text="Submit" size="sm" type="solid" action="submit" />
        </form>
      </FormProvider>
    </div>
  );
};

export { ApplicationUpload };
