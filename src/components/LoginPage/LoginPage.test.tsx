import { fireEvent, render, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { LoginPage } from "./LoginPage";
import RequireAuth from "../RequireAuthComponent/RequireAuth";
import AuthContext, {AuthContextProps} from "../../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";

// Mock the useLocation hook
jest.mock('react-router-dom', () => ({
...jest.requireActual('react-router-dom'), // Use the actual react-router-dom module
useLocation: jest.fn().mockReturnValue({ pathname: '/mock-path' }), // Mock useLocation
}));

const login = jest.fn();
const currentUser = null;
const signup = jest.fn();
const generateOtp = jest.fn();
const logout = jest.fn();

global.fetch = jest.fn().mockImplementationOnce(()=>
    Promise.resolve({
        json:()=>Promise.resolve({
            output:"success",
            user: { user_id: "vitstudent", user_email: "richa21kiran@gmail.com" }
        })
    })
    )

//mock context values defined
const mockContextValue: AuthContextProps = {
    login,
    currentUser,
    signup,
    generateOtp,
    logout
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
test("User can login to the portal using thier valid set of Email ID and Password",async()=>{
    
    // Mock the fetch function globally to simulate API calls
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

    fireEvent.change(emailInput, {target:{value:"richa21kiran@gmail.com"}});
    fireEvent.change(passwordInput, {target:{value:"PASSWORDpassword123"}});
    fireEvent.submit(loginBtn)

    //expect(login).toHaveBeenCalledTimes(1)
    await waitFor(()=>{
        expect(login).toHaveBeenCalled();
    })
    /* expect(login).toHaveBeenCalledWith({
        email:"richa21kiran@gmail.com",
        password:"PASSWORDpassword123",
    }) */
})
})