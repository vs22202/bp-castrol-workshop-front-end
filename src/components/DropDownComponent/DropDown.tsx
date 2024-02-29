import React, { useEffect, useState } from 'react';
import { components,ActionMeta, OnChangeValue,} from 'react-select';
import CreatableSelect from 'react-select/creatable';
import styles from './DropDown.module.css';
import { FormState } from 'react-hook-form';
import { Input } from "components/FormInputs";
import { Option } from "./Option";
/** The props type of {@link DropDown | `DropDown`}. */
export type DropDownProps = {
     /**
   * name,value,placeholder,required, optionlist,compulsorylist,register,validationschema,errors, onchange of the dropdown
   */
  name:string;
  value?: string;
  placeholder?:string;
  required?: boolean;
  optionList: Option[]| undefined;
  compulsoryList:Option[] | undefined;// in this all options will be prepopulated and isfixed true
  register: any;  
  validationSchema?:any;
  errors:any;
  onchange: (values: string) => void;
};

/**
 * dropdown Component
 * @category Component
 *
 * @param {string} name - The name of the dropdown.
 * @param {string} value - The value of the dropdown.
 * @param {string} placeholder - The placeholder text associated with the dropdown.
 * @param {boolean} required - Indicates whether the dropdown is required.
 * @param {Option[]| undefined} optionList - A list of options to be shown in dropdown menulist.
 * @param {Option[]| undefined} compulsoryList - A list of options to be prepopulated in select box.
 * @param {function} register - A function to register the dropdown in a form.
 * @param {function} validationSchema - A function for conditions for validating the dropdown.
 * @param {function} errors - A function to know errors for dropdown
 * @param {function} onchange - A function to set value of dropdown when any change happens(option slected/removed/added).
 * 
 * @returns {JSX.Element} The rendered dropdown component.
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
  value: propValue = '',
  placeholder="",
  register,
  validationSchema,
  errors,
  required = false,
  optionList,
  compulsoryList,
  onchange,

}: DropDownProps) {

  //    useEffect(()=>{
  //   console.log(errors);
  //  })
  const dropdownRegister = register(name, validationSchema)// for validation

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
          return;//function to have feature to remove options except the fixed ones
        }
        break;
      case "clear":
        newValue = compulsoryList?.filter((v) => v.isFixed)|| [];//function to remove all options except fixed ones when clear cross is clicked
        break;
      
    }

    setValue(orderOptions(newValue));


    const concatenatedValues = orderOptions(newValue)
      .map((v) => v.value)
      .join(", ");
    // console.log("Current Values:", concatenatedValues);


      onchange(concatenatedValues);

  };

//to give customized tooltip when hovered over fixed options for drop down
  const Tooltip = (props: any) => {
    const data = props.data as Option;
    const tooltipText = data.isFixed ? 'Pre-selected services need to be offered' : '';

    return (
      <div className="multi-value-label" title={tooltipText}>
        <components.MultiValueLabel {...props} />
      </div>
    );
  };
  
  //to format label when creating new options and adding them 
  const formatCreateLabel = (inputValue: any) => `Add new option "${inputValue}"`; // Customize the create label

// for having floating label when there is selected values in the select box
  const { ValueContainer, Placeholder } = components;

  const CustomPlaceholder = ({ children, ...props }: any) => {
    const customPlaceholder = (
      <div>
        {props.selectProps.placeholder} <span style={{ color: "red" }}>*</span>
      </div>
    );
    return (
      <ValueContainer {...props}>
        <Placeholder {...props} isFocused={props.isFocused }>
        {customPlaceholder}
        </Placeholder>
        {React.Children.map(children, (child) =>
          child && child.type !== Placeholder ? child : null
        )}
      </ValueContainer>
    );
  }; 

  

  const customComponents = {
    MultiValueLabel: Tooltip,
    ValueContainer: CustomPlaceholder,
  };

  return (
    <>
      <div className="form-container">
          
            <CreatableSelect
            styles={{
              //for select box
              control: (baseStyles, state) => ({
                ...baseStyles,
                marginBottom: '16px',
                borderColor: 'rgba(0, 153, 26, 1)',
                '&:hover': {
                  borderColor: 'rgba(0, 153, 26, 1)',
                },
                boxShadow: state.isFocused ? '0 0 3px rgba(0, 153, 26, 0.5)' : 'none',
                ...(!state.hasValue &&errors[name]&& {borderColor: 'rgba(255, 77, 77, 1)','&:hover': {borderColor: 'rgba(255, 77, 77, 1)',} }),
              }),

              placeholder: (provided, state) => ({
                ...provided,
                top: state.hasValue ? -15 : (state.selectProps.menuIsOpen ? -23 : "50%"),
                backgroundColor: (state.hasValue || state.selectProps.menuIsOpen) ? "white" : "transparent",
                color:(!state.hasValue && state.selectProps.menuIsOpen&& errors[name])? "rgba(255, 77, 77, 1)": "rgba(102, 102, 102, 1)",
                transition: "top 0.2s ease-out, font-size 0.1s",
                fontSize: ( state.hasValue || state.selectProps.menuIsOpen) ? '16px' : '24px',
                position: (state.hasValue || state.selectProps.menuIsOpen) ? 'absolute' : 'none',
              }),
              
              valueContainer: (provided, state) => ({
                ...provided,
                padding: '12px',//changing size of box using padding
                overflow: "visible",

              }),

              multiValue: (base, state) => {
                const data = state.data as Option;
                return {
                  ...base,
                  backgroundColor: data.isFixed ? "white" : "rgba(229, 255, 232, 1)",
                  border: data.isFixed ? "1px solid rgba(0, 153, 26, 1)" : "1px solid rgba(0, 153, 26, 1)",
                };
              },
              
              multiValueLabel: (base, state) => {
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
                border: '1px solid rgba(0, 153, 26, 1)', 
                borderRadius: '4px', 
                boxShadow: 'none', 
              }),

              option: (base, { isFocused, isSelected }) => ({
              ...base,
              backgroundColor: isSelected || isFocused  ? 'rgba(0, 153, 26, 0.1)' : 'white', // Change the background color on hover
              color: 'black', 
              
             }),
              
            }}
              value={value}
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
