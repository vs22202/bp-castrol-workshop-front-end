
import '@testing-library/jest-dom';
import RequireAuth from "../../components/RequireAuthComponent/RequireAuth";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, waitFor } from '@testing-library/react';
//import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { LoginPage } from './LoginPage';
import AlertContext, { AlertContextProps } from "../../contexts/AlertContext";
import { AuthProvider } from '../../contexts/AuthContext';
//import fetch from 'jest-fetch-mock';
import { enableFetchMocks } from 'jest-fetch-mock';
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
<LoginPage />
</RequireAuth>
</AuthProvider>
</AlertContext.Provider>
</MemoryRouter>
);
    }


    //test cases for LoginPage desktop
    describe('LoginPage Component', () => {
    beforeEach(() => {
    fetchMock.mockClear();
    });


    //Renders all components in the Login page corectly
    test("Renders all components in the Login page corectly", ()=>{
    const {getByRole, getByLabelText} = setup();
    //all input fields
    const emailInput = getByRole('textbox', { name: 'Email ID *' });
    const passwordInput = getByLabelText(/Password/i, { selector: '#user_password' });

    //all buttons
    const LoginBtn = getByRole('button', { name: 'Login' });
    const SignupBtn = getByRole('button', { name: 'SignUp' });

    //all input fields are in the document
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    //all buttons are in the document
    expect(LoginBtn).toBeInTheDocument();
    expect(SignupBtn).toBeInTheDocument();
    })


    //should login successfully and navigate to the homepage
    test('should login successfully and navigate to the homepage', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Login Success' }), { status: 200 });
    // Mock successful login response

    const { getByRole, getByLabelText } = setup();
    const LoginForm = getByRole('form');
    fireEvent.change(getByRole('textbox', { name: 'Email ID *' }), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });

    fireEvent.click(getByRole('button', { name: 'Login' }));
    await waitFor(() => {
    // Verify that the correct API endpoint was called for login
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:3000/login');
    })

    await waitFor(() => expect(sendAlert).toHaveBeenCalledWith({ message: "Logged In Successfully", type: "success" }))

    await waitFor(() => {
    expect(LoginForm).toHaveFormValues({
    user_email_id: "test@example.com",
    user_password: "@Testexample2001"
    });
    });

    await waitFor(() => {
    const history = createMemoryHistory({ initialEntries: ['/login'] });
    history.listen(() => {
    expect(history.location.pathname).toBe("/"); // Assuming the homepage path is "/"

    });
    });
    });

    })