import { describe, expect, test } from "vitest";
import Helpers, { checkout } from "./Helpers";
import { mockFetch } from "../test/utils/utils";
import { vi } from "vitest";

describe("pads price to 2 decimals", () => {
  test("takes integer prices", () => {
    expect(Helpers.padDecimal(12)).toBe("$12.00");
  });
  test("takes float price values", () => {
    expect(Helpers.padDecimal(12.05)).toBe("$12.05");
  });
  test("works with string prices", () => {
    expect(Helpers.padDecimal("5")).toBe("$5.00");
    expect(Helpers.padDecimal("7.01")).toBe("$7.01");
  });
});

describe("calculates total price", () => {
  test("works with combinations of string & number", () => {
    expect(Helpers.getTotal(5, 3)).toBe("$15.00");
    expect(Helpers.getTotal("7.01", 5)).toBe("$35.05");
    expect(Helpers.getTotal(4.02, "3")).toBe("$12.06");
    expect(Helpers.getTotal("1.80", "2")).toBe("$3.60");
  });
});

test("fetches data from correct URL", async () => {
  mockFetch();

  await Helpers.getProduct();
  expect(fetch).toHaveBeenCalledExactlyOnceWith(
    "https://fakestoreapi.com/products/"
  );
});

test("handles fetch error", async () => {
  mockFetch({ success: false });
  const spyError = vi.spyOn(console, "error");
  await Helpers.getProduct();
  expect(spyError).toHaveBeenCalledOnce();
});

describe("checkout works properly", () => {
  const testCart = { 4: 2, 5: 1 };

  function mockCheckout(fetchOptions) {
    mockFetch(fetchOptions);
    const button = document.createElement("button");
    button.textContent = "Test";
    const mockDispatch = vi.fn();
    const promise = checkout(button, testCart, mockDispatch);
    return [button, promise, mockDispatch];
  }

  test("Empty Cart", async () => {
    const spyLog = vi.spyOn(console, "log");
    await checkout(null, {}, null);
    expect(spyLog).toHaveBeenCalledExactlyOnceWith("Shopping Cart Empty");
  });

  test("Successful PUT", async () => {
    const [button, promise, mockDispatch] = mockCheckout();
    expect(button.disabled).toBeTruthy();
    expect(button).toHaveTextContent(/checking out/i);
    expect(fetch).toHaveBeenCalledOnce();
    await promise;
    expect(button.disabled).toBeFalsy();
    expect(button).toHaveTextContent(/test/i);
    expect(mockDispatch).toHaveBeenCalledExactlyOnceWith({ type: "reset" });
  });

  test("Unsuccessful PUT", async () => {
    const [_button, promise, mockDispatch] = mockCheckout({ status: 400 });
    const spyError = vi.spyOn(console, "error");
    await promise;
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(spyError).toHaveBeenCalledOnce();
  });

  test("Unexpected status response", async () => {
    const [_button, promise, mockDispatch] = mockCheckout({ status: 404 });
    const spyLog = vi.spyOn(console, "log");
    await promise;
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(spyLog).toHaveBeenCalledOnce();
  });

  test("Fetch Throws Error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("Test")))
    );
    const spyError = vi.spyOn(console, "error");
    const mockDispatch = vi.fn();
    await checkout(document.createElement("button"), testCart, mockDispatch);
    expect(spyError).toHaveBeenCalledExactlyOnceWith("Test");
  });
});
