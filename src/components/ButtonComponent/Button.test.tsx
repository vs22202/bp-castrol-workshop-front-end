/*
Checks if the button renders without crashing, if the button text is displayed, 
if the button has the proper role ("button"), if it is disabled, and 
if it has the correct action attribute ("submit"). 
*/
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Button } from "./Button";

/*
test("demo", () => {
  expect(true).toBe(true);
});


test("Renders the small Button", () => {
  render(<Button text="submit" size="sm" type="outline" iconimg="submitG" />);
  expect(true).toBeTruthy();
});
*/

describe("Button component", () => {
  it("renders without crashing", () => {
    const { getByText, getByRole } = render(<Button text="Test Button" type="solid" disabled={true} action="submit" />);
    
    // Check if the button text is rendered
    const buttonElement = getByText("Test Button");
    expect(buttonElement).toBeInTheDocument();

    // Check if the button has the proper role
    const buttonRole = getByRole("button");
    expect(buttonRole).toBeInTheDocument();

    // Check if the button is disabled
    expect(buttonRole).toHaveAttribute("disabled");

    // Check if the button has the proper action
    expect(buttonRole).toHaveAttribute("type", "submit");

    // You can add more assertions based on your component's requirements
  });
});
