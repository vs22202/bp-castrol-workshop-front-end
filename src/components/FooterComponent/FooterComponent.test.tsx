/* 
checks if the logo with the alt text 'logo-ct' and 
the copyright notice containing the text 'copyright © 1999-2024' 
are present in the rendered output. 
*/

import { FooterWithLogo } from './Footer';
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe('FooterWithLogo', () => {
  it('renders footer with logo and copyright notice', () => {
    const { getByAltText, getByText } = render(<FooterWithLogo />);
    
    const logo = getByAltText('logo-ct');
    expect(logo).toBeInTheDocument();

    const copyrightNotice = getByText(/copyright © 1999-2024/i);
    expect(copyrightNotice).toBeInTheDocument();
  });
});
