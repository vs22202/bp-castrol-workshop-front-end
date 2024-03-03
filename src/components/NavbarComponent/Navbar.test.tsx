/*
-Checks whether the component renders without crashing, if the logo and navigation 
menu are visible, and if the cross icon is not initially rendered. 
-Mocks the AuthContext and useNavigate hook for testing purposes.
*/

import "@testing-library/jest-dom";
import AuthContext, { AuthContextProps } from '../../contexts/AuthContext';
import { Navbar } from './Navbar';
import { MemoryRouter } from 'react-router-dom';
import { render, screen  } from '@testing-library/react';

// Mock AuthContext
const mockAuthContextValue: AuthContextProps = {
  currentUser: null,
  login: async () => 'success',
  signup: async () => 'success',
  generateOtp: async () => 'success',
  logout: async () => 'success'
};

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Navbar Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Assert that the logo is rendered
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
 

    // Assert that the navigation menu is visible after clicking
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Assert that the cross icon is not initially rendered
    expect(screen.queryByTestId('cross_icon')).not.toBeInTheDocument();
    
  });

  
});



/* 
PREVIOUS CODE HERE- 


import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navbar, NavbarProps } from "./Navbar";

describe("Navbar Component", () => {
  test("renders correctly when user is not authenticated", () => {
    render(<Navbar />);

    // Assert that the logo is rendered
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();

    // Assert that the hamburger icon is rendered
    const hamburgerIcon = screen.getByAltText("Hamburger");
    expect(hamburgerIcon).toBeInTheDocument();

    // Assert that the navigation menu is not initially visible
    const navMenu = screen.getByTestId("navMenu");
    expect(navMenu).not.toBeVisible();
  });

  test("toggles navigation menu on hamburger icon click", async () => {
    
    const {findByTestId} = render(<Navbar />);

    // Click on the hamburger icon to toggle the menu
    const hamburgerIcon = await findByTestId("hamburger_icon");
    fireEvent.click(hamburgerIcon);

    // Assert that the navigation menu is visible after clicking
    const navMenu = screen.getByTestId("navMenu");
    expect(navMenu).toBeVisible();
  });

  test("displays correct menu items when user is authenticated", () => {
    const authenticatedProps: NavbarProps = {
      userState: { isAuthenticated: true, username: "exampleUser" },
    };
    // @ts-ignore: Ignore the TypeScript error for testing purposes
    render(<Navbar {...authenticatedProps} />);

    // Click on the hamburger icon to toggle the menu
    const hamburgerIcon = screen.getByAltText("Hamburger");
    fireEvent.click(hamburgerIcon);

    // Assert that the navigation menu is visible after clicking
    const navMenu = screen.getByTestId("navMenu");
    expect(navMenu).toBeVisible();

    // Assert that the menu items for authenticated user are rendered
    const applicationsMenuItem = screen.getByText("Applications");
    const profileMenuItem = screen.getByText("Profile");
    const logoutMenuItem = screen.getByText("Logout");

    expect(applicationsMenuItem).toBeInTheDocument();
    expect(profileMenuItem).toBeInTheDocument();
    expect(logoutMenuItem).toBeInTheDocument();
  });

  // Add more tests based on your specific functionality
});
*/