import { fireEvent, render, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import LoginPage from "./LoginPage";
import RequireAuth from "../../components/RequireAuthComponent/RequireAuth";
import AuthContext, {AuthContextProps} from "../../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";

// Mock the useLocation hook
jest.mock('react-router-dom', () => ({
...jest.requireActual('react-router-dom'), // Use the actual react-router-dom module
useLocation: jest.fn().mockReturnValue({ pathname: '/mock-path' }), // Mock useLocation
}));


//mock context values defined
const mockContextValue: AuthContextProps = {
    currentUser: null,
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

describe('Login Page Testing ', ()=>{
//test to check if the login page components are getting rendered or not
test("Renders all components in the login page corectly", ()=>{
    const {getByTestId} = render(
        <AuthContext.Provider value={mockContextValue}>
            <MemoryRouter>
            <RequireAuth requireAuth={false}>
                <LoginPage />
            </RequireAuth>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    const emailInput = getByTestId('loginemailid');
    const passwordInput = getByTestId('loginpassword');
    const LoginBtn = getByTestId('LoginPageLoginBtn');
    const SignupBtn = getByTestId('LoginPageSignupBtn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(LoginBtn).toBeInTheDocument();
    expect(SignupBtn).toBeInTheDocument();
})

//test to check whether the email and password input fields are working
test("User can input their email and password",()=>{
    const {getByTestId} = render(
        <AuthContext.Provider value={mockContextValue}>
            <MemoryRouter>
            <RequireAuth requireAuth={false}>
                <LoginPage />
            </RequireAuth>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    const emailInput = getByTestId("loginemailid");
    const passwordInput = getByTestId("loginpassword");

    fireEvent.change(emailInput, {target:{value:"richa21kiran@gmail.com"}});
    fireEvent.change(passwordInput, {target:{value:"PASSWORDpassword123"}});

    expect(emailInput).toHaveValue("richa21kiran@gmail.com");
    expect(passwordInput).toHaveValue("PASSWORDpassword123");
})

//test to check whether the login form submits on clicking on login button or not
test("Submit action gets triggered when login button is clicked",async()=>{

    //fetch each element by their test id
    const { getByTestId }=render(
        <AuthContext.Provider value={mockContextValue}>
            <MemoryRouter>
            <RequireAuth requireAuth={false}>
                <LoginPage />
            </RequireAuth>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    const emailInput = getByTestId("loginemailid");
    const passwordInput = getByTestId("loginpassword");
    const loginBtn = getByTestId("LoginPageLoginBtn");
    const LoginForm = getByTestId("LoginForm");

    fireEvent.change(emailInput, {target:{value:"richa21kiran@gmail.com"}});
    fireEvent.change(passwordInput, {target:{value:"PASSWORDpassword123"}});
    fireEvent.click(loginBtn) //click the login button
    await waitFor(()=>{
        expect(LoginForm).toHaveFormValues({
            user_email_id: "richa21kiran@gmail.com",
            user_password: "PASSWORDpassword123"
        })
    })
})
})