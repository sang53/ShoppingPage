import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import MainPage from "./MainPage";

vi.mock("../Carousel/Carousel", () => ({
  default: () => <div data-testid="mock-carousel">Carousel</div>,
}));

test("Main Landing Page elements display as expected", () => {
  const { container } = render(<MainPage />);
  expect(container).toMatchSnapshot();
});
