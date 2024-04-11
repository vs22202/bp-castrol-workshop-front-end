import { fireEvent, render, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import SignupPage from "./SignupPage";
import RequireAuth from "../../components/RequireAuthComponent/RequireAuth";
import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import AlertContext, {AlertContextProps} from "../../contexts/AlertContext";
import { MemoryRouter } from "react-router-dom";

// Mock the useLocation hook
jest.mock('react-router-dom', () => ({
...jest.requireActual('react-router-dom'), // Use the actual react-router-dom module
useLocation: jest.fn().mockReturnValue({ pathname: '/mock-path' }), // Mock useLocation
}));

const alert = null;
const sendAlert= jest.fn();


//mock context values defined
const mockContextValue: AlertContextProps = {
    alert,
    sendAlert,
};

//mock auth context values defined
const mockAuthContextValue: AuthContextProps = {
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

describe('SignUp Page Testing ', ()=>{
//test to check if the signup page components are getting rendered or not
test("Renders all components in the Signup page corectly", ()=>{
    const {getByTestId} = render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <AlertContext.Provider value={mockContextValue}>
            <MemoryRouter>
            <RequireAuth requireAuth={false}>
                <SignupPage />
            </RequireAuth>
            </MemoryRouter>
        </AlertContext.Provider>
      </AuthContext.Provider>
    )

    //all input fields
    const emailInput = getByTestId('signupemailid');
    const passwordInput = getByTestId('signuppassword');
    const passwordConfirmInput = getByTestId('signuppasswordconfirm');
    const otpInput = getByTestId('signupotp')

    //all buttons
    const LoginBtn = getByTestId('SignupPageLoginBtn');
    const SignupBtn = getByTestId('SignupPageSignupBtn');
    const otpBtn = getByTestId('SignupPageOtpBtnActive');

    //all input fields are in the document
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmInput).toBeInTheDocument();
    expect(otpInput).toBeInTheDocument();

    //all buttons are in the document
    expect(LoginBtn).toBeInTheDocument();
    expect(SignupBtn).toBeInTheDocument();
    expect(otpBtn).toBeInTheDocument();
})

//test to check whether the email and password input fields are working
 test("User can input their email, password and OTP",()=>{
    const {getByTestId} = render(
      <AuthContext.Provider value={mockAuthContextValue}>
      <AlertContext.Provider value={mockContextValue}>
          <MemoryRouter>
          <RequireAuth requireAuth={false}>
              <SignupPage />
          </RequireAuth>
          </MemoryRouter>
      </AlertContext.Provider>
    </AuthContext.Provider>
    )

    const emailInput = getByTestId('signupemailid');
    const passwordInput = getByTestId('signuppassword');
    const passwordConfirmInput = getByTestId('signuppasswordconfirm');
    const otpInput = getByTestId('signupotp')
    const otpBtn = getByTestId('SignupPageOtpBtnActive');

    fireEvent.change(emailInput, {target:{value:"richa21kiran@gmail.com"}});
    fireEvent.change(passwordInput, {target:{value:"PASSWORDpassword123"}});
    fireEvent.change(passwordConfirmInput, {target:{value:"PASSWORDpassword123"}});
    fireEvent.click(otpBtn);
    fireEvent.change(otpInput, {target:{value:"123456"}});

    expect(emailInput).toHaveValue("richa21kiran@gmail.com");
    expect(passwordInput).toHaveValue("PASSWORDpassword123");
    expect(passwordConfirmInput).toHaveValue("PASSWORDpassword123");
    expect(otpInput).toHaveValue("123456");
}) 

//test to check whether the signup form submits on clicking on signup button or not
 test("Submit action gets triggered when signup button is clicked",async()=>{

    //fetch each element by their test id
    const { getByTestId }=render(
      <AuthContext.Provider value={mockAuthContextValue}>
      <AlertContext.Provider value={mockContextValue}>
          <MemoryRouter>
          <RequireAuth requireAuth={false}>
              <SignupPage />
          </RequireAuth>
          </MemoryRouter>
      </AlertContext.Provider>
    </AuthContext.Provider>
    )

    const SignupForm = getByTestId("SignupForm");
    const emailInput = getByTestId('signupemailid');
    const passwordInput = getByTestId('signuppassword');
    const passwordConfirmInput = getByTestId('signuppasswordconfirm');
    const otpInput = getByTestId('signupotp')
    const SignupBtn = getByTestId('SignupPageSignupBtn');
    const otpBtn = getByTestId('SignupPageOtpBtnActive');

    fireEvent.change(emailInput, {target:{value:"richa21kiran@gmail.com"}});
    fireEvent.change(passwordInput, {target:{value:"PASSWORDpassword123"}});
    fireEvent.change(passwordConfirmInput, {target:{value:"PASSWORDpassword123"}});
    fireEvent.click(otpBtn);
    fireEvent.change(otpInput, {target:{value:"123456"}});

    fireEvent.click(SignupBtn) //click the signup button
    await waitFor(()=>{
        expect(SignupForm).toHaveFormValues({
            user_email_id: "richa21kiran@gmail.com",
            user_password: "PASSWORDpassword123",
            user_password_confirm: "PASSWORDpassword123",
            otp: '123456'
        })
    })
})
})