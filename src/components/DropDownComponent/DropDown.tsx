import  { useEffect, useState } from "react";
import { components, ActionMeta, OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { Option } from "./Option";
/**
 * Properties for the `DropDown` component.
 */
export type DropDownProps = {
  /** 
   * Determines the name of the dropdown.
   */
  name: string;
  /** 
   * Defines the value of dropdown.
   */
  value?: string;
    /** 
   * Defines what placeholder/label the dropdown will have.
   */
  placeholder?: string;
    /**
   * Indicates whether the dropdown input is required for form submission. Defaults to `false`.
   */
  required?: boolean;
    /**
   * List of option to display for the dropdown.
   */
  optionList: Option[] | undefined;
    /**
   * List of fixed selected option to prepopulated in the select box for the dropdown.
   */
  compulsoryList: Option[] | undefined; // in this all options will be prepopulated and isfixed true
   /**
   * Existing selected options taken from the user mainly used for edit application.
   */
  existingDataList?: Option[] | undefined;
  /**
   * Function to "register" the input in the context of a form library (like React Hook Form) for handling form submission and validation.
   */
  register: any;
   /**
   * Schema or rules for validating the dropdown input, used in conjunction with `register` to enforce validation constraints.
   */
  validationSchema?: any;
  /**
   * Object containing error messages or validation state, typically used with form libraries to indicate validation errors.
   */
  errors: any;
  /**
   * The size of the dropdown. This controls the scaling of the dropdown's appearance.
   * While currently a string, consider restricting this to specific size options like "small" or "large" for consistency.
   */
  size?: string;
  /**
   * A function to set value of dropdown when any change happens(option slected/removed/added)..
   */
  onchange: (values: string) => void;
};

/**
 * Renders a `Dropdown` component with customizable properties.
 * 
 * This component is designed to be used within forms, supporting custom sizes, required validation,
 * and integration with form handling libraries through the `register` prop.
 * 
 * @param props The {@link DropDownProps} to configure the dropdown.
 * @returns A JSX element representing a stylized dropdown, with fixed options already prepopulated and a menu list of options from which user can select or create new options.
 *
 * @example
 * // Render a dropdown with the placeholder text "Services Offered", optionList "{OptionList}" and compulsoryList "{CompulsoryList}"
 *             <DropDown
            name={input.name}
              //value
              placeholder="Services Offered"
              compulsoryList={compulsorylist}
              optionList= {optionlist}
              required={required}
              register={register}
              errors={errors}
              onchange={onChange}
              validationSchema={{
                required: input.required,
              }}
            />
 */

export function DropDown({
  name,
  // @ts-ignore
  value: propValue = "",
  placeholder = "",
  register,
  validationSchema,
  errors,
  // @ts-ignore
  required = false,
  optionList,
  compulsoryList,
  existingDataList,
  size,
  onchange,
}: DropDownProps) {
  const dropdownRegister = register(name, validationSchema); // for validation
  const [oldDataSet, setOldDataSet] = useState<boolean>(false);
  useEffect(() => {
    if (existingDataList && existingDataList.length > 0 && !oldDataSet) {
      setValue((options) => {
        const newOptions = existingDataList?.filter((option) => !options.includes(option, 0))
        console.log([...options,...(newOptions as Option[])])
        return [...options,...(newOptions as Option[])];
      });
      setOldDataSet(true);
    }
  }, [existingDataList]);

  //function to prepopulate the fixed options
  const orderOptions = (values: readonly Option[]) => {
    return values
      .filter((v) => v.isFixed)
      .concat(values.filter((v) => !v.isFixed));
  };

  const [value, setValue] = useState<readonly Option[]>(
    orderOptions(compulsoryList as Option[])
  );

  // function to add values and turn them in strings to store it and pass it to backend when form submitted
  const onChange = (
    newValue: OnChangeValue<Option, true>,
    actionMeta: ActionMeta<Option>
  ) => {
    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
        if (actionMeta.removedValue.isFixed) {
          return; //function to have feature to remove options except the fixed ones
        }
        break;
      case "clear":
        newValue = compulsoryList?.filter((v) => v.isFixed) || [];
        //function to remove all options except fixed ones when clear cross is clicked
        break;
    }

    setValue(orderOptions(newValue));

    const concatenatedValues = orderOptions(newValue)
      .map((v) => v.value)
      .join(", ");

    onchange(concatenatedValues);
  };

  //to give customized tooltip when hovered over fixed options for drop down
  const Tooltip = (props: any) => {
    const data = props.data as Option;
    const tooltipText = data.isFixed
      ? "Pre-selected services need to be offered"
      : "";

    return (
      <div className="multi-value-label" title={tooltipText}>
        <components.MultiValueLabel {...props} />
      </div>
    );
  };

  //to format label when creating new options and adding them
  const formatCreateLabel = (inputValue: any) =>
    `Add new option "${inputValue}"`; // Customize the create label

  // for having floating label when there is selected values in the select box
  const { ValueContainer, Placeholder } = components;
  const CustomPlaceholder = ({ children, ...props }: any) => {
    return (
      <>
        <ValueContainer {...props}>
          <Placeholder {...props} isFocused={props.isFocused}>
            <div>
              {props.selectProps.placeholder}{" "}
              <span style={{ color: "red" }}>*</span>
            </div>
          </Placeholder>
          {children && children.map((child: any) =>
  child && child.type !== Placeholder ? child : null
)}
        </ValueContainer>
      </>
    );
  };
  const customComponents = {
    MultiValueLabel: Tooltip,
    ValueContainer: CustomPlaceholder,
  };

  return (
    <>
      <div className="form-container" role="dropdownContainer">
        <CreatableSelect
          styles={{
            //for select box
            control: (baseStyles, state) => ({
              ...baseStyles,
              marginBottom: "16px",
              borderColor: "rgba(0, 153, 26, 1)",
              "&:hover": {
                borderColor: "rgba(0, 153, 26, 1)",
              },
              boxShadow: state.isFocused
                ? "0 0 3px rgba(0, 153, 26, 0.5)"
                : "none",
              ...(!state.hasValue &&
                errors[name] && {
                  borderColor: "rgba(255, 77, 77, 1)",
                  "&:hover": { borderColor: "rgba(255, 77, 77, 1)" },
                }),
            }),

            placeholder: (provided, state) => ({
              ...provided,
              top: state.hasValue
                ? -16
                : state.selectProps.menuIsOpen
                ? -22
                : "50%",
              backgroundColor:
                state.hasValue || state.selectProps.menuIsOpen
                  ? "white"
                  : "transparent",
              color:
                !state.hasValue && state.selectProps.menuIsOpen && errors[name]
                  ? "rgba(255, 77, 77, 1)"
                  : "rgba(102, 102, 102, 1)",
              transition: "top 0.2s ease-out, font-size 0.1s",
              fontSize:
                state.hasValue ||
                state.selectProps.menuIsOpen ||
                size == "small"
                  ? "16px"
                  : "24px",
              position:
                state.hasValue || state.selectProps.menuIsOpen
                  ? "absolute"
                  : "none",
            }),

            valueContainer: (provided) => ({
              ...provided,
              padding: size == "large" ? "12px" : "6px", //changing size of box using padding
              overflow: "visible",
            }),

            multiValue: (base, state) => {
              const data = state.data as Option;
              return {
                ...base,
                backgroundColor: data.isFixed
                  ? "white"
                  : "rgba(229, 255, 232, 1)",
                border: data.isFixed
                  ? "1px solid rgba(0, 153, 26, 1)"
                  : "1px solid rgba(0, 153, 26, 1)",
              };
            },

            multiValueLabel: (base, state) => {
              // @ts-ignore
              const data = state.data as Option;
              return {
                ...base,
                fontWeight: "bold",
                color: "black",
                paddingRight: 6,
              };
            },

            multiValueRemove: (base, state) => {
              const data = state.data as Option;
              return data.isFixed ? { ...base, display: "none" } : base;
            },

            menu: (base) => ({
              ...base,
              border: "1px solid rgba(0, 153, 26, 1)",
              borderRadius: "4px",
              boxShadow: "none",
            }),

            option: (base, { isFocused, isSelected }) => ({
              ...base,
              backgroundColor:
                isSelected || isFocused ? "rgba(0, 153, 26, 0.1)" : "white", // Change the background color on hover
              color: "black",
            }),
          }}
          value={value}
          aria-label={placeholder}
          placeholder={placeholder}
          {...dropdownRegister}
          formatCreateLabel={formatCreateLabel}
          register={dropdownRegister}
          isClearable={value.some((v) => !v.isFixed)}
          options={optionList}
          onChange={onChange}
          isSearchable={true}
          isMulti={true}
          components={customComponents}
        />
      </div>
    </>
  );
}
