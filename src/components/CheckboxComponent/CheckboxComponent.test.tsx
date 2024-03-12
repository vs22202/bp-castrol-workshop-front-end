// CheckboxComponent.test.tsx

/*
-It ensures that the Checkbox component can be rendered without encountering any errors.
-Verifies that the Checkbox component displays the correct text as provided in the props.
-Checks whether the required indicator ('*') is applied when the required prop is set to true.
-Checks whether the required indicator ('*') is not displayed when the required prop is set to false.
*/

import { render } from '@testing-library/react';
import { Checkbox, CheckboxProps } from './CheckboxComponent';
import "@testing-library/jest-dom";

describe('CheckboxComponent', () => {
  const defaultProps: CheckboxProps = {
    name: 'testCheckbox',
    size: 'medium',
    text: 'Test Checkbox',
    register: jest.fn(),
    errors: {}
  };

  it('renders without crashing', () => {
    render(<Checkbox {...defaultProps} />);
  });

  it('renders the checkbox with the correct text', () => {
    const { getByText } = render(<Checkbox {...defaultProps} />);
    expect(getByText('Test Checkbox')).toBeInTheDocument();
  });

  it('applies the required indicator when required prop is true', () => {
    const { getByText } = render(<Checkbox {...defaultProps} required />);
    expect(getByText('*')).toBeInTheDocument();
  });

  it('does not apply the required indicator when required prop is false', () => {
    const { queryByText } = render(<Checkbox {...defaultProps} required={false} />);
    expect(queryByText('*')).toBeNull();
  });
});
