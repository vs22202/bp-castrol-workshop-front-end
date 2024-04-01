import "@testing-library/jest-dom";
import { fireEvent, render} from '@testing-library/react';
import  {DropDown}  from './DropDown';

const optionList = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
];
    
const compulsoryList = [
    { value: "compulsory1", label: "Compulsory 1", isFixed: true },
    { value: "compulsory2", label: "Compulsory 2", isFixed: true },
];

const registerMock = jest.fn();
const validationSchemaMock = jest.fn();
const errorsMock = {};


//a functional drop down component
describe('DropDown Component', () => {

    //check basic rendering
    it('renders select box', () => {
         const { queryByRole, queryByText} = render(
            <DropDown
                name="test"
                optionList={optionList}
                compulsoryList={compulsoryList}
                size="small"
                existingDataList={optionList || []}
                register={registerMock}
                validationSchema={validationSchemaMock}
                errors={errorsMock}
                onchange={() => {}}
                placeholder="abc"
            />
        );
        //check if dropdown component is present
        expect(queryByRole("combobox")).toBeInTheDocument();

        //check if all options are present in the dropdown component
        expect(queryByText("Option 1")).toBeInTheDocument()
        expect(queryByText("Option 2")).toBeInTheDocument()
        expect(queryByText("Option 3")).toBeInTheDocument()

        //check if all compulsory options are present
        expect(queryByText("Compulsory 1")).toBeInTheDocument()
        expect(queryByText("Compulsory 2")).toBeInTheDocument()
    })

    //check if the drop down options are selectable
    it('DropDown component selects an option', async () => {
        const { getByRole, getByText} = render(
            <DropDown
                name="test"
                optionList={optionList}
                compulsoryList={compulsoryList}
                size="small"
                existingDataList={optionList || []}
                register={registerMock}
                validationSchema={validationSchemaMock}
                errors={errorsMock}
                onchange={() => {}}
                placeholder="abc"
            />
        );
        // Open the dropdown menu
        const dropdown = getByRole("combobox");
        const control = dropdown.querySelector(".css-yk16xz-control");

        if (control) {
            fireEvent.mouseDown(control);

            // Select an option from the menu
            fireEvent.click(getByText("Option 1"));

            // Check if onchange function is called with the correct value
            expect(onchange).toHaveBeenCalledWith("compulsory1, option1");
        }

    });
});

