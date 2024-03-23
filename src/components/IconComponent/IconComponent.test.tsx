/*
-Sets up a test suite for the Icon component 
-Ensure that the component renders without throwing any errors 
when provided with the specified props.
*/
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Icon } from "./Icon";


describe("Icon component", () => {

  //basic rendering of icons
  it("Renders the icon ", () => { //icon gets rendered properly
    const {getByRole} = render(<Icon 
          src="loginD"
          size="sm"
          alt="iconAltText"
        />);

      // Assert that the image is rendered
      const iconElement = getByRole('img') as HTMLElement;

      // Assert that the icon element is present in the document
      expect(iconElement).toBeInTheDocument();

     // Assert that the icon element has the expected 'src' attribute value
      expect(iconElement).toHaveAttribute('src', 'default');
      
      //Assert that the icon element has 'size' attribute value
      expect(iconElement).toHaveClass('sm');

      //Assert that the icon element has optional 'alt' attribute value
      expect(iconElement).toHaveAttribute('alt', 'iconAltText');

  });

  //testing src prop
  it("Renders successfully with valid source key", ()=>{ //provided a valid src, valid image gets rendered
    const {getByRole} = render(<Icon src="editW" size="lg"/>)
    
    //fetches the icon component by role
    const icon = getByRole("img");

    //checks whether valid source key is present or not
    expect(icon.getAttribute("src")).toEqual("default");
  })

  it("Rendering fails on invalid source key", ()=>{//provided an invalid src, image doesnt get rendered
    const {getAllByRole} = render(
      <>
      <Icon src="invalidsrc" size="md"/>
      <Icon src="signupW" size="lg"/>
      </>
    )

    //fetch the icon component
    const icons = getAllByRole("img");
    
    //check that src attribute is "default"(in case of valid src) or null(invalid src)
    expect(icons[0].getAttribute("src")).toEqual(null)
    expect(icons[1].getAttribute("src")).toEqual("default")
  })

  //testing size prop
  it("Rendering icon of different sizes", ()=>{//provided a valid icon size value, size gets applied on icon component
    const {getAllByRole} = render(
      <>
        <Icon src="loginW" size="sm"/>
        <Icon src="loginW" size="md"/>
        <Icon src="loginW" size="lg"/>
      </>
    )

    const icons = getAllByRole("img");
    expect(icons[0].getAttribute("class")).toEqual("sm");
    expect(icons[1].getAttribute("class")).toEqual("md");
    expect(icons[2].getAttribute("class")).toEqual("lg");
  })

  //performance test
  it('Renders multiple icons simultaneuosly within a time limit',()=>{//checks time taken to render 100 icons
    const numsIcon = 100;

    const startTime = performance.now();
    render(
      Array.from({length:numsIcon},(_, index)=>(
        <Icon key={index} src="loginW" size="md"/>
      ))
    )

    const endTime = performance.now();
    const renderingTime = endTime - startTime;
    expect(renderingTime).toBeLessThanOrEqual(50); //rendered within 50 milisecond
    console.log("Time took for rendering 100 icons: ",renderingTime)
  })
  
  //snapshot test
  /* it('Rendered icon component matches exactly with the snapshot',()=>{//compares the rendered icon with its snapshot
    const {container} = render(<Icon src="submitD" size="md"/>)
    
    // Assert that the rendered output matches exactly with the stored snapshot
    expect(container).toMatchSnapshot();
  }) */

});
