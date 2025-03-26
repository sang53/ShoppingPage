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

describe("display sorted products in order", () => {
  test("default order by category asc", () => {
    renderProducts();
    expect(
      screen.getAllByTestId("title").map((element) => element.textContent)
    ).toMatchSnapshot();
  });
  test("default order by category desc", async () => {
    renderProducts();
    await user.click(screen.getByRole("button"));
    expect(
      screen.getAllByTestId("title").map((element) => element.textContent)
    ).toMatchSnapshot();
  });
  test("alphabetic order asc", async () => {
    renderProducts();
    await user.selectOptions(screen.getByRole("combobox"), "alpha");
    expect(
      screen.getAllByTestId("title").map((element) => element.textContent)
    ).toMatchSnapshot();
  });
  test("alphabetic order desc", async () => {
    renderProducts();
    await user.selectOptions(screen.getByRole("combobox"), "alpha");
    await user.click(screen.getByRole("button"));
    expect(
      screen.getAllByTestId("title").map((element) => element.textContent)
    ).toMatchSnapshot();
  });
  test("price order asc", async () => {
    renderProducts();
    await user.selectOptions(screen.getByRole("combobox"), "price");
    expect(
      screen.getAllByTestId("title").map((element) => element.textContent)
    ).toMatchSnapshot();
  });
  test("price order desc", async () => {
    renderProducts();
    await user.selectOptions(screen.getByRole("combobox"), "price");
    await user.click(screen.getByRole("button"));
    expect(
      screen.getAllByTestId("title").map((element) => element.textContent)
    ).toMatchSnapshot();
  });
});
