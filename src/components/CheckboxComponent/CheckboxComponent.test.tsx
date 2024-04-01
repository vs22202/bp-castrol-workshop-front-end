// CheckboxComponent.test.tsx

/*
-It ensures that the Checkbox component can be rendered without encountering any errors.
-Verifies that the Checkbox component displays the correct text as provided in the props.
-Checks whether the required indicator ('*') is applied when the required prop is set to true.
-Checks whether the required indicator ('*') is not displayed when the required prop is set to false.
*/

import { fireEvent, render } from '@testing-library/react';
import { Checkbox } from './CheckboxComponent';
import "@testing-library/jest-dom";
import styles from './CheckboxComponent.module.css'

describe('CheckboxComponent', () => {

  //Testing basic rendering
  it('Test proper rendering', () => {
    //render the component
    const {getByRole} = render(
      <Checkbox name='testCheckbox' size='medium' text='Test Checkbox' register={jest.fn()} errors={{}} required={true}/>
    );

    //fetch the checkbox
    const checkbox = getByRole("checkbox");

    //check if correct checkbox with correct name has rendered
    expect(checkbox).toHaveAttribute("name", "testCheckbox");

    //check if required 
    expect(checkbox).toBeRequired();

    //check size rendered 
    expect(checkbox).toHaveClass("iconmedium")
  });

  it('Test rendering of the checkbox with the correct text and asterisk(if required)', () => {
    const { getAllByRole } = render(
      <>
      <Checkbox name='testCheckbox1' size='large' text='Test Checkbox1' register={jest.fn()} errors={{}} required={true}/>
      <Checkbox name='testCheckbox2' size='medium' text='Test Checkbox2' register={jest.fn()} errors={{}}/>
      </>
    );
    //fetch checkboxes
    const checkboxes = getAllByRole("checkbox");

    //check if they contain the right text
    expect(checkboxes[0].parentElement).toHaveTextContent("Test Checkbox1");
    expect(checkboxes[1].parentElement).toHaveTextContent("Test Checkbox2");

    //check if there's an asterisk on required checkbox 
    expect(checkboxes[0].parentElement).toHaveTextContent(/\*/);
    expect(checkboxes[1].parentElement).not.toHaveTextContent(/\*/);
  });

  //Testing sizes
  it('Testing sizes', ()=>{ //checks if size classes get applied or not
    const {getAllByRole} = render(
      <>
      <Checkbox name='testCheckbox' size='small' text='Test Checkbox' register={jest.fn()} errors={{}}/>
      <Checkbox name='testCheckbox' size='medium' text='Test Checkbox' register={jest.fn()} errors={{}}/>
      <Checkbox name='testCheckbox' size='large' text='Test Checkbox' register={jest.fn()} errors={{}}/>
      </>
    );

    //fetch the checkbox
    const checkboxes = getAllByRole("checkbox");

    //check size rendered 
    expect(checkboxes[0]).toHaveClass(styles.iconsmall)
    expect(checkboxes[1]).toHaveClass(styles.iconmedium)
    expect(checkboxes[2]).toHaveClass(styles.iconlarge)
  })

  //Testing Functionality
  it('Test to check mandatory checkbox functionality', () => {//checks mandatory checkbox

    const handleSubmit = jest.fn();
    const { getByRole } = render(
      <form onSubmit={handleSubmit}>
        <Checkbox name='testCheckbox' size='large' text='Test Checkbox' register={jest.fn()} errors={{}} required={true}/>
        <input type='submit'/>
      </form>
    );
    //fetch the elements
    const btn = getByRole("button");
    const checkbox = getByRole("checkbox");

    //checks if form doesnt get submitted without checking mandatory checkbox
    fireEvent.click(btn);
    expect(handleSubmit).toHaveBeenCalledTimes(0);

    //click the checkbox
    fireEvent.click(checkbox);

    //again click on the button and check if form gets submitted this time
    fireEvent.click(btn);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("Test to check functionality of a non mandatory checkbox", ()=>{//checks non-mandatory checkbox
    const handleSubmit = jest.fn();
    const { getByRole } = render(
      <form onSubmit={handleSubmit}>
        <Checkbox name='testCheckbox' size='large' text='Test Checkbox' register={jest.fn()} errors={{}}/>
        <input type='submit'/>
      </form>
    );
    //fetch the elements
    const btn = getByRole("button");
    const checkbox = getByRole("checkbox");

    //checks if form gets submitted without checking mandatory checkbox
    fireEvent.click(btn);
    expect(handleSubmit).toHaveBeenCalled();

    //click the checkbox
    fireEvent.click(checkbox);

    //again click on the button and check if form gets submitted this time
    fireEvent.click(btn);
    expect(handleSubmit).toHaveBeenCalled();
  })

  //checking if tickmark is visible on click
  it("Tests presence of tickmark in checked state",()=>{//checks if checkmark shows on toggle/click
    const {getByRole} = render(
      <Checkbox name='testCheckbox' size='medium' text='Test Checkbox' register={jest.fn()} errors={{}}/>
    )
    const checkbox = getByRole("checkbox") as HTMLInputElement;

    // Check that the tick mark is not initially visible
    expect(checkbox.checked).toBe(false);

    // Check that the tick mark becomes visible when checkbox is checked
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    // Check that the tick mark disappears when checkbox is unchecked again
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);

  })
});
