import { describe, expect, test } from "vitest";
import Helpers from "./Helpers";
import { mockFetch } from "../test/utils/utils";

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
  await expect(Helpers.getProduct()).rejects.toThrowError(/status/i);
});
