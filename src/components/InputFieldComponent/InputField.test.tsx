import "@testing-library/jest-dom";
import {  fireEvent, render } from "@testing-library/react";
import { InputField } from "./InputField";
import styles from './InputField.module.css'

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
      label: "textfield",
      size: "medium",
      register: jest.fn(),
      errors: {},
      type: "text",
      placeholder:"text placeholder"
    };
    const mockpasswordprops = {
      name: "passwordfield",
      label: "passwordfield",
      size: "medium",
      register: jest.fn(),
      errors: {},
      type: "text",
      placeholder:"text placeholder"
    };

    const {getAllByRole, getByRole} = render(
      <>
        <InputField {...mocktextprops} />
        <InputField {...mockpasswordprops} />
      </>
    );

    //fetch inputfields
    const textfield = getByRole("textbox", {name:"textfield"})
    const passwordfield = getByRole("textbox", {name:"passwordfield"})

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

  //check disabled inputfields
  it("Checks disabled inputfield", ()=>{ //checks that a disabled inputfield shouldnt take inputs
    const disabledText = {
      ...mockProps,
      type: "text",
      isDisabled:true,
      placeholder:"text placeholder"
    };
    const {getByRole} = render(
      <>
      <InputField {...disabledText} />
      </>
    );

    //fetch inputfields
    const textfielddiv = getByRole("inputfieldContainer").children[0];
    const textfield = getByRole("textbox") as HTMLInputElement;

    //check if input field is itself is disabled
    expect(textfield).toBeDisabled()

    //check if disabled class is applied
    expect(textfielddiv).toHaveClass("disabled");

    //check by focusing on the inputfieldcontainer
    fireEvent.focus(textfielddiv);

    //check that container doesnt get focused
    expect(textfielddiv).not.toHaveFocus();
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
    const textfield1 = getAllByRole("textbox")[0] as HTMLInputElement;
    const textfield2 = getAllByRole("textbox")[1] as HTMLInputElement;
    const textfield3 = getAllByRole("textbox")[2] as HTMLInputElement;

    //checks if input field sizes are applied
    expect(textfield1).toHaveClass(styles.small);
    expect(textfield2).toHaveClass(styles.medium);
    expect(textfield3).toHaveClass(styles.large);

  })
});
