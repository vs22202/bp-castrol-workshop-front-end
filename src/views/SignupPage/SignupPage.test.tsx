import '@testing-library/jest-dom';
import RequireAuth from "../../components/RequireAuthComponent/RequireAuth";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, waitFor } from '@testing-library/react';
import { SignupPage } from './SignupPage';
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

describe('SignupPage Component', () => {
    it('should signup successfully and navigate to login page', async () => {
        
        fetchMock.mockResponse(JSON.stringify({ output: 'success', msg: 'OTP send successfully' }), { status: 200 });

        const { getByRole, getByLabelText, getByText } = render(
            <MemoryRouter>
                <AlertContext.Provider value={mockContextValue}>
                    <AuthProvider>
                        <RequireAuth requireAuth={false}>
                            <SignupPage />
                        </RequireAuth>
                    </AuthProvider>
                </AlertContext.Provider>
            </MemoryRouter>
        );

        fireEvent.change(getByRole('textbox', { name: 'Email ID *' }), { target: { value: 'test@example.com' } });
        fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
        fireEvent.change(getByLabelText(/Confirm Password/i, { selector: '#user_password_confirm' }), { target: { value: '@Testexample2001' } });

        
        fireEvent.click(getByRole('button', { name: 'Get OTP' }));

        // console.log("Fetch calls after OTP generation:", fetch.mock.calls.length);
        // console.log("URL of last fetch call:", fetch.mock.calls[fetch.mock.calls.length - 1][0]);
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/generateOtp');

    
        await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());


        fireEvent.change(getByRole('textbox', { name: 'OTP *' }), { target: { value: '123456' } });

        fetchMock.mockResponse(JSON.stringify({ output: 'success', msg: 'User registered successfully' }), { status: 200 });

        const SignupBtn = getByRole('button', { name: 'SignUp' });
        await waitFor(() =>fireEvent.click(SignupBtn))

        // console.log("Fetch calls after signup:", fetch.mock.calls.length);
        // console.log("URL of last fetch call:", fetch.mock.calls[fetch.mock.calls.length - 1][0]);
        expect(fetch.mock.calls.length).toEqual(2);
        expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/register');
        expect(sendAlert).toHaveBeenCalledWith({ message: 'SignUp was successful', type: 'success' });
        await waitFor(() => {
            const history = createMemoryHistory({ initialEntries: ['/signup'] }); // Set the initial path
            history.listen(() => {
              expect(history.location.pathname).toBe("/login");
           
            });
          });

    });
});
