import '@testing-library/jest-dom';
import RequireAuth from "../../components/RequireAuthComponent/RequireAuth";
import { MemoryRouter } from "react-router-dom";
import {  act, fireEvent, render, waitFor } from '@testing-library/react';
import { ResetPasswordPage } from './ResetPasswordPage';
import AlertContext, { AlertContextProps } from "../../contexts/AlertContext";
import { AuthProvider } from '../../contexts/AuthContext';
import fetch,{ enableFetchMocks } from 'jest-fetch-mock'
import {createMemoryHistory} from "history";
enableFetchMocks()

const alert = null;
const sendAlert = jest.fn();

const mockContextValue: AlertContextProps = {
    alert,
    sendAlert,
};

const setup=()=>{ return render(
    <MemoryRouter>
        <AlertContext.Provider value={mockContextValue}>
            <AuthProvider>
                <RequireAuth requireAuth={false}>
                    <ResetPasswordPage />
                </RequireAuth>
            </AuthProvider>
        </AlertContext.Provider>
    </MemoryRouter>
);
}

describe('Reset Password Page (OTP through Email) ', () => {
    beforeEach(() => {
    fetchMock.mockClear();
  });

  

test("Renders all components in the Reset Password page corectly [through mobile and email both]", ()=>{
    const {getByRole, getByLabelText,getByText} = setup();
    //all input fields
    const emailInput = getByRole('textbox', { name: 'Email ID *' });
    const passwordInput = getByLabelText(/Password/i, { selector: '#user_password' });
    const passwordConfirmInput = getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' });
    const otpInput = getByRole('textbox', { name: 'OTP *' });

    //all buttons
    const ResetPassword = getByRole('button', { name: 'Reset Password' });
    const otpBtn = getByRole('button', { name: 'Get OTP' });

    //all input fields are in the document
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmInput).toBeInTheDocument();
    expect(otpInput).toBeInTheDocument();

    //all buttons are in the document
    expect(ResetPassword).toBeInTheDocument();
    expect(otpBtn).toBeInTheDocument();

    //checkbox

    expect(getByRole('checkbox',{name:'delete_warning'})).toBeInTheDocument();

    const mobileOption = getByText(/send otp to mobile instead?/i) as HTMLInputElement;

    act(() => {
    fireEvent.click(mobileOption);
    });

    const mobileInput = getByRole('textbox', { name: 'Mobile Number *' });
    expect(mobileInput).toBeInTheDocument();
    
})

test('Validation check of Reset Password page [through mobile and email both]', async () => {

    const { getByRole, getByLabelText, getByText } = setup();
    fireEvent.change(getByRole('textbox', { name: 'Email ID *' }), { target: { value: 'testexample.com' } });
    await waitFor(() => expect(getByText(/email id should be of minimum 5 characters./i)).toBeInTheDocument());
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: 'testexample2001' } });
    await waitFor(() => expect(getByText(/Password should be 10 characters long. Add special characters, number and Capital Letters/i)).toBeInTheDocument());
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });
    expect(getByRole('button', { name: 'Get OTP' })).toBeDisabled();

    const mobileOption = getByText(/send otp to mobile instead?/i) as HTMLInputElement;

    act(() => {
    fireEvent.click(mobileOption);
    });

    fireEvent.change(getByRole('textbox', { name: 'Mobile Number *' }), { target: { value: 'testexample.com' } });
    await waitFor(() => expect(getByText(/Mobile number should be of 10 digits/i)).toBeInTheDocument());

})

test('should reset password successfully and navigate to login page', async () => {
    
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Reset OTP sent successfully' }), { status: 200 });

    const { getByRole, getByLabelText, getByText } = setup();
    const ResetPasswordForm = getByRole('form');
    fireEvent.change(getByRole('textbox', { name: 'Email ID *' }), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    
    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');
    await waitFor(() => {
        expect(sendAlert).toHaveBeenCalledWith({ message: 'OTP sent to email', type: 'success' });
        
    });

    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());

    fireEvent.change(getByRole('textbox', { name: 'OTP *' }), { target: { value: '123456' } });

    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Password reset successfully' }), { status: 200 });

    const ResetPasswordBtn = getByRole('button', { name: 'Reset Password' });
    await waitFor(() =>fireEvent.click(ResetPasswordBtn))

    await waitFor(()=>{
    expect(ResetPasswordForm).toHaveFormValues({
        user_email_id: "test@example.com",
        user_password: "@Testexample2001",
        user_password_confirm: "@Testexample2001",
        otp: '123456'
    })
    })

    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/user/resetPassword');
    expect(sendAlert).toHaveBeenCalledWith({ message: 'Password Reset Successfully', type: 'success' });
    await waitFor(() => {
        const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
        history.listen(() => {
          expect(history.location.pathname).toBe("/login");
       
        });
      });

});



