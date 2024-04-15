
import '@testing-library/jest-dom';
import RequireAuth from "../../components/RequireAuthComponent/RequireAuth";
import { MemoryRouter } from "react-router-dom"; 
import { fireEvent, render, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';
import AlertContext, { AlertContextProps } from "../../contexts/AlertContext";
import { AuthProvider } from '../../contexts/AuthContext';
import fetch ,{ enableFetchMocks } from 'jest-fetch-mock';
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
//LoginPage Mobile Component

describe('LoginPage Mobile Component', () => {
    beforeEach(() => {
    fetchMock.mockClear();
    }); 


//Renders all components in the Login mobile page corectly
    test("Renders all components in the Login mobile page corectly", async ()=>{
    const {getByRole, getByLabelText} = setup();



    //all input fields
    const mobileInput = getByRole('textbox', { name: 'Email ID / Phone Number *' });
    const passwordInput = getByLabelText(/Password/i, { selector: '#user_password' });

    //all buttons
    const LoginBtn = getByRole('button', { name: 'Login' });
    const SignupBtn = getByRole('button', { name: 'Sign Up' });

    //all input fields are in the document
    expect(mobileInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    //all buttons are in the document
    expect(LoginBtn).toBeInTheDocument();
    expect(SignupBtn).toBeInTheDocument();
 
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'Invalid Mobile No./Password' }), { status: 400 });
    fireEvent.change(getByRole('textbox', { name: 'Email ID / Phone Number *' }), { target: { value: '911234567890' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    await waitFor(() =>{fireEvent.click(LoginBtn) });    
    await waitFor(() => {expect(fetch.mock.calls.length).toEqual(1); }); 

})

//Login should fail due to Invalid Mobile No./Password
    test('Login should fail due to Invalid Mobile No./Password ', async () => {

    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'Invalid Mobile No./Password' }), { status: 400 });
    const { getByRole, getByLabelText } = setup();


    fireEvent.change(getByRole('textbox', { name: 'Email ID / Phone Number *' }), { target: { value: '911234567890' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    const LoginBtn = getByRole('button', { name: 'Login' });
    await waitFor(() =>{fireEvent.click(LoginBtn)
    });

    await waitFor(() => {
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/login/mobile');
    });

    await waitFor(() =>expect(sendAlert).toHaveBeenCalledWith({ message: 'Invalid Mobile No./Password', type: 'error' }));

    await waitFor(() => {
    const history = createMemoryHistory({ initialEntries: ['/login'] }); // Set the initial path
    history.listen(() => {
    expect(history.location.pathname).not.toBe("/");
    // Ensure user is not redirected
    });
    });
});

//Login should be unsuccessful due to Server side error
    test('Login should fail due to Server side error ', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'Server side error' }), { status: 500 });
    const { getByRole, getByLabelText } = setup();


    fireEvent.change(getByRole('textbox', { name: 'Email ID / Phone Number *' }), { target: { value: '911234567890' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    const LoginBtn = getByRole('button', { name: 'Login' });
    await waitFor(() =>fireEvent.click(LoginBtn));

    await waitFor(() => {
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/login/mobile');
    });

    await waitFor(() =>expect(sendAlert).toHaveBeenCalledWith({ message: 'Server side error', type: 'error' }))

    await waitFor(() => {
    const history = createMemoryHistory({ initialEntries: ['/login'] }); // Set the initial path
    history.listen(() => {
    expect(history.location.pathname).not.toBe("/");
    // Ensure user is not redirected
    });
    });
});

//LOGIN SHOULD FAIL DUE TO USER NOT VERIFIED
    test('Login should fail due to User not verified ', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'fail', msg: 'User not verified' }), { status: 400 });
    const { getByRole, getByLabelText } = setup();


    fireEvent.change(getByRole('textbox', { name: 'Email ID / Phone Number *' }), { target: { value: '911234567890' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    const LoginBtn = getByRole('button', { name: 'Login' });
    await waitFor(() =>fireEvent.click(LoginBtn));

    await waitFor(() => {
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/login/mobile');
    });

    await waitFor(() =>expect(sendAlert).toHaveBeenCalledWith({ message: 'User not verified', type: 'error' }));

    await waitFor(() => {
    const history = createMemoryHistory({ initialEntries: ['/login'] }); // Set the initial path
    history.listen(() => {
    expect(history.location.pathname).not.toBe("/");
    // Ensure user is not redirected
    });
    });
});

//should login successfully and navigate to the homepage
    test('should login successfully and navigate to homepage', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'Login Success' }), { status: 200 });
    const { getByRole, getByLabelText} = setup();


    const LoginForm = getByRole('form');

    fireEvent.change(getByRole('textbox', { name: 'Email ID / Phone Number *' }), { target: { value: '911234567890' } });
    fireEvent.change(getByLabelText(/Password/i, { selector: '#user_password' }), { target: { value: '@Testexample2001' } });
    const LoginBtn = getByRole('button', { name: 'Login' });

    await waitFor(() =>fireEvent.click(LoginBtn))

    await waitFor(() => {
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/login/mobile');
    });

    await waitFor(() => {
    expect(sendAlert).toHaveBeenCalledWith({ message: "Logged In Successfully", type: "success" });
    });

    await waitFor(()=>{
    expect(LoginForm).toHaveFormValues({
    user_id: "911234567890",
    user_password: "@Testexample2001"
    });
    });
    await waitFor(() => {
    const history = createMemoryHistory({ initialEntries: ['/login'] }); // Set the initial path
    history.listen(() => {
    expect(history.location.pathname).toBe("/");
    // Assuming the homepage path is "/"
    });
    });
}); 
})