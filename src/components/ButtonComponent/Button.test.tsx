import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Button } from "./Button";

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the small Button", () => {
  render(<Button size="sm" />);
  expect(true).toBeTruthy();
});
