import { describe, expect, test } from "vitest";
import { cartReducer } from "./cartReducer";

const testCart = { 1: 5, 3: 2 };
const testProduct = { id: 5, quantity: 3 };

test("invalid action", () => {
  expect(() => cartReducer(testCart, testProduct)).toThrowError(
    /invalid.+action/i
  );
});

test("reset cart", () => {
  expect(cartReducer(testCart, { type: "reset" })).toMatchObject({});
});

describe("add product", () => {
  const testAction = { ...testProduct, type: "add" };
  test("add new product", () => {
    expect(cartReducer(testCart, testAction)).toMatchObject({
      ...testCart,
      [testProduct.id]: testProduct.quantity,
    });
  });
  test("add existing product", () => {
    const testCart2 = cartReducer(testCart, testAction);
    expect(cartReducer(testCart2, testAction)).toMatchObject({
      ...testCart,
      [testProduct.id]: testProduct.quantity * 2,
    });
  });
  test("float quantity converted to integer before adding", () => {
    expect(
      cartReducer(testCart, { ...testAction, quantity: 1.3 })
    ).toMatchObject({ ...testCart, [testProduct.id]: 1 });
  });
  test("add invalid product id", () => {
    expect(() =>
      cartReducer(testCart, { ...testAction, id: "NaN" })
    ).toThrowError(/invalid.+product/i);
  });
  test("add invalid quantity", () => {
    expect(() =>
      cartReducer(testCart, { ...testAction, quantity: "NaN" })
    ).toThrowError(/invalid.+quantity/i);
  });
});

describe("set quantity", () => {
  const testAction = { ...testProduct, type: "set" };
  const existProduct = { id: 1, quantity: 7 };
  const existAction = { ...existProduct, type: "set" };

  test("set non-zero quantity of existing product", () => {
    expect(cartReducer(testCart, existAction)).toMatchObject({
      ...testCart,
      [existProduct.id]: existProduct.quantity,
    });
  });
  test("converts float quantity to integer before setting", () => {
    expect(
      cartReducer(testCart, { ...existAction, quantity: 3.6 })
    ).toMatchObject({ ...testCart, [existProduct.id]: 3 });
  });
  test("set zero quantity of existing product", () => {
    const setCart = { ...testCart };
    delete setCart[existProduct.id];
    expect(
      cartReducer(testCart, { ...existAction, quantity: 0 })
    ).toMatchObject(setCart);
  });
  test("set quantity of non-existing product", () => {
    expect(() => cartReducer(testCart, testAction)).toThrowError(
      /product.+not.+cart/i
    );
  });
  test("set invalid product id", () => {
    expect(() =>
      cartReducer(testCart, { ...testAction, id: "NaN" })
    ).toThrowError(/invalid.+product/i);
  });
  test("set invalid quantity", () => {
    expect(() =>
      cartReducer(testCart, { ...testAction, quantity: "NaN" })
    ).toThrowError(/invalid.+quantity/i);
  });
});