test('otp sucessfully generated and verified but reset password error', async () => {
    
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Reset OTP sent successfully' }), { status: 200 });

    const { getByRole, getByLabelText, getByText } = setup();
    fireEvent.change(getByRole('textbox', { name: 'Email ID *' }), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    
    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');
    expect(sendAlert).toHaveBeenCalledWith({ message: 'OTP sent to email', type: 'success' });

    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());


    fireEvent.change(getByRole('textbox', { name: 'OTP *' }), { target: { value: '123456' } });

    fetchMock.mockReject(new Error('Error adding user to Users table'));

    const ResetPasswordBtn = getByRole('button', { name: 'Reset Password' });
    await waitFor(() =>fireEvent.click(ResetPasswordBtn))


    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/user/resetPassword');
    await waitFor(() => {
        const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); 
        history.listen(() => {
          expect(history.location.pathname).not.toBe("/login");
       
        });
      });

});

test('otp sucessfully generated and verified but reset internal server error', async () => {
    
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Reset OTP sent successfully' }), { status: 200 });

    const { getByRole, getByLabelText, getByText } = setup();
    fireEvent.change(getByRole('textbox', { name: 'Email ID *' }), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    
    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');


    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());


    fireEvent.change(getByRole('textbox', { name: 'OTP *' }), { target: { value: '123456' } });

    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'Error inserting data' }), { status: 500 });

    const ResetPasswordBtn = getByRole('button', { name: 'Reset Password' });
    await waitFor(() =>fireEvent.click(ResetPasswordBtn))

    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/user/resetPassword');
    expect(sendAlert).toHaveBeenCalledWith({ message: 'Error inserting data', type: 'error' });
    await waitFor(() => {
        const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
        history.listen(() => {
          expect(history.location.pathname).not.toBe("/login");
       
        });
      });

});
test('Unregistered user tried to reset password-email case', async () => {
    
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'User Email does not exist. Please SignUp' }), { status: 400 });

    const { getByRole, getByLabelText} = setup();
    fireEvent.change(getByRole('textbox', { name: 'Email ID *' }), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    
    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');
    await waitFor(() => {
    expect(sendAlert).toHaveBeenCalledWith({ message: 'User Email does not exist. Please SignUp', type: 'error' });
    
});
await waitFor(() => {
    const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
    history.listen(() => {
      expect(history.location.pathname).not.toBe("/login");
   
    });
  });

});

test('OTP not generated due to server error', async () => {
    
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'Server error' }), { status: 500 });

    const { getByRole, getByLabelText} = setup();
    fireEvent.change(getByRole('textbox', { name: 'Email ID *' }), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    
    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');
    await waitFor(() => {
    expect(sendAlert).toHaveBeenCalledWith({ message: 'Server error', type: 'error' });
    
});
await waitFor(() => {
    const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
    history.listen(() => {
      expect(history.location.pathname).not.toBe("/login");
   
    });
  });

});

test('OTP not generated due to Invalid request error', async () => {
    
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'Invalid request' }), { status: 500 });

    const { getByRole, getByLabelText} = setup();
    fireEvent.change(getByRole('textbox', { name: 'Email ID *' }), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    
    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');
    await waitFor(() => {
    expect(sendAlert).toHaveBeenCalledWith({ message: 'Invalid request', type: 'error' });
    
});
await waitFor(() => {
    const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
    history.listen(() => {
      expect(history.location.pathname).not.toBe("/login");
   
    });
  });

});

test('reset password should fail due to incorrect otp', async () => {
    
    fetchMock.mockResponseOnce(JSON.stringify({output: 'fail', msg: 'Invalid OTP' }), { status: 400 });

    const { getByRole, getByLabelText, getByText } = setup();

    fireEvent.change(getByRole('textbox', { name: 'Email ID *' }), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    
    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');


    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());


    fireEvent.change(getByRole('textbox', { name: 'OTP *' }), { target: { value: '123456' } });

    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'Invalid OTP' }), { status: 400 });

    const ResetPasswordBtn = getByRole('button', { name: 'Reset Password' });
    await waitFor(() =>fireEvent.click(ResetPasswordBtn))


    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/user/resetPassword');
    
    expect(sendAlert).toHaveBeenCalledWith({ message: 'Invalid OTP', type: 'error' });
    await waitFor(() => {
        const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
        history.listen(() => {
          expect(history.location.pathname).not.toBe("/login");
       
        });
      });
});

