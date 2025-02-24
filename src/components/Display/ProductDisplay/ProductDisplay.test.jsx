import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import ProductDisplay from "./ProductDisplay";
import { Products } from "../../../contexts/Data/DataContext";
import { mockProducts } from "../../../test/utils/mockProducts";
import { MemoryRouter } from "react-router";

test("product displayed as expected", () => {
  const { container } = render(
    <MemoryRouter initialEntries={["/"]}>
      <Products.Provider value={mockProducts.slice(0, 1)}>
        <ProductDisplay />
      </Products.Provider>
    </MemoryRouter>
  );
  expect(container).toMatchSnapshot();
});
