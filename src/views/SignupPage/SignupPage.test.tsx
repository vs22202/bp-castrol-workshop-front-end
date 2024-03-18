import { fireEvent, render, waitFor, screen, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import { SignupPage } from "./SignupPage";
import RequireAuth from "../../components/RequireAuthComponent/RequireAuth";
import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";
import AlertContext, {AlertContextProps} from "../../contexts/AlertContext";
import { MemoryRouter } from "react-router-dom";
import fetchMock from 'jest-fetch-mock';

//how it is implemented---
//1.isolate the given fetch api call function which you want to test
//2.define the mock implementation for that particular function
//3.use fetchMock to mock the fetch api response so that when fetch is called this response is taken instead of calling the api url
//4.using this mockresponse check if function is working correctly by checking arguments, api call or using send alert
//5. check for different error test cases using mockreject


const alert = null;
const sendAlert= jest.fn();
const login = jest.fn();
const currentUser = null;
const signup = jest.fn();
const signupMobile = jest.fn();
const generateOtp =  jest.fn();
const generateOtpMobile = jest.fn();
const logout = jest.fn();


const mockContextValue: AlertContextProps = {
    alert,
    sendAlert,
};

const mockAuthContextValue: AuthContextProps = {
    login,
    currentUser,
    signup,
    signupMobile,
    generateOtp,
    generateOtpMobile,
    logout,
    loginMobile: function (_mobile_no: string): Promise<string> {
        throw new Error("Function not implemented.");
    },
    changePassword: function (_password: string): Promise<string> {
        throw new Error("Function not implemented.");
    },
    generateResetOtp: function (): void {
        throw new Error("Function not implemented.");
    },
    resetPassword: function (_password: string,  _mobile_no?: string | undefined): Promise<string> {
        throw new Error("Function not implemented.");
    }
};



describe('SignUp Page Testing ', ()=>{
    beforeEach(() => {
        fetchMock.mockClear();
      });
    test("Renders all components in the Signup page corectly", ()=>{
        const {getByRole, getByLabelText} = render(
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
        const emailInput = getByRole('textbox', { name: 'Email ID *' });
        const passwordInput = getByLabelText(/Password/i, { selector: '#user_password' });
        const passwordConfirmInput = getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' });
        const otpInput = getByRole('textbox', { name: 'OTP *' });
    
        //all buttons
        const LoginBtn = getByRole('button', { name: 'Login' });
        const SignupBtn = getByRole('button', { name: 'SignUp' });
        const otpBtn = getByRole('button', { name: 'Get OTP' });
    
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
    test("User can input their email, password and OTP",()=>{
        const {getByRole, getByLabelText} = render(
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
        const emailInput = getByRole('textbox', { name: 'Email ID *' });
        const passwordInput = getByLabelText(/Password/i, { selector: '#user_password' });
        const passwordConfirmInput = getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' });
        const otpInput = getByRole('textbox', { name: 'OTP *' });
        const otpBtn = getByRole('button', { name: 'Get OTP' });
    
        act(() => {
        fireEvent.change(emailInput, {target:{value:"testexample@gmail.com"}});
        fireEvent.change(passwordInput, {target:{value:"@Testexample2024"}});
        fireEvent.change(passwordConfirmInput, {target:{value:"@Testexample2024"}});
        fireEvent.click(otpBtn);
        fireEvent.change(otpInput, {target:{value:"123456"}});
    });
        expect(emailInput).toHaveValue("testexample@gmail.com");
        expect(passwordInput).toHaveValue("@Testexample2024");
        expect(passwordConfirmInput).toHaveValue("@Testexample2024");
        expect(otpInput).toHaveValue("123456");
    }) 
     test("Submit action gets triggered when signup button is clicked",async()=>{
    
        const { getByRole, getByLabelText }=render(
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
    
        const SignupForm = screen.getByRole('form');
        const emailInput = getByRole('textbox', { name: 'Email ID *' });
        const passwordInput = getByLabelText(/Password/i, { selector: '#user_password' });
        const passwordConfirmInput = getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' });
        const otpInput = getByRole('textbox', { name: 'OTP *' });
        const SignupBtn = getByRole('button', { name: 'SignUp' });
        const otpBtn = getByRole('button', { name: 'Get OTP' });
    
        act(() => {
        fireEvent.change(emailInput, {target:{value:"testexample@gmail.com"}});
        fireEvent.change(passwordInput, {target:{value:"@Testexample2024"}});
        fireEvent.change(passwordConfirmInput, {target:{value:"@Testexample2024"}});
        fireEvent.click(otpBtn);
        fireEvent.change(otpInput, {target:{value:"123456"}});
    
        fireEvent.click(SignupBtn) 
    });
        await waitFor(()=>{
            expect(SignupForm).toHaveFormValues({
                user_email_id: "testexample@gmail.com",
                user_password: "@Testexample2024",
                user_password_confirm: "@Testexample2024",
                otp: '123456'
            })
        })
    })


test('OTP generation All Test Cases ', async()=>{

    const generateOtp =jest.fn().mockImplementation(async (email) => {
        const formData = new FormData();
        formData.append("user_email", email);
        try {
            const res = await fetch("http://localhost:3000/generateOtp", {
                method: "POST",
                headers: {},
                body: formData,
            });
            if (!res.ok) {
                throw new Error('Failed to generate OTP');
            }
            const json = await res.json();
            console.log(json); 
        } catch (err) {
            console.log(err); 
            throw err;
        }
    })


    const modifiedMockAuthContextValue: AuthContextProps = {
        ...mockAuthContextValue,
        generateOtp: generateOtp
    };
    

    render(
        <AuthContext.Provider value={modifiedMockAuthContextValue}>
            <AlertContext.Provider value={mockContextValue}>
                <MemoryRouter>
                    <RequireAuth requireAuth={false}>
                        <SignupPage />
                    </RequireAuth>
                </MemoryRouter>
            </AlertContext.Provider>
        </AuthContext.Provider>
    );
    //1.Normal success response
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    await modifiedMockAuthContextValue.generateOtp("testexample@gmail.com");

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/generateOtp', {
        method: 'POST',
        headers: { },
        body: expect.any(FormData),
    });
    if (fetchMock.mock.calls.length > 0) {
        const request = fetchMock.mock.calls[0][1];
        const requestBody = request?.body as FormData;
        const email = requestBody.get('user_email');
        expect(email).toBe("testexample@gmail.com");
    
    }


    // 2.Mock a failed response with status code 500-internal server error 
    fetchMock.mockResponseOnce('', { status: 500 }); 
    
    await expect(modifiedMockAuthContextValue.generateOtp("test@example.com")).rejects.toThrow('Failed to generate OTP');

    // 3.Mock a failed response with status code 422-validation error/dataformat error
    fetchMock.mockResponseOnce('', { status: 422 }); 
    
    await expect(modifiedMockAuthContextValue.generateOtp("test@example.com")).rejects.toThrow('Failed to generate OTP');
});

test('OTP generation mobile All Test Cases ', async()=>{
    const generateOtpMobile =jest.fn().mockImplementation(async (mobile_no) => {
        const formData = new FormData();
        formData.append("user_mobile", mobile_no);
        try {
            const res = await fetch("http://localhost:3000/generateOtp/mobile", {
                method: "POST",
                headers: {},
                body: formData,
            });
            if (!res.ok) {
                throw new Error('Failed to generate OTP');
            }
            const json = await res.json(); 
            console.log(json); 
        } catch (err) {
            console.log(err); 
            throw err;
        }
    })
    
    const modifiedMockAuthContextValue: AuthContextProps = {
        ...mockAuthContextValue,
        generateOtpMobile: generateOtpMobile
    };
    
    render(
        <AuthContext.Provider value={modifiedMockAuthContextValue}>
            <AlertContext.Provider value={mockContextValue}>
                <MemoryRouter>
                    <RequireAuth requireAuth={false}>
                        <SignupPage />
                    </RequireAuth>
                </MemoryRouter>
            </AlertContext.Provider>
        </AuthContext.Provider>
    );

    // 1.Normal success response
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
    
    await modifiedMockAuthContextValue.generateOtpMobile("1234567890");
    
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/generateOtp/mobile', {
        method: 'POST',
        headers: { },
        body: expect.any(FormData),
    });
    if (fetchMock.mock.calls.length > 0) {
    
        const request = fetchMock.mock.calls[0][1];
        const requestBody = request?.body as FormData;
        const mobile = requestBody.get('user_mobile');
        expect(mobile).toBe("1234567890");
    
    }
    // 2.Mock a failed response with status code 500-internal server error 
    fetchMock.mockResponseOnce('', { status: 500 }); 
    
    await expect(modifiedMockAuthContextValue.generateOtpMobile("1234567890")).rejects.toThrow('Failed to generate OTP');

    // 3.Mock a failed response with status code 422-validation error/dataformat error
    fetchMock.mockResponseOnce('', { status: 422 }); 
    
    await expect(modifiedMockAuthContextValue.generateOtpMobile("1234567890")).rejects.toThrow('Failed to generate OTP');
});

test('SignUp page integration tests ', async()=>{
    const signup = jest.fn().mockImplementation(async (
        email: string,
        password: string,
        otp: string
      ): Promise<string> => {
        const formData = new FormData();
        formData.append("user_email", email);
        formData.append("password", password);
        formData.append("otp", otp);
        try {
          const result = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {},
            body: formData,
          });
          const res = await result.json();
          if (res.output == "fail") {
            sendAlert({ message: res.msg as string, type: "error" });
            return "failure";
          }
          else{
            sendAlert({
                message: "SignUp was successful",
                type: "success",
              });
          return "success";
          }
        } catch (err) {
            console.log(err);
            sendAlert({ message: (err as Error).message, type: "error" });
            return "failure";
        }
      })

    const modifiedMockAuthContextValue: AuthContextProps = {
        ...mockAuthContextValue,
        signup: signup
    };
    
    const { getByRole, getByLabelText }=render(
        <AuthContext.Provider value={modifiedMockAuthContextValue}>
            <AlertContext.Provider value={mockContextValue}>
                <MemoryRouter>
                    <RequireAuth requireAuth={false}>
                        <SignupPage />
                    </RequireAuth>
                </MemoryRouter>
            </AlertContext.Provider>
        </AuthContext.Provider>
    );

    const emailInput = getByRole('textbox', { name: 'Email ID *' });
    const passwordInput = getByLabelText(/Password/i, { selector: '#user_password' });
    const passwordConfirmInput = getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' });
    const otpInput = getByRole('textbox', { name: 'OTP *' });
    const SignupBtn = getByRole('button', { name: 'SignUp' });
    const otpBtn = getByRole('button', { name: 'Get OTP' });

    act(() => {
    fireEvent.change(emailInput, {target:{value:"testexample@gmail.com"}});
    fireEvent.change(passwordInput, {target:{value:"@Testexample2024"}});
    fireEvent.change(passwordConfirmInput, {target:{value:"@Testexample2024"}});
    fireEvent.click(otpBtn);
    fireEvent.change(otpInput, {target:{value:"123456"}});
});
    // 1. Successful case of sign up 
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
    act(() => {
    fireEvent.click(SignupBtn);
});

    await modifiedMockAuthContextValue.signup("testexample@gmail.com", "@Testexample1234","123456");

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/register', {
        method: 'POST',
        headers: { },
        body: expect.any(FormData),
    });
    await waitFor(() => {
        expect(signup).toHaveBeenCalledWith('testexample@gmail.com', '@Testexample1234', '123456');
        expect(sendAlert).toHaveBeenCalledWith({ message: 'SignUp was successful', type: 'success' });
    })
    if (fetchMock.mock.calls.length > 0) {
        const request = fetchMock.mock.calls[0][1];
        const requestBody = request?.body as FormData;
        const email = requestBody.get('user_email');
        expect(email).toBe("testexample@gmail.com");
        const password = requestBody.get('password');
        expect(password).toBe("@Testexample1234");
        const otp = requestBody.get('otp');
        expect(otp).toBe("123456");
    
    }

    //2.Failed sign up - Backend gave error

    fetchMock.mockRejectOnce(new Error('Failed to connect to the server'));
    act(() => {
    fireEvent.click(SignupBtn);
});

    await modifiedMockAuthContextValue.signup("testexample@gmail.com", "@Testexample1234","123456");

    await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/register', {
            method: 'POST',
            headers: { },
            body: expect.any(FormData),
        });

        expect(signup).toHaveBeenCalledWith('testexample@gmail.com', '@Testexample1234', '123456');
        expect(sendAlert).toHaveBeenCalledWith({ message: 'Failed to connect to the server', type: 'error' });
    });

});

