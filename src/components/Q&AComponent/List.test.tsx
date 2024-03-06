/*
The test in List.test.tsx checks that the List component renders with the specified 
items and size. It iterates through each item in the mockItems array and ensures that 
each item is present in the rendered component by querying the DOM.
*/
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { List, IListProps } from "./List";



describe('List component', () => {
  const mockItems: string[] = ['Item 1', 'Item 2', 'Item 3'];
  const mockSize: "small" | "large" = "small";

  const mockProps: IListProps = {
    items: mockItems,
    size: mockSize
  };

  test('renders list component with items and size', () => {
    const { getByText } = render(<List {...mockProps} />);
    
    mockItems.forEach(item => {
      const itemElement = getByText(item);
      expect(itemElement).toBeInTheDocument();
    });
  });
});
