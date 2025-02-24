import { renderHook, act } from "@testing-library/react";
import useCarouselNavigation from "./useCarouselNavigation";
import { describe, expect, it, test, vi } from "vitest";

function renderCarouselHook(startIdx = 6, displayNum = 11) {
  document.querySelector = vi.fn(() => ({ scrollIntoView: () => null }));
  return renderHook(() => useCarouselNavigation(startIdx, displayNum));
}

describe("initial render correctly", () => {
  it("sets current index according to initial props", () => {
    const { result } = renderCarouselHook();
    expect(result.current.currIdx).toBe(6);
  });
  it("scrolls to initial index", () => {
    renderCarouselHook();
    expect(document.querySelector).toHaveBeenCalledExactlyOnceWith(
      "#carousel-6"
    );
  });
});

test("scrolls to correct idx", async () => {
  const { result } = renderCarouselHook();
  document.querySelector.mockClear();

  await act(() => result.current.scrollToIdx(5));
  expect(result.current.currIdx).toBe(5);
  expect(document.querySelector).toHaveBeenCalledExactlyOnceWith("#carousel-5");
});

describe("wraps idx to within bounds", () => {
  test("new idx < 0", async () => {
    const { result } = renderCarouselHook();
    document.querySelector.mockClear();

    await act(() => result.current.scrollToIdx(0, -1));
    expect(result.current.currIdx).toBe(10);
    expect(document.querySelector).toHaveBeenCalledExactlyOnceWith(
      "#carousel-10"
    );

    await act(() => result.current.scrollToIdx(0, -2));
    expect(result.current.currIdx).toBe(9);
    expect(document.querySelector.mock.calls[1][0]).toBe("#carousel-9");
  });
  test("new idx >= displayNum", async () => {
    const { result } = renderCarouselHook();
    document.querySelector.mockClear();

    await act(() => result.current.scrollToIdx(10, 1));
    expect(result.current.currIdx).toBe(0);
    expect(document.querySelector).toHaveBeenCalledExactlyOnceWith(
      "#carousel-0"
    );

    await act(() => result.current.scrollToIdx(10, 2));
    expect(result.current.currIdx).toBe(1);
    expect(document.querySelector.mock.calls[1][0]).toBe("#carousel-1");
  });
});
