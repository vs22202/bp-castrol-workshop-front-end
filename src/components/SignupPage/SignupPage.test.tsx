import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SignupPage } from './SignupPage';

describe('SignupPage Component', () => {
  it('submits the form and shows success message on successful signup', async () => {
    // Mock the signup function to return 'success'
    const mockSignup = jest.fn().mockResolvedValue('success');

    // Render the SignupPage component
    const { getByText, getByLabelText } = render(<SignupPage />);

    // Fill in form fields
    fireEvent.change(getByLabelText('Email') as HTMLInputElement, { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password') as HTMLInputElement, { target: { value: 'password123' } });
    fireEvent.change(getByLabelText('Confirm Password') as HTMLInputElement, { target: { value: 'password123' } });
    fireEvent.change(getByLabelText('OTP') as HTMLInputElement, { target: { value: '123456' } });

    // Click the "Get OTP" button
    fireEvent.click(getByText('Get OTP'));

    // Wait for the OTP input field to be activated
    await waitFor(() => expect(getByLabelText('OTP') as HTMLInputElement).toBeEnabled());

    // Click the "SignUp" button
    fireEvent.click(getByText('SignUp'));

    // Wait for the signup process to complete
    await waitFor(() => {
      // Assert that a success message is displayed
      expect(getByText('SignUp was successful')).toBeInTheDocument();
    });

    // Assert that the signup function was called with the correct parameters
    expect(mockSignup).toHaveBeenCalledWith('test@example.com', 'password123', '123456');

    // Assert that the user is redirected to the login page
    expect(window.location.pathname).toBe('/login');
  });
});
