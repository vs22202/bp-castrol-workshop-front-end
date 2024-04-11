import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { SvgIcon } from "./SvgIcon";

describe("Testing SvgIcon Rendering", () => {
  //checks if icon is rendering
  it("test dynamic import",  async() => {
      const {baseElement, queryByRole} = render(<SvgIcon iconName="delete" />)

      //provide timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      //check if the svg is present
      expect(baseElement).toBeInTheDocument()

      //check by name
      expect(queryByRole("delete")).toBeInTheDocument();
  });

  //checks if loading icon renders while icon loads
  it("test dynamic import",  async() => {
    const {baseElement, queryByRole} = render(<SvgIcon iconName="delete" />)

    //check for loading icon
    expect(queryByRole("loading")).toBeInTheDocument();

    //provide timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    //check if the svg appears
    expect(baseElement).toBeInTheDocument()

    //check by name
    expect(queryByRole("delete")).toBeInTheDocument();
});
});
