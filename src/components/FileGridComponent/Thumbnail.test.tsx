import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import Thumbnail from "./Thumbnail";


describe("Testing Thumbnail Component rendering", () => {
    URL.createObjectURL = jest.fn();

    test("Render Thumbnail Component with an image", async () => {
        const file = new File(["hello"], "./test_assets/alex-suprun-AHnhdjyTNGM-unsplash.jpg", { type: "image/jpg" })
        const fileUrl = URL.createObjectURL(file);
        const filename = "alex-suprun-AHnhdjyTNGM-unsplash.jpg"
        const removeFile = jest.fn((e:React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            const key = e.currentTarget.getAttribute("data-filename");
            expect(key).toBe(filename);
        })
        const { findByTestId } = render(<Thumbnail src={fileUrl} fileName={filename} key="unique" type="image/jpg" removeFile={(e) => { removeFile(e) }} />)
        const deleteIcon = await findByTestId(`delete-icon-${filename}`)
        fireEvent.click(deleteIcon);

        expect(removeFile).toHaveBeenCalled();
    })

})
