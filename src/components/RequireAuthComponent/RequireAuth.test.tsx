import "@testing-library/jest-dom"
import { render } from '@testing-library/react';
import { MemoryRouter, /* Route */ } from 'react-router-dom';
import AuthContext, { AuthContextProps } from '../../contexts/AuthContext';
import AlertContext, { AlertContextProps } from '../../contexts/AlertContext';
import RequireAuth from './RequireAuth';

// Mock AuthContext
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

  const mockAlertContextValue : AlertContextProps = {
    alert:null,
    sendAlert : jest.fn(),
  }

describe('<RequireAuth />', () => {
  //const mockSendAlert = jest.fn();

  it('renders children with authenticated user', () => {
    const { getByText } = render(
      <AuthContext.Provider value={mockAuthContextValueWithUser}>
        <AlertContext.Provider value={mockAlertContextValue}>
        <MemoryRouter initialEntries={['/']}>
          <RequireAuth>
            <div>Children Component</div>
          </RequireAuth>
        </MemoryRouter>
        </AlertContext.Provider>
      </AuthContext.Provider>
    );
    expect(getByText('Children Component')).toBeInTheDocument();
    //expect(getByRole("alertcontainer")).toBeInTheDocument();
  });

  it('renders children without authenticated user', () => {
    const { getByText, /* getByRole */ } = render(
        <MemoryRouter  initialEntries={['/']}>
            <AuthContext.Provider value={mockAuthContextValueWithoutUser}> {/* null curruser causing infinite loop */}
                <AlertContext.Provider value={mockAlertContextValue}> {/*adding alert component causes an infinite loop*/}
                    <RequireAuth>
                        <div>Children Component</div>
                    </RequireAuth>
                </AlertContext.Provider>
            </AuthContext.Provider>
        </MemoryRouter>
    );
    expect(getByText('Children Component')).toBeInTheDocument();
    /* expect(mockSendAlert).toHaveBeenCalledWith({
        message: "Your need to login before you apply",
        type: "error",
      }); */
    //expect(getByRole("alertcontainer")).toBeInTheDocument();
  });

 /*  it('renders children without authenticated user and requireAuth as false', () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ currentUser: null }}>
        <MemoryRouter initialEntries={['/']}>
          <RequireAuth requireAuth={false}>
            <div>Children Component</div>
          </RequireAuth>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(getByText('Children Component')).toBeInTheDocument();
  });

  it('navigates to home page with authenticated user and requireAuth as false', () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ currentUser: { id: '1', name: 'John Doe' } }}>
        <MemoryRouter initialEntries={['/']}>
          <RequireAuth requireAuth={false}>
            <div>Children Component</div>
          </RequireAuth>
          <Route path="/">
            <div>Home Page</div>
          </Route>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(getByText('Home Page')).toBeInTheDocument();
  });

  it('does not send alert without AlertContext', () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ currentUser: null }}>
        <MemoryRouter initialEntries={['/']}>
          <RequireAuth requireAuth={true}>
            <div>Children Component</div>
          </RequireAuth>
          <Route path="/login">
            <div>Login Page</div>
          </Route>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(mockSendAlert).not.toHaveBeenCalled();
    expect(getByText('Login Page')).toBeInTheDocument();
  }); */
});
