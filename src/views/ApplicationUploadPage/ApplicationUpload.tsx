import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../components/ButtonComponent/Button";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { ApplicationInputFields } from "../../components/FormInputs";
import { Option } from "components/DropDownComponent/Option";
import inputs from "./ApplicationUploadFormFields";
import {
  FileData,
  OptionsUtilsProps,
  renderInput,
} from "../../components/FormFieldRenderLogic";

import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AlertContext, { AlertContextProps } from "../../contexts/AlertContext";
import styles from "./ApplicationUpload.module.css";
import { useScreenSize } from "../../components/ScreenSizeLogic";

/**
 * Properties for the `ApplicationUpload` page.
 *
 * Renders a Application Upload page component.
 *
 * This page allows for the workshop to upload/submit application for their workshop containing information realated to workshop
 * like services offered, name, expertise, address, telephone number, images and videos of the workshop and many more information needed for workshop onboarding.
 *
 * @category Pages
 * @returns The rendered `ApplicationUpload` page as a `JSX.Element`.
 *
 * @example
 * ```tsx
 * <ApplicationUpload />
 * ```
 *
 */

const ApplicationUpload: React.FC = () => {
  const methods = useForm<ApplicationInputFields>();
  const [loading, setLoading] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"new" | "edit">("new");
  const [existingOptionsList, setExistingOptionsList] =
    useState<OptionsUtilsProps>({
      services_offered: [],
      expertise: [],
    });
  const [existingFiles, setExistingFiles] = useState<FileData[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { sendAlert } = useContext(AlertContext) as AlertContextProps;
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    trigger,
    reset,
    watch,
    control,
  } = methods;

  const inputSize = useScreenSize();

  const { currentUser } = useContext(AuthContext) as AuthContextProps;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/application/${
          currentUser?.user_email
        }`
      );
      const res = await result.json();
      return res;
    };
    fetchData().then((res) => {
      if (res.output == "success") {
        const data = res.result as ApplicationInputFields;
        const services_options = data.services_offered.split(",");
        const expertise_options = data.expertise.split(",");
        const services: Option[] = [];
        const expertise: Option[] = [];
        services_options.forEach((option) => {
          const v = option.trim();
          services.push({ value: v, label: v, isFixed: false });
        });
        expertise_options.forEach((option) => {
          const v = option.trim();
          expertise.push({ value: v, label: v, isFixed: false });
        });
        const fileUrls = JSON.parse(data.file_paths);
        let fileData: FileData[] = [];
        fileUrls.forEach((url: string) => {
          const name = url.split("userFiles")[1].split("?")[0].slice(3);
          const ext = name.split(".")[1].split("-")[0];
          let fileType;
          if (ext == "mp4" || ext == "mov") {
            fileType = `video/${ext}`;
          } else {
            fileType = `image${ext}`;
          }
          fileData.push({
            filename: name,
            type: fileType,
            fileurl: url,
            key: name + Date.now(),
          });
        });
        Object.assign(data,{filesOld:fileData})
        reset({ ...data });
        const inputs = formRef.current?.querySelectorAll("input");
        if (inputs) {
          for (let i = inputs.length; i >= 0; i--) {
            inputs[i]?.focus();
          }
        }
        setFormMode("edit");
        setExistingOptionsList({
          services_offered: services,
          expertise: expertise,
        });
        setExistingFiles(fileData);
        setLoading(false);
        return;
      }
      setLoading(false);
    });
  }, []);
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
  };

  const submitForm: SubmitHandler<ApplicationInputFields> = async (data) => {
    setLoading(true);
    if (formMode == "edit") {
      let field: keyof ApplicationInputFields;
      const formData = new FormData();
      for (field in dirtyFields) {
        if (field == "files" || field == "filesOld") continue;
        formData.append(field as string, `${data[field]}`);
      }
      for (const file in data.files) formData.append("files", data.files[file]);
      formData.append("user_email", currentUser?.user_email || "");
      formData.append("filesOld", JSON.stringify(data.filesOld));
      console.log(formData.getAll("user_email"));
      try {
        const result = await fetch("http://localhost:3000/application/edit", {
          method: "POST",
          body: formData,
        });
        const res = await result.json();
        if (res.output == "success") {
          setLoading(false);
          sendAlert({
            message: "Application Updated Succesfully",
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
      return;
    }
    const formData = new FormData();
    let key: keyof ApplicationInputFields;
    for (key in data) {
      if (key == "files") {
        continue;
      }
      formData.append(key, `${data[key]}`);
    }
    for (const file in data.files) formData.append("files", data.files[file]);
    formData.set("user_email", currentUser?.user_email || "");
    try {
      const result = await fetch("http://localhost:3000/application", {
        method: "POST",
        body: formData,
      });
      const res = await result.json();
      if (res.output == "success") {
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
    <div
      className={`${styles.formContainer} ${
        loading ? styles.loadingState : ""
      }`}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(submitForm)}
          onChange={handleInputChange}
          ref={formRef}
        >
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
            renderInput(input, {
              register,
              errors,
              control,
              formMode,
              existingOptionsList,
              existingFiles,
            })
          )}
          <Button
            text="Submit"
            size={
              inputSize === "small"
                ? "sm"
                : inputSize === "medium"
                ? "md"
                : "lg"
            }
            type="solid"
            datatestid="AppUploadSubmitBtn"
            action="submit"
            disabled={!isDirty}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export { ApplicationUpload };
