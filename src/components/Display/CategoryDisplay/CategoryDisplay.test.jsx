import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Products } from "../../../contexts/Data/DataContext";
import { MemoryRouter, Route, Routes } from "react-router";
import CategoryDisplay from "./CategoryDisplay";
import { mockProducts } from "../../../test/utils/mockProducts";

function renderCategories(value, category = "") {
  return render(
    <Products.Provider value={value}>
      <MemoryRouter initialEntries={[`/categories${category}`]}>
        <Routes>
          <Route path="/categories" element={<CategoryDisplay />} />
          <Route path="/categories/:category" element={<CategoryDisplay />} />
        </Routes>
      </MemoryRouter>
    </Products.Provider>
  );
}

describe("displays all categories correctly", () => {
  test("displays all categories", () => {
    renderCategories(mockProducts);
    expect(screen.getAllByRole("link")).toHaveLength(4);
  });

  test("all categories elements are displayed as expected", () => {
    const { container } = renderCategories(mockProducts.slice(0, 1));
    expect(screen.getByRole("heading")).toHaveTextContent(/categories/i);
    expect(container).toMatchSnapshot();
  });
});

describe("displays single category correctly", () => {
  test("displays single category", () => {
    renderCategories(mockProducts, "/men's clothing");
    expect(screen.getAllByRole("link")).toHaveLength(4);
  });
  test("single category elements are displayed as expected", () => {
    const { container } = renderCategories(
      mockProducts.slice(0, 1),
      "/men's clothing"
    );
    expect(screen.getByRole("heading")).toHaveTextContent(/men's clothing/i);
    expect(container).toMatchSnapshot();
  });
});
