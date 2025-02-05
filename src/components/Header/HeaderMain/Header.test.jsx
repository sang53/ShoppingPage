import { expect, test, vi } from "vitest";
import Header from "./Header";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { CartItems } from "../../../contexts/CartContext/CartContext";

vi.mock("../NavBar/NavBar", () => ({
  default: () => <nav data-testid="mock-navbar">Mock NavBar</nav>,
}));

test("Header elements display as expected", () => {
  const { container } = render(<Header />);
  expect(container).toMatchSnapshot();
});
