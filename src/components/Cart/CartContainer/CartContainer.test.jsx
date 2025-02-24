import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import {
  CartItems,
  CartReducer,
} from "../../../contexts/CartContext/CartContext";
import CartContainer from "./CartContainer";

vi.mock("../CartProduct/CartProduct", () => ({
  default: ({ id, quantity }) => (
    <div>
      id: {id}; quantity:{quantity}
    </div>
  ),
}));

const mockCart = { 1: 2, 6: 4 };

function renderCartContainer(cartValue) {
  const mockDispatch = vi.fn();
  const renderReturns = render(
    <CartItems value={cartValue}>
      <CartReducer value={mockDispatch}>
        <CartContainer />
      </CartReducer>
    </CartItems>
  );
  return { ...renderReturns, mockDispatch };
}

describe("snapshot tests", () => {
  test("empty cart", () => {
    const { container } = renderCartContainer({});
    expect(container).toMatchSnapshot();
  });

  test("cart with products", () => {
    const { container } = renderCartContainer(mockCart);
    expect(container).toMatchSnapshot();
  });
});

test("remove all button", async () => {
  const { mockDispatch } = renderCartContainer(mockCart);
  await user.click(screen.getByRole("button", { name: /remove/i }));
  expect(mockDispatch).toHaveBeenCalledOnce();
  expect(mockDispatch.mock.calls[0][0]).toMatchInlineSnapshot(`
    {
      "type": "reset",
    }
  `);
});
