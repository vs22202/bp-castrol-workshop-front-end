import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { Checkbox } from "./CheckboxComponent";


describe("Checkbox Component", () => {
  test("Renders the small Checkbox", () => {
    const onCheckboxChangeMock = jest.fn();

    const { getByText } = render(
      <Checkbox
        size="small"
        text="I consent to having my data processed according to the privacy statement"
        value="Data Consent"
        onCheckboxChange={onCheckboxChangeMock}
      />
    );

    // Click the checkbox
    fireEvent.click(getByText("I consent to having my data processed according to the privacy statement"));

    // Check if the callback function was called with the correct arguments
    expect(onCheckboxChangeMock).toHaveBeenCalledWith("Data Consent", true);
  });
});
