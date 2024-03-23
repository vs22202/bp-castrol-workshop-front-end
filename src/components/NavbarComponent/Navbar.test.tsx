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
  logout: async () => 'success',
  loginMobile: function (_mobile_no: string, _password: string): Promise<string> {
    throw new Error("Function not implemented.");
  },
  signupMobile: function (_mobile_no: string, _password: string, _otp: string): Promise<string> {
    throw new Error("Function not implemented.");
  },
  generateOtpMobile: function (_mobile_no: string): void {
    throw new Error("Function not implemented.");
  },
  changePassword: function (_password: string, _old_password: string): Promise<string> {
    throw new Error("Function not implemented.");
  },
  generateResetOtp: function (_email?: string | undefined, _mobile?: string | undefined): void {
    throw new Error("Function not implemented.");
  },
  resetPassword: function (_password: string, _otp: string, _email?: string | undefined, _mobile?: string | undefined): Promise<string> {
    throw new Error("Function not implemented.");
  }
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
