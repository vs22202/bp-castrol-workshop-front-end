/* 
checks if the logo with the alt text 'logo-ct' and 
the copyright notice containing the text 'copyright © 1999-2024' 
are present in the rendered output. 
*/

import { FooterWithLogo } from './Footer';
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import styles from './Footer.module.css'

describe('FooterWithLogo', () => {

  const {getByTestId} = render(<FooterWithLogo />)
  //get the footer component
  const footer = getByTestId("footercontainer");

  //basic rendering test cases
  it('Footer renders without crash', () => {//to ensure that footer renders with its logo and texts error-free
    //check for various components
    expect(footer.children[0]).toHaveClass("footerLogo");
    expect(footer.children[1]).toHaveClass("footerParagraph");

    //also check if class css are getting applied
    expect(footer.children[0]).toHaveClass(styles.footerLogo);
    expect(footer.children[1]).toHaveClass(styles.footerParagraph);
    
  });

  it('Footer texts rendered correctly', ()=>{ //to ensure that footer renders with correct text
    //match with expected text
    expect(footer.children[1]).toHaveTextContent("Copyright © 1999-2024")
  })

  it('Footer image renders correctly', ()=>{ //to ensure that footer renders with correct image
    //image renders with right source key
    expect(footer.children[0]).toHaveAttribute("src", "src\\assets\\castrol_logo.svg")
    //image renders with right alt text
    expect(footer.children[0]).toHaveAccessibleName("logo-ct")
  })

  //test case for basic alignment of footer elements
  it("Footer image and text vertical alignment", ()=>{ //to check that image comes above the text in footer
    const logoindex = Array.from(footer.children).findIndex(child=>child.classList.contains("footerLogo"));
    const textindex = Array.from(footer.children).findIndex(child=>child.classList.contains("footerParagraph"));

    expect(logoindex).toBeLessThan(textindex);
  })

  //test case for element resize with screen resizing
  it("Footer elements resize based on screensize",()=>{

     // Set up viewport size for mobile
     global.innerWidth = 400;
     global.innerHeight = 800;
 
     // Render the component
     const { getByTestId } = render(<FooterWithLogo />);
 
     // Check if mobile classes are applied initially
     const footerContainerMobile = getByTestId('footercontainer');
     expect(footerContainerMobile).toHaveClass(styles.footerContainer);
 
     const footerLogoMobile = footerContainerMobile.children[0]; //logo - 0th index
     expect(footerLogoMobile).toHaveClass(styles.footerLogo);
 
     const footerParagraphMobile = footerContainerMobile.children[1]; //text - 1st index
     expect(footerParagraphMobile).toHaveClass(styles.footerParagraph);
 
     // Set up viewport size for desktop
     global.innerWidth = 800;
     window.dispatchEvent(new Event('resize'));
 
     // Check if desktop classes are applied after resizing
     const footerContainerDesktop = getByTestId('footercontainer');
     expect(footerContainerDesktop).toHaveClass(styles.footerContainer);
 
     const footerLogoDesktop = footerContainerDesktop.children[0];
     expect(footerLogoDesktop).toHaveClass(styles.footerLogo);
 
     const footerParagraphDesktop = footerContainerDesktop.children[1];
     expect(footerParagraphDesktop).toHaveClass(styles.footerParagraph);
  })

});
