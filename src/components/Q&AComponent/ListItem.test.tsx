import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import { ListItem } from "./ListItem";
import styles from './ListItem.module.css';

describe('ListItem Component', () => {
  test('renders a small ListItem with text', () => {
    render(<ListItem text="Test Item" size="small" />);

    // Assert that the icon is rendered with the small size
    // const icon = screen.getByAltText('Icon') as HTMLImageElement;
    // expect(icon.getAttribute('width')).toBe('16');
    // expect(icon.getAttribute('height')).toBe('16');
    console.log(styles);
    // Assert that the text is rendered
    const text = screen.getByText('Test Item');
    expect(text).toBeTruthy();

    // // Assert that the ListItem has the correct classes
    // const listItem = screen.getByTestId('list-item') as HTMLElement;
    // expect(listItem.classList.contains('list-item')).toBe(true);
    // expect(listItem.classList.contains('size-small')).toBe(true);
  });
});
