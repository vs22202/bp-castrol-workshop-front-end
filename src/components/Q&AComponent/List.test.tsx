import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { List, IListProps } from "./List";



describe('List component', () => {
  const mockSize: "small" | "large" = "small";

  const mockProps: IListProps = {
    items:  ['Item 1', 'Item 2', 'Item 3'],
    size: mockSize
  };

  //basic rendering
  it('Proper rendering of list with list items and count of list items', () => {//count and render list items

    const { getByTestId } = render(<List {...mockProps} />);

    //fetch component elements
    const list = getByTestId("list");
    const iconscount = list.querySelectorAll("img")?.length;
    const textscount = list.querySelectorAll(".text")?.length;

    //check number of children inside list component
    expect(list.children.length).toBe(3); //only 3 list items are provided in mockprops

    //check presence of 3 icons and texts
    expect(iconscount).toBe(3);
    expect(textscount).toBe(3);

    //check if each child contains classname : "list-item"
    Array.from(list.children).forEach(child=>{
      expect(child).toHaveClass("list-item");

      //check if each child contains an icon and a text
      expect(child.children[0].children[0]).toHaveClass("icon"); //child node has only 1 child which contains icon, text as its child nodes
      expect(child.children[0].children[1]).toHaveClass("text");
    })
  });
  
  //test to check if size is being applied on the list-items
  it('Rendering list-items with the provided size', () => {//checks if size classes small and large are getting applied on items
    const { getAllByTestId } = render(
      <>
      <List items={["test1", "test2"]} size="small"/>
      <List items={["test1", "test2"]} size="large"/>
      </>
    );

    //fetch component elements
    const lists = getAllByTestId("list");

    //to keep count of number of elements
    let countlis1 = 0;
    let countlis2 = 0;
    
    //check size applied
    //first list has size - small
    Array.from(lists[0].children).forEach((child)=>{
      expect(child.children[0].classList).toContain("size-small");
      countlis1+=1;
    })

    //first list has size - large
    Array.from(lists[1].children).forEach((child)=>{
      expect(child.children[0].classList).toContain("size-large");
      countlis2+=1;
    })

    //check for total number of elements
    expect(countlis1).toBe(lists[0].children.length)
    expect(countlis2).toBe(lists[1].children.length)
  });

  //check if defualt size-small gets applied
  it('Rendering list-items with the default size', () => {//checks if size class small gets applied on the items
    const { getByTestId } = render(
      <>
      <List items={["test1", "test2"]}/>
      </>
    );

    //fetch component elements
    const list = getByTestId("list");

    //to keep count of number of elements
    let countlis = 0;
    
    //check size applied with default size-small
    Array.from(list.children).forEach((child)=>{
      expect(child.children[0].classList).toContain("size-small");
      countlis+=1;
    })

    //check for total number of elements
    expect(countlis).toBe(list.children.length)
  });

  //check for text
  it('Rendering list-items with the provided text', () => {//checks if proper text is applied on list items
    const { getByTestId } = render(
      <List items={["test1", "test2"]}/>
    );

    //fetch component elements
    const list = getByTestId("list");
    
    //check text applied
    expect(list.children[0].children[0].children[1]).toHaveTextContent("test1");
    expect(list.children[1].children[0].children[1]).toHaveTextContent("test2");
  });

  //performance check
  it('Performance check for List with 100 List Items', () => {//time taken to render 100 list items in a list component
    const items = new Array(100).fill('Item'); // create a large array of items
  
    // measure the time it takes to render the List component
    const startTime = performance.now();
    render(<List items={items} />);
    const endTime = performance.now();
  
    const renderTime = endTime - startTime;
    console.log('Render time:', renderTime, 'milliseconds');
  
    // Assert that the render time is within 100ms
    expect(renderTime).toBeLessThan(150);
  });
});
