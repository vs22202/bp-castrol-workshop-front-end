import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { Button } from "./Button";
import styles from "./Button.module.css";


describe("Button component", () => {
  //testing basic rendering
  it("Renders without crashing", () => { //checks proper rendering of the button
    const { getByText, getByRole } = render(<Button text="Test Button" type="solid" disabled={true} action="submit" />);
    
    // Check if correct button text is rendered
    const buttonElement = getByText("Test Button");
    expect(buttonElement).toBeInTheDocument();

    // Check if the button has the proper role
    const buttonRole = getByRole("button");
    expect(buttonRole).toBeInTheDocument();

    // Check if the button is disabled
    expect(buttonRole).toHaveAttribute("disabled");

    // Check if the button has the proper action
    expect(buttonRole).toHaveAttribute("type", "submit");

  });

  //testing functionalities on button click
  it("Button doesnt work when disabled", ()=>{//checks that buttons dont work when disabled
    const handleSubmit = jest.fn();
    const handleClick = jest.fn();

    const {getByRole, getByText} = render(
      <form onSubmit={handleSubmit}>
      <input />
      <Button text="disabled submit button" type="solid" action="submit" disabled={true} />
      <Button text="disabled normal button" type="outline" action="button" onClick={handleClick} disabled={true} />
      <Button text="disabled reset button" type="solid" action="reset" disabled={true} />
      </form>
    )

    //fetch all the components
    const submitButton = getByText("disabled submit button");
    const normalButton = getByText("disabled normal button")
    const resetButton = getByText("disabled reset button")
    const inputfield = getByRole("textbox") as HTMLInputElement;

    //enter some input in the inputfield
    inputfield.value = "test input"

    //1. test the disabled submit button
      //click button
      fireEvent.click(submitButton);
      //check if disabled submit button doesnt submit the form
      expect(handleSubmit).toHaveBeenCalledTimes(0);

    //2. test the disabled normal button
      //click button
      fireEvent.click(normalButton);
      //check if normal button click doesnt cause any action
      expect(handleClick).toHaveBeenCalledTimes(0);

    //3. test the disabled reset button
      //click button
      fireEvent.click(resetButton)
      //check that the inputfield shouldnt get reset
      expect(inputfield.value).not.toEqual("");
  })

  it("Button action on normal button click",()=>{ //checks the functioning of a normal button click
    const handleSubmit = jest.fn();
    const {getByRole} = render(
      <form onSubmit={handleSubmit}>
        <input/>
        <Button text="Test Button" type="solid" action="button"/>
      </form>
    )

    //fetch components and inputfield value
    const inputfield = getByRole("textbox") as HTMLInputElement
    const buttonElement = getByRole("button");
    
    //enter some value in the input field
    inputfield.value = "test input"

    //click the button
    fireEvent.click(buttonElement)

    //check that the form doesnt get submitted on normal button click
    expect(handleSubmit).toHaveBeenCalledTimes(0);
    
    //check if button click causes input field value to change
    expect(inputfield.value).toEqual("test input");
  })

  it("Button action on reset button click",()=>{ //checks if inputfield gets reset on reset button click
    const handleSubmit = jest.fn();

    const {getByRole} = render(
      <form onSubmit={handleSubmit}>
        <input />
        <Button text="Test Button" type="solid" action="reset"/>
      </form>
    )

    //fetch components and inputfield value
    const inputfield = getByRole("textbox") as HTMLInputElement;
    const buttonElement = getByRole("button");

    //enter some value in the inputfield
    inputfield.value = "test input"

    //click the button
    fireEvent.click(buttonElement);

    //check that the form doesnt get submitted on reset button click
    expect(handleSubmit).toHaveBeenCalledTimes(0);

    //check if inputfield contains blank or not
    expect(inputfield.value).toEqual("");

  })

  it("Button action on submit",()=>{ //checks if form gets submitted on submit button click

    const handleSubmit = jest.fn();

    const {getByRole} = render(
      <form onSubmit={handleSubmit}>
        <input value="test input"/>
        <Button text="Test Button" type="outline" action="submit"/>
      </form>
    );

    //fetch components and input field value
    const inputfield = getByRole("textbox") as HTMLInputElement;
    const buttonElement = getByRole("button");
    
    //enter some value in input field
    inputfield.value = "test input"

    //click the button
    fireEvent.click(buttonElement)

     //check if submit is called or not
    expect(handleSubmit).toHaveBeenCalledTimes(1);

    //checks if input field value is unchaged when the submit button is clicked
    expect(inputfield.value).toEqual("test input");
  })
});
