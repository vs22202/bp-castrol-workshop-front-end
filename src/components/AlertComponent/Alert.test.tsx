/*
The first test ensures that the Alert component correctly renders the provided message 
('Test message').

The second test ensures that some class is applied to the container element, 
verifying that CSS styles are being applied. 
*/

import { Alert, AlertProps } from './Alert';
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe('Alert component', () => {
  const testProps: AlertProps = {
    type: 'success',
    message: 'Test message',
  };

  it('renders alert with correct message', () => {
    const { getByText } = render(<Alert {...testProps} />);
    const messageElement = getByText('Test message');
    expect(messageElement).toBeInTheDocument();
  });

  it('applies correct type-specific class', () => {
    const { container } = render(<Alert {...testProps} />);
    const alertContainer = container.firstChild as HTMLElement;
    expect(alertContainer.classList.length).toBeGreaterThan(0); 
  });
});
