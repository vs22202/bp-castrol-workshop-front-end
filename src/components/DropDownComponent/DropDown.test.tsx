import { fireEvent, render, screen, waitFor} from '@testing-library/react';
import  {DropDown}  from './DropDown';
import userEvent from '@testing-library/user-event';

jest.mock('react-select/creatable', () => ({
__esModule: true,
default: jest.fn(),
CreatableSelect: jest.fn(),
}));

describe('DropDown Component', () => {
const optionList = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    ];
    
    const compulsoryList = [
    { value: "compulsory1", label: "Compulsory 1", isFixed: true },
    { value: "compulsory2", label: "Compulsory 2", isFixed: true },
    ];

const registerMock = jest.fn();
const validationSchemaMock = jest.fn();
const errorsMock = {};

it('renders select box', () => {
render(
    <DropDown
    name="test"
    optionList={optionList}
    compulsoryList={compulsoryList}
    register={registerMock}
    validationSchema={validationSchemaMock}
    errors={errorsMock}
    onchange={() => {}}
    />
);

const inputElement = screen.getByTestId('dropdown');
expect(inputElement).toBeTruthy();
})



it('DropDown component selects an option', async () => {
render(
    <DropDown
    name="test"
    optionList={optionList}
    compulsoryList={compulsoryList}
    register={registerMock}
    validationSchema={validationSchemaMock}
    errors={errorsMock}
    onchange={() => {}}
    />
);

// Open the dropdown menu
const dropdown = screen.getByTestId("dropdown");
const control = dropdown.querySelector(".css-yk16xz-control");

if (control) {
fireEvent.mouseDown(control);

// Select an option from the menu
userEvent.click(screen.getByText("Option 1"));

// Check if onchange function is called with the correct value
expect(onchange).toHaveBeenCalledWith("compulsory1, option1");
} 

});

it('DropDown component allows removing selected options except fixed ones', () => {
render(
<DropDown
name="test"
optionList={optionList}
compulsoryList={compulsoryList}
register={registerMock}
validationSchema={validationSchemaMock}
errors={errorsMock}
onchange={() => {}}
/>
);
const dropdown = screen.getByTestId("dropdown");
const control = dropdown.querySelector(".css-yk16xz-control");

if (control) {
fireEvent.mouseDown(control);

// Select an option from the menu
userEvent.click(screen.getByText("Option 1"));

// select the option 
expect(onchange).toHaveBeenCalledWith("compulsory1, option1");

// Remove the selected option
userEvent.click(screen.getByTestId("dropdown").querySelector(".css-1uccc91-singleValue")!);

//check if option removed
expect(onchange).toHaveBeenCalledWith("compulsory1");

}

});

it('DropDown component creates and selects a new option', async () => {
render(
    <DropDown
    name="test"
    optionList={optionList}
    compulsoryList={compulsoryList}
    register={registerMock}
    validationSchema={validationSchemaMock}
    errors={errorsMock}
    onchange={() => {}}
    />
);
// Open the dropdown menu
const dropdown = screen.getByTestId("dropdown");
const control = dropdown.querySelector(".css-yk16xz-control");

if (control) {
fireEvent.mouseDown(control);

// Create a new option
userEvent.type(screen.getByTestId("dropdown").querySelector(".css-1pahdxg-control")!, "New Option");
fireEvent.keyDown(screen.getByTestId("dropdown").querySelector(".css-1pahdxg-control")!, { key: 'Enter', code: 'Enter' });

// Wait for the new option to be added
await waitFor(() => screen.getByText("New Option"));

// Check if onchange function is called with the correct value after creating and selecting the new option
expect(onchange).toHaveBeenCalledWith("compulsory1, New Option");

}
});
});