test('Reset password unsuccessful due to OTP expiration', async () => {
    jest.useFakeTimers();
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'OTP expired, please regenerate' }), { status: 400 });

    const { getByRole, getByLabelText, getByText } = setup();

    fireEvent.change(getByRole('textbox', { name: 'Email ID *' }), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');

    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());
    jest.advanceTimersByTime(120000);//to have 2 minutes time out for otp

    fireEvent.change(getByRole('textbox', { name: 'OTP *' }), { target: { value: '123456' } });


    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'OTP expired, please regenerate' }), { status: 400 });

    const ResetPasswordBtn = getByRole('button', { name: 'Reset Password' });
    await waitFor(() =>fireEvent.click(ResetPasswordBtn))

    await waitFor(() => {
    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/user/resetPassword');
    })
    expect(sendAlert).toHaveBeenCalledWith({ message: 'OTP expired, please regenerate', type: 'error' });
    await waitFor(() => {
        const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
        history.listen(() => {
          expect(history.location.pathname).not.toBe("/login");
       
        });
      });
      jest.useRealTimers();
});

test('otp expired so otp is regenrated and then reset password is successful', async () => {
    jest.useFakeTimers();
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Reset OTP sent successfully' }), { status: 200 });

    const { getByRole, getByLabelText, getByText, queryByRole } = setup();

    fireEvent.change(getByRole('textbox', { name: 'Email ID *' }), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');

    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());
    jest.advanceTimersByTime(121000);//to have 2 minutes time out for otp
    await waitFor(() => {
    expect(queryByRole('button', { name: /Resend OTP/i })).toBeNull();
    expect(getByRole('button', { name: 'Get OTP' })).toBeInTheDocument();
})
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Reset OTP sent successfully' }), { status: 200 });

    fireEvent.click(getByRole('button', { name: 'Get OTP' }));
    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/user/generateResetOtp');

    fireEvent.change(getByRole('textbox', { name: 'OTP *' }), { target: { value: '123456' } });

    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Password reset successfully' }), { status: 200 });

    const ResetPasswordBtn = getByRole('button', { name: 'Reset Password' });
    await waitFor(() =>fireEvent.click(ResetPasswordBtn))

    await waitFor(() => {
        expect(fetch.mock.calls.length).toEqual(3);
        expect(fetch.mock.calls[2][0]).toEqual('http://localhost:3000/user/resetPassword');
    }); 
    expect(sendAlert).toHaveBeenCalledWith({ message: 'Password Reset Successfully', type: 'success' });
    await waitFor(() => {
        const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
        history.listen(() => {
          expect(history.location.pathname).toBe("/login");
       
        });
      });

      jest.useRealTimers();
});

});

