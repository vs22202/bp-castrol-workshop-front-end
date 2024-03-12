import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { SvgIcon } from "./SvgIcon";

describe("Testing SvgIcon Rendering", () => {
    test("test dynamic import",  () => {
        const {baseElement} = render(<SvgIcon iconName="delete" />)
        expect(baseElement).toBeVisible();
  });
});
