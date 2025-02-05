import { test, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { CartItems } from "../../../contexts/CartContext/CartContext";
import { MemoryRouter } from "react-router";

const mockCart = {
  1: 3,
  10: 4,
  4: 5,
};

function renderNavBar(value) {
  return render(
    <CartItems.Provider value={value}>
      <MemoryRouter initialEntries={["/"]}>
        <NavBar />
      </MemoryRouter>
    </CartItems.Provider>
  );
}

describe("displays number of unique items in cart", () => {
  test("empty cart", () => {
    renderNavBar({});
    expect(screen.getByRole("link", { name: /cart/i })).toHaveTextContent(
      "Cart(0)"
    );
  });
  test("items in cart", () => {
    renderNavBar(mockCart);
    expect(screen.getByRole("link", { name: /cart/i })).toHaveTextContent(
      "Cart(3)"
    );
  });
});

describe("current page has aria-current", () => {
  beforeEach(() => {
    renderNavBar({});
  });
  test("initial home page", () => {
    const currentPage = screen.getAllByRole("link", { current: "page" });
    expect(currentPage.length).toBe(1);
    expect(currentPage[0].textContent).toMatch(/home/i);
  });
  test("switch to products page", async () => {
    await user.click(screen.getByRole("link", { name: /product/i }));
    expect(screen.getAllByRole("link", { current: "page" }).length).toBe(1);
    expect(screen.getByRole("link", { current: "page" }).textContent).toMatch(
      /product/i
    );
  });
  test("switch to cart page", async () => {
    await user.click(screen.getByRole("link", { name: /cart/i }));
    expect(screen.getAllByRole("link", { current: "page" }).length).toBe(1);
    expect(screen.getByRole("link", { current: "page" }).textContent).toMatch(
      /cart/i
    );
  });
});

test("renders NavBar elements as expected", () => {
  const { container } = renderNavBar({});
  expect(container).toMatchSnapshot();
});
