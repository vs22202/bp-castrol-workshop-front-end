// Import the necessary dependencies
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FooterWithLogo } from './Footer';

describe('FooterWithLogo Component', () => {
  test('renders correctly', () => {
    // Render the component
    render(<FooterWithLogo />);
    
    // Assert that the footer container is rendered
    const footerContainer = screen.getByTestId('footerContainer');
    expect(footerContainer).toBeInTheDocument();
    
    // Assert that the logo is rendered
    const footerLogo = screen.getByAltText('logo-ct');
    expect(footerLogo).toBeInTheDocument();
    
    // Assert that the copyright paragraph is rendered
    const footerParagraph = screen.getByText('Copyright © 1999-2024');
    expect(footerParagraph).toBeInTheDocument();
  });
});
