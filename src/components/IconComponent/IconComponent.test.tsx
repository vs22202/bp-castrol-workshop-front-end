/*
-Sets up a test suite for the Icon component 
-Ensure that the component renders without throwing any errors 
when provided with the specified props.
*/
import "@testing-library/jest-dom";
import { render,screen } from "@testing-library/react";
import { Icon, IconProps } from "./Icon";


describe("Icon component", () => {
  const mockProps: IconProps = {
    src: "loginD",
    size: "sm",
  };

  it("renders the icon ", () => {
    render(<Icon {...mockProps} />);
      // Assert that the image is rendered
      const iconElement = screen.getByRole('img');
      // Assert that the icon element is present in the document
      expect(iconElement).toBeInTheDocument();
     // Assert that the icon element has the expected 'src' attribute value
      expect(iconElement).toHaveAttribute('src', 'default');
      
  });
  
});