test('SignUp page mobile integration tests ', async()=>{
    const signupMobile = jest.fn().mockImplementation(async (
        mobile: string,
        password: string,
        otp: string
      ): Promise<string> => {
        const formData = new FormData();
        formData.append("user_mobile", mobile);
        formData.append("password", password);
        formData.append("otp", otp);
        try {
          const result = await fetch("http://localhost:3000/register/mobile", {
            method: "POST",
            headers: {},
            body: formData,
          });

          const res = await result.json();
          if (res.output == "fail") {
            sendAlert({ message: res.msg as string, type: "error" });
            return "failure";
          }
          else{
            sendAlert({
                message: "SignUp was successful",
                type: "success",
              });
          return "success";
          }
        } catch (err) {
            console.log(err);
            return "failure";
        }
      })
    const modifiedMockAuthContextValue: AuthContextProps = {
        ...mockAuthContextValue,
        signupMobile: signupMobile
    };
    
    const { getByRole, getByLabelText,getByText }=render(
        <AuthContext.Provider value={modifiedMockAuthContextValue}>
            <AlertContext.Provider value={mockContextValue}>
                <MemoryRouter>
                    <RequireAuth requireAuth={false}>
                        <SignupPage />
                    </RequireAuth>
                </MemoryRouter>
            </AlertContext.Provider>
        </AuthContext.Provider>
    );

    const mobileOption = getByText(/SignUp using mobile instead?/i) as HTMLInputElement;
    act(() => {
    fireEvent.click(mobileOption);
    });
    const mobileInput = getByRole('textbox', { name: 'Mobile Number *' });
    const passwordInput = getByLabelText(/Password/i, { selector: '#user_password' });
    const passwordConfirmInput = getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' });
    const otpInput = getByRole('textbox', { name: 'OTP *' });
    const SignupBtn = getByRole('button', { name: 'SignUp' });
    const otpBtn = getByRole('button', { name: 'Get OTP' });
    act(() => {
    fireEvent.change(mobileInput, {target:{value:"1234567890"}});
    fireEvent.change(passwordInput, {target:{value:"@Testexample2024"}});
    fireEvent.change(passwordConfirmInput, {target:{value:"@Testexample2024"}});
    fireEvent.click(otpBtn);
    fireEvent.change(otpInput, {target:{value:"123456"}});
    });
    // 1. Successful case of sign up mobile
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
    act(() => {
    fireEvent.click(SignupBtn);
    });
    
    await modifiedMockAuthContextValue.signupMobile("1234567890", "@Testexample1234","123456");
    
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/register/mobile', {
        method: 'POST',
        headers: { },
        body: expect.any(FormData),
    });
    await waitFor(() => {

        expect(signupMobile).toHaveBeenCalledWith('1234567890', '@Testexample1234', '123456');
        expect(sendAlert).toHaveBeenCalledWith({ message: 'SignUp was successful', type: 'success' });
    })
    if (fetchMock.mock.calls.length > 0) {
        const request = fetchMock.mock.calls[0][1];
        const requestBody = request?.body as FormData;
        const mobile = requestBody.get('user_mobile');
        expect(mobile).toBe("1234567890");
        const password = requestBody.get('password');
        expect(password).toBe("@Testexample1234");
        const otp = requestBody.get('otp');
        expect(otp).toBe("123456");
    
    }
    //2.Failed sign up mobile - Backend gave error

    fetchMock.mockResponseOnce("", { status: 422 });
    act(() => {
    fireEvent.click(SignupBtn);
    });
    await modifiedMockAuthContextValue.signupMobile("1234567890", "@Testexample1234", "123456");

    expect(sendAlert).toHaveBeenCalledWith({ message: 'Failed to connect to the server', type: 'error' });

});

