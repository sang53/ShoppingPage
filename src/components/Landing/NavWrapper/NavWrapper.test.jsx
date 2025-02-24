import { render, screen } from "@testing-library/react";
import NavWrapper from "./NavWrapper";
import { describe, expect, test, vi } from "vitest";

const DEFAULT_DISPLAYNUM = 11;
const DEFAULT_STARTIDX = 6;

function renderNavWrapper(
  startIdx = DEFAULT_STARTIDX,
  displayNum = DEFAULT_DISPLAYNUM
) {
  if (startIdx >= displayNum)
    throw new Error("Start Idx is set higher than number of carousel Items");
  const mockScroll = vi.fn();
  Element.prototype.scrollIntoView = mockScroll;
  render(
    <NavWrapper startIdx={startIdx} displayNum={displayNum}>
      {Array.from({ length: displayNum }, (_, idx) => idx).map((idx) => {
        return <div key={idx} id={`carousel-${idx}`} />;
      })}
    </NavWrapper>
  );
  return mockScroll;
}

test("scrolls to startIdx on mount", () => {
  const mockScroll = renderNavWrapper();
  expect(mockScroll).toHaveBeenCalledOnce();
  expect(mockScroll.mock.contexts[0]).toBe(
    document.body.querySelector(`#carousel-${DEFAULT_STARTIDX}`)
  );
});

describe("calls scrollIntoView method on elements correctly", () => {
  test("left arrow", async () => {
    const mockScroll = renderNavWrapper();
    mockScroll.mockClear();

    await user.click(screen.getByRole("button", { name: /left/i }));
    expect(mockScroll).toHaveBeenCalledOnce();
    expect(mockScroll.mock.contexts[0]).toBe(
      document.body.querySelector(`#carousel-${DEFAULT_STARTIDX - 1}`)
    );
  });
  test("right arrow", async () => {
    const mockScroll = renderNavWrapper();
    mockScroll.mockClear();

    await user.click(screen.getByRole("button", { name: /right/i }));
    expect(mockScroll).toHaveBeenCalledOnce();
    expect(mockScroll.mock.contexts[0]).toBe(
      document.body.querySelector(`#carousel-${DEFAULT_STARTIDX + 1}`)
    );
  });
  test("jump button", async () => {
    const mockScroll = renderNavWrapper();
    mockScroll.mockClear();

    await user.click(screen.getByRole("button", { name: "1" }));
    expect(mockScroll).toHaveBeenCalledOnce();
    expect(mockScroll.mock.contexts[0]).toBe(
      document.body.querySelector("#carousel-0")
    );
  });
});

describe("wraps around idx correctly", () => {
  test("idx >= displayNum", async () => {
    const mockScroll = renderNavWrapper(DEFAULT_DISPLAYNUM - 1);
    mockScroll.mockClear();

    await user.click(screen.getByRole("button", { name: /right/i }));
    expect(mockScroll.mock.contexts[0]).toBe(
      document.body.querySelector("#carousel-0")
    );

    await user.click(screen.getByRole("button", { name: /right/i }));
    expect(mockScroll.mock.contexts[1]).toBe(
      document.body.querySelector("#carousel-1")
    );
  });
  test("idx <= 0", async () => {
    const mockScroll = renderNavWrapper(0);
    mockScroll.mockClear();

    await user.click(screen.getByRole("button", { name: /left/i }));
    expect(mockScroll.mock.contexts[0]).toBe(
      document.body.querySelector(`#carousel-${DEFAULT_DISPLAYNUM - 1}`)
    );

    await user.click(screen.getByRole("button", { name: /left/i }));
    expect(mockScroll.mock.contexts[1]).toBe(
      document.body.querySelector(`#carousel-${DEFAULT_DISPLAYNUM - 2}`)
    );
  });
});
