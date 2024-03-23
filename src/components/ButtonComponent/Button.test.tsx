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
  it("Button action on onclick function", ()=>{ //checks if the onclick function gets called
    const clickfunc = jest.fn();

    const {getByText} = render(
      <form>
        <Button text="Click me!" onClick={clickfunc}/>
      </form>
    )
    //fetch button element
    const button = getByText("Click me!");

    //click on the button
    fireEvent.click(button);

    //expect the onclick function- clickfunc() to be called
    expect(clickfunc).toHaveBeenCalledTimes(1);
  })

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

  //testing button styling
  it("Button renders as solid or outlined", ()=>{ //check if the buttons renders as solid/outlined based on the value
    const {getByText} = render(
      <>
      <Button text="Solid Button" type="solid" size="sm"/>
      <Button text="Outline Button" type="outline" size="lg"/>
      <Button text="Default Button"/>
      </>
    )
    
    //fetch the button components based on their text
    const solidBtn = getByText("Solid Button");
    const outlineBtn = getByText("Outline Button");
    const defBtn = getByText("Default Button");

    //check if the buttons have the apt styling type based on prop values
    expect(solidBtn.parentElement).toHaveClass(styles.solid);
    expect(outlineBtn.parentElement).toHaveClass(styles.outline);
    expect(defBtn.parentElement).toHaveClass(styles.solid);
  })

  it("Button renders in different sizes", ()=>{ //check if the buttons renders in sizes: small, medium and large
    const {getByText} = render(
      <>
      <Button text="Small Button" type="solid" size="sm"/>
      <Button text="Medium Button" type="outline" size="md"/>
      <Button text="Large Button" type="outline" size="lg"/>
      <Button text="Default Button"/>
      </>
    )
    //fetch the buttons
    const smallBtn = getByText("Small Button");
    const medBtn = getByText("Medium Button");
    const largeBtn = getByText("Large Button");
    const defBtn = getByText("Default Button");

    //test if the buttons have the apt size classes based on the prop values
    expect(smallBtn.parentElement).toHaveClass(styles.sm);
    expect(medBtn.parentElement).toHaveClass(styles.md);
    expect(largeBtn.parentElement).toHaveClass(styles.lg);
    expect(defBtn.parentElement).toHaveClass(styles.md); //checks if defualt size value is getting rendered if no size mentioned
  })

  //Button icon rendering
  it("Button Icon gets rendered", async():Promise<void>=>{
    const {getByRole} = render(
      <Button text="Sample Button" iconimg="signup_icon"/>
    )
    //get button icon element
    const button = getByRole("button");

    //provide delay for the icon to load
    await new Promise(resolve=>setTimeout(resolve, 500))

    //check if the icon component gets rendered
    expect([...button.children].some(child=>
      child.classList.contains("icon")
      )).toBeTruthy()

      //further icon render testing in svgicon component
  })

  it("Button Icon gets placed at the start/end of the button",()=>{ //checks the position of the button-icon
    const {getByText} = render(
      <>
      <Button text="Sample Button1" iconimg="signup_icon" placeIconAfter={true} />
      <Button text="Sample Button2" iconimg="signup_icon" placeIconAfter={false} />
      </>
    )

    //get the button element
    const button1 = getByText("Sample Button1");
    const button2 = getByText("Sample Button2");

    //check if the reverse class gets applied or not
    expect(button1.parentElement).toHaveClass(styles.reverse);
    expect(button2.parentElement).not.toHaveClass(styles.reverse);
  })

});