describe('Reset Password Page (OTP through Mobile Number) ', () => {
beforeEach(() => {
fetchMock.mockClear();
});

test('should reset password successfully and navigate to login page', async () => {
    
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Reset OTP sent successfully' }), { status: 200 });

    const { getByRole, getByLabelText, getByText } = setup();
    const mobileOption = getByText(/send otp to mobile instead?/i) as HTMLInputElement;

    act(() => {
    fireEvent.click(mobileOption);
    });
    const ResetPasswordForm = getByRole('form');
    fireEvent.change(getByRole('textbox', { name: 'Mobile Number *' }), { target: { value: '911234567890' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    
    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');
    await waitFor(() => {
        expect(sendAlert).toHaveBeenCalledWith({ message: 'OTP sent to email', type: 'success' });
        
    });

    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());

    fireEvent.change(getByRole('textbox', { name: 'OTP *' }), { target: { value: '123456' } });

    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Password reset successfully' }), { status: 200 });

    const ResetPasswordBtn = getByRole('button', { name: 'Reset Password' });
    await waitFor(() =>fireEvent.click(ResetPasswordBtn))

    await waitFor(()=>{
    expect(ResetPasswordForm).toHaveFormValues({
        user_mobile: "911234567890",
        user_password: "@Testexample2001",
        user_password_confirm: "@Testexample2001",
        otp: '123456'
    })
    })

    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/user/resetPassword');
    expect(sendAlert).toHaveBeenCalledWith({ message: 'Password Reset Successfully', type: 'success' });
    await waitFor(() => {
        const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
        history.listen(() => {
          expect(history.location.pathname).toBe("/login");
       
        });
      });

});



test('otp sucessfully generated and verified but reset password error', async () => {
    
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Reset OTP sent successfully' }), { status: 200 });

    const { getByRole, getByLabelText, getByText } = setup();
    const mobileOption = getByText(/send otp to mobile instead?/i) as HTMLInputElement;

    act(() => {
    fireEvent.click(mobileOption);
    });
    fireEvent.change(getByRole('textbox', { name: 'Mobile Number *' }), { target: { value: '911234567890' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    
    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');
    expect(sendAlert).toHaveBeenCalledWith({ message: 'OTP sent to email', type: 'success' });

    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());


    fireEvent.change(getByRole('textbox', { name: 'OTP *' }), { target: { value: '123456' } });

    fetchMock.mockReject(new Error('Error adding user to Users table'));

    const ResetPasswordBtn = getByRole('button', { name: 'Reset Password' });
    await waitFor(() =>fireEvent.click(ResetPasswordBtn))


    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/user/resetPassword');
    await waitFor(() => {
        const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); 
        history.listen(() => {
          expect(history.location.pathname).not.toBe("/login");
       
        });
      });

});

test('otp sucessfully generated and verified but reset internal server error', async () => {
    
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Reset OTP sent successfully' }), { status: 200 });

    const { getByRole, getByLabelText, getByText } = setup();
    const mobileOption = getByText(/send otp to mobile instead?/i) as HTMLInputElement;

    act(() => {
    fireEvent.click(mobileOption);
    });
    fireEvent.change(getByRole('textbox', { name: 'Mobile Number *' }), { target: { value: '911234567890' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    
    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');


    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());


    fireEvent.change(getByRole('textbox', { name: 'OTP *' }), { target: { value: '123456' } });

    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'Error inserting data' }), { status: 500 });

    const ResetPasswordBtn = getByRole('button', { name: 'Reset Password' });
    await waitFor(() =>fireEvent.click(ResetPasswordBtn))

    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/user/resetPassword');
    expect(sendAlert).toHaveBeenCalledWith({ message: 'Error inserting data', type: 'error' });
    await waitFor(() => {
        const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
        history.listen(() => {
          expect(history.location.pathname).not.toBe("/login");
       
        });
      });

});



test('Unregistered user tried to reset password-mobile case', async () => {
    
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'User Mobile does not exist. Please SignUp Instead.' }), { status: 400 });

    const { getByRole, getByLabelText,getByText} = setup();
    const mobileOption = getByText(/send otp to mobile instead?/i) as HTMLInputElement;

    act(() => {
    fireEvent.click(mobileOption);
    });
    
    fireEvent.change(getByRole('textbox', { name: 'Mobile Number *' }), { target: { value: '911234567890' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    
    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');
    await waitFor(() => {
    expect(sendAlert).toHaveBeenCalledWith({ message: 'User Mobile does not exist. Please SignUp Instead.', type: 'error' });
    
});
await waitFor(() => {
    const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
    history.listen(() => {
      expect(history.location.pathname).not.toBe("/login");
   
    });
  });

});

test('OTP not generated due internal server error', async () => {
    
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'Server error' }), { status: 500 });

    const { getByRole, getByLabelText,getByText} = setup();
    const mobileOption = getByText(/send otp to mobile instead?/i) as HTMLInputElement;

    act(() => {
    fireEvent.click(mobileOption);
    });
    
    fireEvent.change(getByRole('textbox', { name: 'Mobile Number *' }), { target: { value: '911234567890' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    
    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');
    await waitFor(() => {
    expect(sendAlert).toHaveBeenCalledWith({ message: 'Server error', type: 'error' });
    
});
await waitFor(() => {
    const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
    history.listen(() => {
      expect(history.location.pathname).not.toBe("/login");
   
    });
  });

});


test('OTP not generated due invalid request error', async () => {
    
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'Invalid request' }), { status: 500 });

    const { getByRole, getByLabelText,getByText} = setup();
    const mobileOption = getByText(/send otp to mobile instead?/i) as HTMLInputElement;

    act(() => {
    fireEvent.click(mobileOption);
    });
    
    fireEvent.change(getByRole('textbox', { name: 'Mobile Number *' }), { target: { value: '911234567890' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    
    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');
    await waitFor(() => {
    expect(sendAlert).toHaveBeenCalledWith({ message: 'Invalid request', type: 'error' });
    
});
await waitFor(() => {
    const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
    history.listen(() => {
      expect(history.location.pathname).not.toBe("/login");
   
    });
  });

});

test('reset password should fail due to incorrect otp', async () => {
    
    fetchMock.mockResponseOnce(JSON.stringify({output: 'fail', msg: 'Invalid OTP' }), { status: 400 });

    const { getByRole, getByLabelText, getByText } = setup();

    const mobileOption = getByText(/send otp to mobile instead?/i) as HTMLInputElement;

    act(() => {
    fireEvent.click(mobileOption);
    });
    
    fireEvent.change(getByRole('textbox', { name: 'Mobile Number *' }), { target: { value: '911234567890' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    
    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');


    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());


    fireEvent.change(getByRole('textbox', { name: 'OTP *' }), { target: { value: '123456' } });

    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'Invalid OTP' }), { status: 400 });

    const ResetPasswordBtn = getByRole('button', { name: 'Reset Password' });
    await waitFor(() =>fireEvent.click(ResetPasswordBtn))


    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/user/resetPassword');
    
    expect(sendAlert).toHaveBeenCalledWith({ message: 'Invalid OTP', type: 'error' });
    await waitFor(() => {
        const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
        history.listen(() => {
          expect(history.location.pathname).not.toBe("/login");
       
        });
      });
});

test('Reset password unsuccessful due to OTP expiration', async () => {
    jest.useFakeTimers();
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'OTP expired, please regenerate' }), { status: 400 });

    const { getByRole, getByLabelText, getByText } = setup();

    const mobileOption = getByText(/send otp to mobile instead?/i) as HTMLInputElement;

    act(() => {
    fireEvent.click(mobileOption);
    });
    
    fireEvent.change(getByRole('textbox', { name: 'Mobile Number *' }), { target: { value: '911234567890' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');

    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());
    jest.advanceTimersByTime(120000);//to have 2 minutes time out for otp

    fireEvent.change(getByRole('textbox', { name: 'OTP *' }), { target: { value: '123456' } });


    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'OTP expired, please regenerate' }), { status: 400 });

    const ResetPasswordBtn = getByRole('button', { name: 'Reset Password' });
    await waitFor(() =>fireEvent.click(ResetPasswordBtn))

    await waitFor(() => {
    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/user/resetPassword');
    })
    expect(sendAlert).toHaveBeenCalledWith({ message: 'OTP expired, please regenerate', type: 'error' });
    await waitFor(() => {
        const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
        history.listen(() => {
          expect(history.location.pathname).not.toBe("/login");
       
        });
      });
      jest.useRealTimers();
});

