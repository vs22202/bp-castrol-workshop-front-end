import { render, fireEvent, waitFor } from '@testing-library/react';
import { SignupPage } from './SignupPage';

describe('SignupPage Component', () => {
  it('redirects to login page after successful registration', async () => {
    // Mock the context functions
    const mockSignup = jest.fn().mockResolvedValue('success');
    const mockGenerateOtp = jest.fn().mockResolvedValue("otp generated");

    // Mock the fetch function to simulate server response
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ output: 'success', user: {} }),
    } as any);

    // Mock the sendAlert function
    const mockSendAlert = jest.fn();

    // Render the SignupPage component
    const { getByText, getByLabelText } = render(<SignupPage />, {
      authContext: {
        signup: mockSignup,
        generateOtp: mockGenerateOtp,
      },
      alertContext: {
        sendAlert: mockSendAlert,
      },
    });

    // Fill in form fields with valid values
    fireEvent.change(getByLabelText('Enter Email ID'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Enter Password'), { target: { value: 'Password123' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'Password123' } });

    // Click the "Get OTP" button
    fireEvent.click(getByText('Get OTP'));

    // Wait for the OTP input field to be activated
    await waitFor(() => expect(getByLabelText('OTP')).toBeEnabled());

    // Fill in the OTP field with a valid OTP
    fireEvent.change(getByLabelText('OTP'), { target: { value: '123456' } });

    // Click the "SignUp" button
    fireEvent.click(getByText('SignUp'));

    // Wait for redirection to the login page
    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });

    // Assert that the context functions were called with correct parameters
    expect(mockGenerateOtp).toHaveBeenCalledWith('test@example.com');
    expect(mockSignup).toHaveBeenCalledWith('test@example.com', 'Password123', '123456');

    // Assert that sendAlert was not called
    expect(mockSendAlert).not.toHaveBeenCalled();
  });
});
