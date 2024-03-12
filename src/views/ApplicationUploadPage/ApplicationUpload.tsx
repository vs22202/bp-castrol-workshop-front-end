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
 * `ApplicationUpload` Page
 *
 * Renders a comprehensive page designed for workshop owners to seamlessly upload and submit applications, providing crucial
 * information related to their workshop. This page serves as a pivotal hub for onboarding workshops into the system, facilitating
 * the inclusion of essential details.
 * The form allows input for workshop details, services offered, expertise, address, contact information, and file uploads.
 * Supports both new submissions and editing existing applications.
 *
 * @category Pages
 * @returns The rendered `ApplicationUpload` page as a `JSX.Element`.
 *
 *
 * ## Features
 * - **Form Modes**: Supports both new application submissions and editing existing applications.
 * - **Dynamic Input Fields**: Utilizes dynamic input fields based on the specified configuration for each form field.
 * - **Data Fetching for Edit Mode**: Retrieves existing application data for editing and pre-fills the form.
 * - **File Uploads**: Allows users to upload files such as images and videos related to the workshop.
 * - **Form Validation**: Utilizes React Hook Form for form validation and error handling.
 * - **Alerts**: Provides feedback alerts for successful submission or any encountered errors.
 * - **Responsive Design**: Adapts to different screen sizes for optimal user experience.
 *
 * ## Form Fields
 * - `workshop_name`: Workshop name (3-50 characters, no special characters or numbers).
 * - `workshop_post_code`: Workshop postcode (6 digits).
 * - `address`: Workshop address (15-1000 characters, alphanumeric, and special characters allowed).
 * - `state`: Workshop state (3-50 characters, alphabets and spaces only).
 * - `city`: Workshop city (3-100 characters, alphabets and spaces only).
 * - `user_name`: Owner's name (3-16 characters, no special characters or numbers).
 * - `user_email`: Owner's email address (valid email format).
 * - `user_mobile`: Owner's telephone number (11-12 digits including country code).
 * - `bay_count`: Number of bays in the workshop (positive integer).
 * - `services_offered`: Dropdown for services offered by the workshop.
 * - `expertise`: Dropdown for the workshop's expertise.
 * - `brands`: Manufacturer specializations (3-16 characters, alphanumeric and commas allowed).
 * - `file_paths`: File uploads (array of strings representing file paths).
 * - `consent_process_data`: Checkbox for consenting to data processing.
 * - `consent_being_contacted`: Checkbox for consenting to being contacted.
 * - `consent_receive_info`: Checkbox for expressing interest in receiving additional information.
 *
 * @example
 * ```tsx
 * <ApplicationUpload />
 * ```
 */

const ApplicationUpload: React.FC = () => {
  const methods = useForm<ApplicationInputFields>();
  const [loading, setLoading] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"new" | "edit">("new");
  const [applicationStatus, setApplicationStatus] = useState<string>();
  const [existingOptionsList, setExistingOptionsList] =
    useState<OptionsUtilsProps>({
      services_offered: [],
      expertise: [],
      brands:[]
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
        `${import.meta.env.VITE_BACKEND_URL}/application/getUserApplication`,
        {
          headers: {
            Authorization: currentUser?.auth_token as string,
          },
        }
      );
      const res = await result.json();
      return res;
    };
    fetchData().then((res) => {
      if (res.output == "success") {
        const data = res.result as ApplicationInputFields;
        const services_options = data.services_offered.split(",");
        const expertise_options = data.expertise.split(",");
        const brands_options  = data.brands.split(",")
        const services: Option[] = [];
        const expertise: Option[] = [];
        const brands: Option[] = [];
        services_options.forEach((option) => {
          const v = option.trim();
          services.push({ value: v, label: v, isFixed: false });
        });
        expertise_options.forEach((option) => {
          const v = option.trim();
          expertise.push({ value: v, label: v, isFixed: false });
        });
        brands_options.forEach((option) => {
          const v = option.trim();
          brands.push({ value: v, label: v, isFixed: false });
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
        Object.assign(data, { filesOld: fileData });
        reset({ ...data });
        setFormMode("edit");
        setExistingOptionsList({
          services_offered: services,
          expertise: expertise,
          brands:brands,
        });
        setExistingFiles(fileData);
        setApplicationStatus(data.application_status);
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
      formData.append("filesOld", JSON.stringify(data.filesOld));
      try {
        const result = await fetch("http://localhost:3000/application/edit", {
          method: "POST",
          headers: {
            Authorization: currentUser?.auth_token as string,
          },
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
    try {
      const result = await fetch("http://localhost:3000/application", {
        method: "POST",
        headers: {
          Authorization: currentUser?.auth_token as string,
        },
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
      {formMode == "edit" ? (
        <div className={styles.applicationStatus}>
          <h1>Application Status</h1>
          <h2>
            Your application is currently <span>{applicationStatus}</span>. You
            should receive an email when your status is updated.{" "}
          </h2>
        </div>
      ) : (
        ""
      )}

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(submitForm)}
          onChange={handleInputChange}
          ref={formRef}
        >
          <div className={styles.formHeader}>
            <h1>
              {formMode != "edit"
                ? "Certified Castrol Workshop Application"
                : "Edit Your Application"}
            </h1>
            <h2>
              {formMode != "edit"
                ? "Take your workshop to the next level!"
                : "Updating the form will lead to loss of old data!"}
            </h2>
          </div>
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
