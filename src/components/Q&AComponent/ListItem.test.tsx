import "@testing-library/jest-dom";

import { render } from '@testing-library/react';
import ListItem from './ListItem';
import styles from './ListItem.module.css'

describe('ListItem Component', () => {
  //basic rendering
  it('Renders List Item properly', () => {//checks if list item is present in document, text and icon classes are getting applied
    // Render the ListItem component with the appropriate props
    const {getByTestId} = render(
      <ListItem text="Test Item" size="small" />
    );

    // Assert that the list item is rendered
    const listItem = getByTestId('list-item');
    expect(listItem).toBeInTheDocument();

    //Assert that list item contains icon img
    expect(listItem.children[0]).toHaveClass(styles.icon) //icon comes before text

    //Assert that the list item contains some text
    expect(listItem.children[1]).toHaveClass(styles.text)

  });

  //correct texts getting applied
  it("Rendering with correct text", ()=>{//renders with the correct text provided
    // Render the ListItem component with the appropriate props
    const {getAllByTestId} = render(
      <>
      <ListItem text="Test Item1" size="small" />
      <ListItem text="Test Item2" size="small" />
      </>
    );

    // Assert that the list item is rendered
    const listItems = getAllByTestId('list-item');

    //check with texts
    expect(listItems[0]).toHaveTextContent("Test Item1");
    expect(listItems[1]).toHaveTextContent("Test Item2");
  })

  //icon rendering
  it("Test icon rendering", ()=>{//renders with the icon mentioned in the source key
    const {getByAltText} = render(
      <ListItem text="Test Item" size="small" />
    );

    // Assert that the list item is rendered
    const iconimgalt = getByAltText("Icon");

    //check if icon gets rendered or not
    expect(iconimgalt).toBeInTheDocument()
    expect(iconimgalt).toHaveClass(styles.icon)
    expect(iconimgalt).toHaveAttribute("src", "src\\assets\\icon.svg")

  })

  //check sizes
  it('Test to check default size rendering of the list items', () => { //check if small class is applied by default
    // Render the ListItem component with the appropriate props
    const {getByTestId} = render(
      <>
      <ListItem text="Test Item1"/>
      </>
    );

    // Assert that the list item is rendered
    const listItems = getByTestId('list-item');

    //check for different sizes of the list items
    expect(listItems.classList).toContain("size-small")
  });

  it('Test to check custom size rendering of the list items', () => { //checks if classes are applied for small and large size
    // Render the ListItem component with the appropriate props
    const {getAllByTestId} = render(
      <>
      <ListItem text="Test Item1" size="small" />
      <ListItem text="Test Item2" size="large" />
      </>
    );

    // Assert that the list item is rendered
    const listItems = getAllByTestId('list-item');

    //check for different sizes of the list items
    expect(listItems[0].classList).toContain("size-small")
    expect(listItems[1].classList).toContain("size-large")
  });

  //check alignment of text and icon
  it("Testing proper alignment of icon and text", ()=>{//check that icon appears before text
    const {getByTestId} = render(
      <>
      <ListItem text="Test Item1" size="large" />
      </>
    );

    // Assert that the list item is rendered
    const listItem = getByTestId('list-item')

    //get the indices of the two elements
    const logoindex = Array.from(listItem.children).findIndex(child=>child.classList.contains("icon"));
    const textindex = Array.from(listItem.children).findIndex(child=>child.classList.contains("text"));

    //check if logo appears before text
    expect(logoindex).toBeLessThan(textindex)
  })
});