test('otp expired so otp is regenrated and then reset password is successful', async () => {
    jest.useFakeTimers();
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Reset OTP sent successfully' }), { status: 200 });

    const { getByRole, getByLabelText, getByText, queryByRole } = setup();

    const mobileOption = getByText(/send otp to mobile instead?/i) as HTMLInputElement;

    act(() => {
    fireEvent.click(mobileOption);
    });
    
    fireEvent.change(getByRole('textbox', { name: 'Mobile Number *' }), { target: { value: '911234567890' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

    fireEvent.click(getByRole('button', { name: 'Get OTP' }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/user/generateResetOtp');

    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());
    jest.advanceTimersByTime(121000);//to have 2 minutes time out for otp
    await waitFor(() => {
    expect(queryByRole('button', { name: /Resend OTP/i })).toBeNull();
    expect(getByRole('button', { name: 'Get OTP' })).toBeInTheDocument();
})
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Reset OTP sent successfully' }), { status: 200 });

    fireEvent.click(getByRole('button', { name: 'Get OTP' }));
    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/user/generateResetOtp');

    fireEvent.change(getByRole('textbox', { name: 'OTP *' }), { target: { value: '123456' } });

    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Password reset successfully' }), { status: 200 });

    const ResetPasswordBtn = getByRole('button', { name: 'Reset Password' });
    await waitFor(() =>fireEvent.click(ResetPasswordBtn))

    await waitFor(() => {
        expect(fetch.mock.calls.length).toEqual(3);
        expect(fetch.mock.calls[2][0]).toEqual('http://localhost:3000/user/resetPassword');
    }); 
    expect(sendAlert).toHaveBeenCalledWith({ message: 'Password Reset Successfully', type: 'success' });
    await waitFor(() => {
        const history = createMemoryHistory({ initialEntries: ['/resetpassword'] }); // Set the initial path
        history.listen(() => {
          expect(history.location.pathname).toBe("/login");
       
        });
      });

      jest.useRealTimers();
});



});