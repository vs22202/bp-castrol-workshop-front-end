import "@testing-library/jest-dom";
import {  fireEvent, render, waitFor } from "@testing-library/react";
import { InputField } from "./InputField";
import styles from './InputField.module.css'
import { FormProvider, useForm } from "react-hook-form";
//import { useRef } from "react";

describe("InputField component", () => {
  const mockProps = {
    name: "testName",
    label: "Test Label",
    size: "medium",
    register: jest.fn(),
    errors: {},
  };

  const textProps = {
    ...mockProps,
    type: "text",
    placeholder:"text placeholder"
  };
  const passwordProps = {
    ...mockProps,
    type: "password",
    placeholder:"password placeholder",
  };

  //basic rendering of inputfield with floating label
  it("renders inputfield properly ", async() => {
    const mocktextprops = {
      name: "textfield",
      label: "Test Label",
      size: "medium",
      register: jest.fn(),
      errors: {},
      type: "text",
      placeholder:"text placeholder"
    };
    const mockpasswordprops = {
      name: "passwordfield",
      label: "Test Label",
      size: "medium",
      register: jest.fn(),
      errors: {},
      type: "text",
      placeholder:"text placeholder"
    };

    type forminputs = {
      text:string,
      password:string,
    }
   
    //const formRef = useRef<HTMLFormElement>(null);
    const methods = useForm<forminputs>({
      defaultValues:{text:"hello", password:"password"}
    });

    const {getAllByRole, getByRole} = render(
      <FormProvider {...methods}>
        <form role="form">
          <InputField {...mocktextprops} />
          <InputField {...mockpasswordprops} />
        </form>
      </FormProvider>
    );

    //fetch inputfields
    const textfield = getByRole("button", {name:"textfield"}) as HTMLInputElement;
    const passwordfield = getByRole("button", {name:"passwordfield"}) as HTMLInputElement;

    //fetch the labels
    const textlabel = getAllByRole("inputfieldlabel")[0];
    const passwordlabel = getAllByRole("inputfieldlabel")[1];

    //check if the input field is present
    expect(textfield).toBeInTheDocument();
    expect(passwordfield).toBeInTheDocument();
    expect(textfield).toHaveClass("defaultinputfield medium");
    expect(passwordfield).toHaveClass("defaultinputfield medium");

    //check the label text on the inputfield
    expect(textlabel).toBeInTheDocument();
    expect(passwordlabel).toBeInTheDocument();
    expect(textlabel).toHaveClass("floatingLabeldefault labelmedium");
    expect(passwordlabel).toHaveClass("floatingLabeldefault labelmedium");

    await waitFor(()=>{
      fireEvent.change(textfield, { target: { value: "Sample Text" } });
    })
    await waitFor(()=>{
      fireEvent.change(passwordfield, { target: { value: "Sample Password" } });
    })

    expect(getByRole("form")).toHaveFormValues({
      "textfield": "Sample Text",
      "passwordfield": "Sample Password"
    });

  });

  //Label rendering for text/password fields
  it("Renders correct label text", ()=>{//to check if correct text/password label text is rendered

    const {getAllByRole} = render(
      <>
      <InputField {...textProps} />
      <InputField {...passwordProps} />
      </>
    );

    //fetch the labels
    const textlabel = getAllByRole("inputfieldlabel")[0];
    const passwordlabel = getAllByRole("inputfieldlabel")[1];

    //check their text content
    expect(textlabel).toHaveTextContent("Test Label");
    expect(passwordlabel).toHaveTextContent("Test Label");
  })

  it("Check the label position before and after focus/entering inputs in the inputfields", ()=>{ //checks floating label styling before and after entering values/focus-blur events
    const {getAllByRole} = render(
      <>
      <InputField {...textProps} />
      <InputField {...passwordProps} />
      </>
    );

    //fetch the elements
    const textfield = getAllByRole("inputfield")[0] as HTMLInputElement;
    const passwordfield = getAllByRole("inputfield")[1] as HTMLInputElement
    const textlabel = getAllByRole("inputfieldlabel")[0];
    const passwordlabel = getAllByRole("inputfieldlabel")[1];

    //check label styling before focus
    expect(textlabel).toHaveClass(styles.floatingLabeldefault);
    expect(passwordlabel).toHaveClass(styles.floatingLabeldefault);

    //focus on the inputfields
    fireEvent.focus(textfield);
    fireEvent.focus(passwordfield);

    //check label styling after focus
    expect(textlabel).toHaveClass(styles.floatingLabel); 
    expect(passwordlabel).toHaveClass(styles.floatingLabel); 

    //unfocus on the inputfields to go back to floatinglabeldefault style class
    fireEvent.blur(textfield);
    fireEvent.blur(passwordfield);

    //check floating label class again - after blur
    expect(textlabel).toHaveClass(styles.floatingLabeldefault);
    expect(passwordlabel).toHaveClass(styles.floatingLabeldefault);
  })

  //placeholder check
  it("Checks if inputfield renders correct placeholder",()=>{//checks if placeholder correctly renders for text/password inputs
    const {getAllByRole} = render(
      <>
      <InputField {...textProps} />
      <InputField {...passwordProps}/>
      </>
    );
    //fetch inputfields
    const textfield = getAllByRole("inputfield")[0] as HTMLInputElement
    const passwordfield = getAllByRole("inputfield")[1] as HTMLInputElement;

    //focus on the input fields
    fireEvent.focus(textfield);
    fireEvent.focus(passwordfield);

    //check presence of the placeholder with the correct text
    expect(textfield.placeholder).toBe("text placeholder");
    expect(passwordfield.placeholder).toBe("password placeholder");

    //unfocus/blur on the inputfields
    fireEvent.blur(textfield);
    fireEvent.blur(passwordfield);

    //check if the placeholder disappears
    expect(textfield.placeholder).toBe("");
    expect(passwordfield.placeholder).toBe("");

  })

  //check disabled inputfields
  it("Checks disabled inputfield", ()=>{ //checks that a disabled inputfield shouldnt take inputs
    const disabledText = {
      ...mockProps,
      type: "text",
      isDisabled:true,
      placeholder:"text placeholder"
    };
    const disabledPassword = {
      ...mockProps,
      type: "password",
      isDisabled:true,
      placeholder:"password placeholder",
    };
    const {getAllByRole} = render(
      <>
      <InputField {...disabledText} />
      <InputField {...disabledPassword} />
      </>
    );

    //fetch inputfields
    const textfielddiv = getAllByRole("inputfieldContainer")[0].children[0];
    const passwordfielddiv = getAllByRole("inputfieldContainer")[1].children[0];
    const textfield = getAllByRole("inputfield")[0] as HTMLInputElement;
    const passwordfield = getAllByRole("inputfield")[1] as HTMLInputElement;

    //check if input field is itself is disabled
    expect(textfield).toBeDisabled()
    expect(passwordfield).toBeDisabled()

    //check if disabled class is applied
    expect(textfielddiv).toHaveClass("disabled");
    expect(passwordfielddiv).toHaveClass("disabled");

    //check by focusing on the inputfieldcontainer
    fireEvent.focus(textfielddiv);
    fireEvent.focus(passwordfielddiv);

    //check that container doesnt get focused
    expect(textfielddiv).not.toHaveFocus();
    expect(passwordfielddiv).not.toHaveFocus();

    //check that value doesnt get applied
    //pending
  })

  //check sizes 
  it("Checks size classes of inputfields",()=>{
    const inputfield1props = {
      name: "testName",
      label: "Test Label",
      type: "text",
      size: "small",
      register: jest.fn(),
      errors: {},
      placeholder:"text placeholder"
    };
    const inputfield2props = {
      name: "testName",
      label: "Test Label",
      type: "text",
      size: "medium",
      register: jest.fn(),
      errors: {},
      placeholder:"text placeholder"
    };
    const inputfield3props = {
      name: "testName",
      label: "Test Label",
      type: "text",
      size: "large",
      register: jest.fn(),
      errors: {},
      placeholder:"text placeholder"
    };

    const {getAllByRole} = render(
      <>
      <InputField {...inputfield1props} />
      <InputField {...inputfield2props} />
      <InputField {...inputfield3props} />
      </>
    );

    //fetch inputfields
    const textfield1 = getAllByRole("inputfield")[0] as HTMLInputElement;
    const textfield2 = getAllByRole("inputfield")[1] as HTMLInputElement;
    const textfield3 = getAllByRole("inputfield")[2] as HTMLInputElement;

    //checks if input field sizes are applied
    expect(textfield1).toHaveClass(styles.small);
    expect(textfield2).toHaveClass(styles.medium);
    expect(textfield3).toHaveClass(styles.large);

  })

  //check required
  it("Checks input for a mandatory fields", ()=>{ //pending
    /* const inputfield1props = {
      name: "testName",
      label: "Test Label",
      type: "text",
      size: "small",
      register: jest.fn(),
      errors: {},
      placeholder:"text placeholder"
    };
    const {getByRole} = render(
      <>
      <InputField {...inputfield1props} />
      </>
    ); */

    //fetch inputfields
    //const textfield = getByRole("inputfield") as HTMLInputElement;

    //Enter some value
    //fireEvent.change(textfield, {target:{value:"sample text"}})

    //check screen
    //expect(textfield).toContain("ekfjk")
  })
});
