/*
Testing the rendering and behavior of the InputField component. 
Ensures that the component renders without crashing,
Checks if the component renders as a password input when the type prop is set to 'password'.
*/
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { InputField } from "./InputField";

describe("InputField component", () => {
  const mockProps = {
    name: "testName",
    label: "Test Label",
    value: "",
    type: "text",
    size: "medium",
    register: jest.fn(),
    errors: {},
  };

  it("renders without crashing", () => {
    render(<InputField {...mockProps} />);
    const inputField = screen.getByLabelText("Test Label");
    expect(inputField).toBeInTheDocument();
  });


  it("renders as a password input ", () => {
    const passwordProps = {
      ...mockProps,
      type: "password",
    };
    render(<InputField {...passwordProps} />);
    const inputElement = screen.getByLabelText("Test Label") as HTMLInputElement;
    expect(inputElement.type).toBe("password");
  });
  
});