test('SignUp page mobile integration tests - Incorrect OTP', async() => {

    const signupMobile = jest.fn().mockResolvedValue('failure');

    const modifiedMockAuthContextValue: AuthContextProps = {
        ...mockAuthContextValue,
        signupMobile: signupMobile
    };

    const { getByRole, getByLabelText, getByText } = render(
        <AuthContext.Provider value={modifiedMockAuthContextValue}>
            <AlertContext.Provider value={mockContextValue}>
                <MemoryRouter>
                    <RequireAuth requireAuth={false}>
                        <SignupPage />
                    </RequireAuth>
                </MemoryRouter>
            </AlertContext.Provider>
        </AuthContext.Provider>
    );

    const mobileOption = getByText(/SignUp using mobile instead?/i) as HTMLInputElement;
    act(() => {
    fireEvent.click(mobileOption);
    });

    const mobileInput = getByRole('textbox', { name: 'Mobile Number *' });
    const passwordInput = getByLabelText(/Password/i, { selector: '#user_password' });
    const passwordConfirmInput = getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' });
    const otpInput = getByRole('textbox', { name: 'OTP *' });
    const SignupBtn = getByRole('button', { name: 'SignUp' });
    const otpBtn = getByRole('button', { name: 'Get OTP' });
    act(() => {

    fireEvent.change(mobileInput, {target:{value:"1234567890"}});
    fireEvent.change(passwordInput, {target:{value:"@Testexample2024"}});
    fireEvent.change(passwordConfirmInput, {target:{value:"@Testexample2024"}});
    fireEvent.click(otpBtn);
    fireEvent.change(otpInput, {target:{value:"987654"}}); // Incorrect OTP
    });

    signupMobile.mockResolvedValueOnce('failure');
    act(() => {
    fireEvent.click(SignupBtn);
    });
    await waitFor(() => {
        expect(sendAlert).toHaveBeenCalledWith({ message: 'Failed to connect to the server', type: 'error' });
    });
});



});

