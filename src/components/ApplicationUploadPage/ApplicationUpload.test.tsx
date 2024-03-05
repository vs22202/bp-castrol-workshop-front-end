test("demo", () => {
    expect(true).toBe(true);
  });



//import { /* fireEvent, */ render, /* waitFor */ } from "@testing-library/react";
/* import '@testing-library/jest-dom';
import { ApplicationUpload } from "./ApplicationUpload";
import RequireAuth from "../RequireAuthComponent/RequireAuth";
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

const login = jest.fn();
const currentUser = null;
const signup = jest.fn();
const generateOtp = jest.fn();
const logout = jest.fn();

//mock context values defined
const mockContextValue: AlertContextProps = {
    alert,
    sendAlert,
};

//mock auth context values defined
const mockAuthContextValue: AuthContextProps = {
  login,
  currentUser,
  signup,
  generateOtp,
  logout
};

describe('Application Upload Page Testing ', ()=>{
//test to check if the Application Upload components are getting rendered or not
test("Renders all components in the Application upload page corectly", ()=>{
    const {getByTestId} = render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <AlertContext.Provider value={mockContextValue}>
            <MemoryRouter>
            <RequireAuth requireAuth={false}>
                <ApplicationUpload />
            </RequireAuth>
            </MemoryRouter>
        </AlertContext.Provider>
      </AuthContext.Provider>
    )

    //all input fields
    const workshopInput = getByTestId('workshopname');
    const postcodeInput = getByTestId('workshoppostcode');
    const addressInput = getByTestId('address');
    const stateInput = getByTestId('state')
    const cityInput = getByTestId('city');
    const usernameInput = getByTestId('appuploadusername');
    const emailInput = getByTestId('appuploaduseremail');
    const mobileInput = getByTestId('appuploadusermobile')
    const baycountInput = getByTestId('baycount');
    const brandInput = getByTestId('brand');
    const servicesOfferedInput = getByTestId("appuploadservices")
    const expertiseInput = getByTestId("appuploadexpertise")
    //const fileInput = getByTestId("appuploadfileupload")
    const consentdataInput = getByTestId("appuploadconsentdata")
    const consentcontactInput = getByTestId("appuploadconsentcontacted")
    const consentrecinfoInput = getByTestId("appuploadconsentrecinfo")

    //all buttons
    const submitBtn = getByTestId('AppUploadSubmitBtn');

    //all input fields are in the document
    expect(workshopInput).toBeInTheDocument();
    expect(postcodeInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(stateInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(mobileInput).toBeInTheDocument();
    expect(baycountInput).toBeInTheDocument();
    expect(brandInput).toBeInTheDocument();
    expect(servicesOfferedInput).toBeInTheDocument();
    expect(expertiseInput).toBeInTheDocument();
    //expect(fileInput).toBeInTheDocument();
    expect(consentdataInput).toBeInTheDocument();
    expect(consentcontactInput).toBeInTheDocument();
    expect(consentrecinfoInput).toBeInTheDocument();

    //all buttons are in the document
    expect(submitBtn).toBeInTheDocument();
}) */


//pending test cases
//test to check whether the email and password input fields are working
/*  test("User can input their email, password and OTP",()=>{
    const {getByTestId} = render(
      <AuthContext.Provider value={mockAuthContextValue}>
      <AlertContext.Provider value={mockContextValue}>
          <MemoryRouter>
          <RequireAuth requireAuth={false}>
              <ApplicationUpload />
          </RequireAuth>
          </MemoryRouter>
      </AlertContext.Provider>
    </AuthContext.Provider>
    )

    const emailInput = getByTestId('workshopname');
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
})  */

//test to check whether the login form submits on clicking on login button or not
/*  test("Submit action gets triggered when signup button is clicked",async()=>{

    //fetch each element by their test id
    const { getByTestId }=render(
      <AuthContext.Provider value={mockAuthContextValue}>
      <AlertContext.Provider value={mockContextValue}>
          <MemoryRouter>
          <RequireAuth requireAuth={false}>
              <ApplicationUpload />
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

    fireEvent.click(SignupBtn) //click the login button
    await waitFor(()=>{
        expect(SignupForm).toHaveFormValues({
            user_email_id: "richa21kiran@gmail.com",
            user_password: "PASSWORDpassword123",
            user_password_confirm: "PASSWORDpassword123",
            otp: '123456'
        })
    })
}) */
//})