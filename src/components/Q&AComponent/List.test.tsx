import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { List } from "./List";


test("Renders the small List", () => {
  const items = ['Are you committed to quality maintenance and friendly customer service?', 'Do you have at least 3 bays in your workshop?', 'Are you a full service workshop?', 'Are you ready to benefit from branding with Castrol?'];
  render(<List items={items} size="large" /> );
  expect(true).toBeTruthy();
});