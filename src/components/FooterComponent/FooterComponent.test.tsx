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
    expect(footer.children[1]).toHaveClass("footercontactinfo");
    expect(footer.children[2]).toHaveClass("footerParagraph");

    //also check if class css are getting applied
    expect(footer.children[1]).toHaveClass(styles.footercontactinfo);
    expect(footer.children[2]).toHaveClass(styles.footerParagraph);
    
  });

  it('Footer texts rendered correctly', ()=>{ //to ensure that footer renders with correct text
    //match with expected text
    expect(footer.children[1]).toHaveTextContent("developer@bpcap.com+91 97000 09045") //contact info
    expect(footer.children[2]).toHaveTextContent("Copyright © 1999-2024") //copyright
  })

  //test case for basic alignment of footer elements
  it("Footer image and text vertical alignment", ()=>{ //to check that image comes above the text in footer
    const logoindex = Array.from(footer.children).findIndex(child=>child.classList.contains("footerLogo"));
    const textindex = Array.from(footer.children).findIndex(child=>child.classList.contains("footerParagraph"));
    const contactindex = Array.from(footer.children).findIndex(child=>child.classList.contains("footercontactinfo"));

    expect(logoindex).toBeLessThan(textindex); //logo comes before copyright text
    expect(logoindex).toBeLessThan(contactindex); //logo comes before contact info
    expect(contactindex).toBeLessThan(textindex); //contact info comes before copyright text
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
 
     const footerParagraphMobile = footerContainerMobile.children[2]; //text - 1st index
     expect(footerParagraphMobile).toHaveClass(styles.footerParagraph);
 
     // Set up viewport size for desktop
     global.innerWidth = 800;
     window.dispatchEvent(new Event('resize'));
 
     // Check if desktop classes are applied after resizing
     const footerContainerDesktop = getByTestId('footercontainer');
     expect(footerContainerDesktop).toHaveClass(styles.footerContainer);
 
     const footerParagraphDesktop = footerContainerDesktop.children[2];
     expect(footerParagraphDesktop).toHaveClass(styles.footerParagraph);
  })

});
