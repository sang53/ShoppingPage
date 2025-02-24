import { describe, expect, test } from "vitest";
import DisplayObj from "./DisplayObj";
import { mockProducts } from "../../../test/utils/mockProducts";

describe("DisplayObj constructor", () => {
  test("category is transformed correctly", () => {
    const testCategoryItem = new DisplayObj(mockProducts[0], true);
    expect(testCategoryItem.title[0]).toBe(
      testCategoryItem.title[0].toUpperCase()
    );
    expect(testCategoryItem.link).toMatch(/categories/i);
    expect(testCategoryItem).toMatchInlineSnapshot(`
      DisplayObj {
        "id": "men's clothing",
        "image": "#",
        "link": "/categories/men's clothing",
        "title": "Men's Clothing",
      }
    `);
  });
  test("product is transformed correctly", () => {
    const testProductItem = new DisplayObj(mockProducts[0]);
    expect(testProductItem.price).toBe("$109.95");
    expect(testProductItem.link).toMatch(/products/i);
    expect(new DisplayObj(mockProducts[0])).toMatchInlineSnapshot(`
      DisplayObj {
        "id": 1,
        "image": "#",
        "link": "/products/1",
        "price": "$109.95",
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      }
    `);
  });
});

describe("getAllCategories static method", () => {
  test("returns all categories in product list", () => {
    const results = DisplayObj.getAllCategories(mockProducts);
    expect(results).toHaveLength(4);
    expect(new Set(results.map((obj) => obj.id)).size).toBe(4);
  });
  test("returns all products of category", () => {
    const results = DisplayObj.getCategoryProducts(
      mockProducts,
      "men's clothing"
    );
    expect(results).toHaveLength(4);
    expect(new Set(results.map((obj) => obj.id)).size).toBe(4);
  });
});
