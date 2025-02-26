import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import ProductDisplay from "./ProductDisplay";
import { Products } from "../../../contexts/Data/DataContext";
import { mockProducts } from "../../../test/utils/mockProducts";
import { MemoryRouter } from "react-router";
import { describe } from "vitest";
import { vi } from "vitest";

vi.mock("../DisplayContainer/DisplayContainer", () => ({
  default: ({ displayItems }) => {
    return (
      <div>
        {displayItems.map((displayObj) => {
          return (
            <div key={displayObj.id} data-testid="title">
              {displayObj.title}
            </div>
          );
        })}
      </div>
    );
  },
}));

function renderProducts(products = mockProducts) {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Products.Provider value={products}>
        <ProductDisplay />
      </Products.Provider>
    </MemoryRouter>
  );
}

test("product displayed as expected", () => {
  const { container } = renderProducts(mockProducts.slice(0, 1));
  expect(container).toMatchSnapshot();
});

describe("sorts into order", () => {
  test("default order category", () => {
    renderProducts();
    expect(
      screen.getAllByTestId("title").map((element) => element.textContent)
    ).toMatchSnapshot();
  });
});
