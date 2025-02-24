import { render, screen } from "@testing-library/react";
import Arrow from "./Arrow";
import { describe, expect, test, vi } from "vitest";

function renderArrow(idx, isLeft = true) {
  const mockClick = vi.fn();
  render(<Arrow isLeft={isLeft} idx={idx} onClick={mockClick} />);
  return mockClick;
}

const testIdx = 5;

describe("gives correct idx to onClick fx", () => {
  test("left arrow", async () => {
    const mockClick = renderArrow(testIdx);
    await user.click(screen.getByRole("button", { name: /left/i }));
    expect(mockClick).toHaveBeenCalledExactlyOnceWith(testIdx, -1);
  });
  test("right arrow", async () => {
    const mockClick = renderArrow(testIdx, false);
    await user.click(screen.getByRole("button", { name: /right/i }));
    expect(mockClick).toHaveBeenCalledExactlyOnceWith(testIdx, 1);
  });
});
