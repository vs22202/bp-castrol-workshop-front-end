import "@testing-library/jest-dom"
import { render } from '@testing-library/react';
import { MemoryRouter, /* Route */ } from 'react-router-dom';
import AuthContext, { AuthContextProps } from '../../contexts/AuthContext';
import AlertContext, { AlertContextProps } from '../../contexts/AlertContext';
import RequireAuth from './RequireAuth';

// Mock AuthContext

const mockAuthContextValueWithoutUser: AuthContextProps = {
  currentUser:null,
  login: async () => 'success',
  loginMobile: async () => 'success',
  signup: async () => 'success',
  signupMobile: async () => 'success',
  generateOtp: async () => {},
  generateOtpMobile: async () => {},
  changePassword: async () => 'success',
  generateResetOtp: async () => {},
  resetPassword: async () => 'success',
  logout: () => {}
};

const mockAuthContextValueWithUser: AuthContextProps = {
  currentUser:{
      user_id: '123',
      user_email: 'test@example.com',
      user_mobile: '+1234567890',
      auth_token: 'mockAuthToken',
  },
  login: async () => 'success',
  loginMobile: async () => 'success',
  signup: async () => 'success',
  signupMobile: async () => 'success',
  generateOtp: async () => {},
  generateOtpMobile: async () => {},
  changePassword: async () => 'success',
  generateResetOtp: async () => {},
  resetPassword: async () => 'success',
  logout: () => {}
};

const sendmockalert = jest.fn();
const mockAlertContextValue: AlertContextProps = {
  alert: null,
  sendAlert: sendmockalert,
}; 

describe('<RequireAuth />', () => {

  //checks rendering of components provided an authenticated user and requireauth=true
  it('renders children with authenticated user & authentication required', () => {
 
    const { getByText } = render(
        <MemoryRouter>
          <AlertContext.Provider value={mockAlertContextValue}>
            <AuthContext.Provider value={mockAuthContextValueWithUser}>
              <RequireAuth>
                <div>Children Component</div>
              </RequireAuth>
            </AuthContext.Provider>
          </AlertContext.Provider>
        </MemoryRouter>
    );
    expect(getByText('Children Component')).toBeInTheDocument();
  });
  
  //checks rendering of components provided an unauthenticated user and requireauth=false
  it('renders children with authenticated user and authentication not required', () => {
 
    const { getByText } = render(
      <MemoryRouter>
      <AlertContext.Provider value={mockAlertContextValue}>
        <AuthContext.Provider value={mockAuthContextValueWithoutUser}>
          <RequireAuth requireAuth={false}>
            <div>Children Component</div>
          </RequireAuth>
        </AuthContext.Provider>
      </AlertContext.Provider>
  </MemoryRouter>
    );
    expect(getByText('Children Component')).toBeInTheDocument();
  });
});
