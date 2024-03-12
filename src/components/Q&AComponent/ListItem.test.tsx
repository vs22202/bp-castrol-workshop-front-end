/* 
Test 1:
Renders a small ListItem with text.
Checks if the list item, icon, and text are rendered correctly.

Test 2:
Renders a large ListItem with text.
Checks if the list item, icon, and text are rendered correctly.
*/

import "@testing-library/jest-dom";

import { render, screen } from '@testing-library/react';
import ListItem from './ListItem';

describe('ListItem Component', () => {
  it('renders a small ListItem with text', () => {
    // Render the ListItem component with the appropriate props
    render(<ListItem text="Test Item" size="small" />);

    // Assert that the list item is rendered
    const listItem = screen.getByTestId('list-item');
    expect(listItem).toBeInTheDocument();

    // Assert that the icon is rendered
    const icon = screen.getByAltText('Icon');
    expect(icon).toBeInTheDocument();

    // Assert that the text is rendered
    const text = screen.getByText('Test Item');
    expect(text).toBeInTheDocument();

  });

  it('renders a large ListItem with text', () => {
    // Render the ListItem component with the appropriate props
    render(<ListItem text="Test Item" size="large" />);

    // Assert that the list item is rendered
    const listItem = screen.getByTestId('list-item');
    expect(listItem).toBeInTheDocument();

    // Assert that the icon is rendered
    const icon = screen.getByAltText('Icon');
    expect(icon).toBeInTheDocument();

    // Assert that the text is rendered
    const text = screen.getByText('Test Item');
    expect(text).toBeInTheDocument();

  });
});
