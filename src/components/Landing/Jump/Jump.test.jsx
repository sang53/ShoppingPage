import { cleanup, render, screen } from "@testing-library/react";
import { beforeAll, expect, test, vi } from "vitest";
import Jump from "./Jump";

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

function renderJump(displayNum = 11, idx = 6) {
  const mockClick = vi.fn();
  render(<Jump idx={idx} displayNum={displayNum} onClick={mockClick} />);
  return mockClick;
}

test("number of buttons is equal to displayNum prop", () => {
  for (let i = 1; i < 20; i += 3) {
    renderJump(i);
    expect(screen.getAllByRole("button")).toHaveLength(i);
    cleanup();
  }
});

test("current idx button is active", () => {
  for (let i = 0; i < 11; i++) {
    renderJump(11, i);
    expect(
      screen.getByRole("button", { current: "carousel" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { current: "carousel" })
    ).toHaveTextContent(i + 1);
    cleanup();
  }
});

test("calls onClick fx with idx on click", async () => {
  const mockClick = renderJump(11, -1);
  for (let i = 0; i < 11; i++) {
    await user.click(screen.getByRole("button", { name: i + 1 }));
    expect(mockClick).toHaveBeenCalledExactlyOnceWith(i);
    mockClick.mockClear();
  }
});
