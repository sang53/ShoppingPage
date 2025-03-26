import { render, screen } from "@testing-library/react";
import { Products } from "../../../contexts/Data/DataContext";
import { CartReducer } from "../../../contexts/CartContext/CartContext";
import CartProduct from "./CartProduct";
import { describe, expect, test, vi } from "vitest";
import { mockProducts } from "../../../test/utils/mockProducts";
import { MemoryRouter } from "react-router";
import { mockFetch } from "../../../test/utils/utils";

function renderCartProduct(id = 1, quantity = 3) {
  const mockDispatch = vi.fn();
  const renderReturns = render(
    <MemoryRouter initialEntries={["/cart"]}>
      <Products.Provider value={mockProducts}>
        <CartReducer.Provider value={mockDispatch}>
          <CartProduct id={id} quantity={quantity} />
        </CartReducer.Provider>
      </Products.Provider>
    </MemoryRouter>
  );
  return { ...renderReturns, mockDispatch };
}

test("product not found error", () => {
  renderCartProduct(999, 1);
  expect(screen.getByRole("heading")).toHaveTextContent(/error/i);
});

test("cart product elements displayed as expected", () => {
  const { container } = renderCartProduct();
  expect(container).toMatchSnapshot();
});

describe("quantity & total inputs", () => {
  test("initial quantity & total is correct", () => {
    renderCartProduct();
    expect(screen.getByLabelText(/quantity/i)).toHaveValue(3);
    expect(screen.getByLabelText(/total/i)).toHaveValue("$329.85");
  });
  test("change quantity to valid value", async () => {
    const { mockDispatch } = renderCartProduct();
    const quantityInput = screen.getByLabelText(/quantity/i);
    const totalInput = screen.getByLabelText(/total/i);

    // change value without unfocusing
    await user.click(quantityInput);
    await user.keyboard("{Backspace}{5}");
    expect(quantityInput).toHaveValue(5);
    expect(totalInput).toHaveValue("$549.75");
    expect(mockDispatch).not.toHaveBeenCalled();

    // unfocus changed value
    await user.click(totalInput);
    expect(quantityInput).toHaveValue(5);
    expect(totalInput).toHaveValue("$549.75");
    expect(mockDispatch).toHaveBeenCalledOnce();
    expect(mockDispatch.mock.calls[0][0]).toMatchInlineSnapshot(`
      {
        "id": 1,
        "quantity": "5",
        "type": "set",
      }
    `);
  });
  test("change quantity to empty string", async () => {
    const { mockDispatch } = renderCartProduct();
    const quantityInput = screen.getByLabelText(/quantity/i);
    const totalInput = screen.getByLabelText(/total/i);

    // change value without unfocusing
    await user.click(quantityInput);
    await user.keyboard("{Backspace}");
    expect(quantityInput).toHaveValue(null);
    expect(totalInput).toHaveValue("$329.85");
    expect(mockDispatch).not.toHaveBeenCalled();

    // unfocus changed value
    await user.click(totalInput);
    expect(quantityInput).toHaveValue(3);
    expect(totalInput).toHaveValue("$329.85");
    expect(mockDispatch).not.toHaveBeenCalled();
  });
  test("change quantity to 0", async () => {
    const { mockDispatch } = renderCartProduct();
    const quantityInput = screen.getByLabelText(/quantity/i);
    const totalInput = screen.getByLabelText(/total/i);

    // change value without unfocusing
    await user.click(quantityInput);
    await user.keyboard("{Backspace}{0}");
    expect(quantityInput).toHaveValue(0);
    expect(totalInput).toHaveValue("$0.00");
    expect(mockDispatch).not.toHaveBeenCalled();

    // unfocus changed value
    // Note: removed on CartContainer re-render, hence not tested here
    await user.click(totalInput);
    expect(mockDispatch).toHaveBeenCalledOnce();
    expect(mockDispatch.mock.calls[0][0]).toMatchInlineSnapshot(`
      {
        "id": 1,
        "quantity": "0",
        "type": "set",
      }
    `);
  });
  test("change quantity to negative", async () => {
    const { mockDispatch } = renderCartProduct();
    const quantityInput = screen.getByLabelText(/quantity/i);
    const totalInput = screen.getByLabelText(/total/i);

    // change value without unfocusing
    await user.click(quantityInput);
    await user.keyboard("{Backspace}{-}{3}");
    expect(quantityInput).toHaveValue(-3);
    expect(totalInput).toHaveValue("N/A");
    expect(mockDispatch).not.toHaveBeenCalled();

    // unfocus changed value
    await user.click(totalInput);
    expect(quantityInput).toHaveValue(-3);
    expect(totalInput).toHaveValue("N/A");
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});

test("remove button", async () => {
  const { mockDispatch } = renderCartProduct();
  await user.click(screen.getByRole("button", { name: /remove/i }));
  expect(mockDispatch).toHaveBeenCalledOnce();
  expect(mockDispatch.mock.calls[0][0]).toMatchInlineSnapshot(`
    {
      "id": 1,
      "quantity": 0,
      "type": "set",
    }
  `);
});

test("checkout button", async () => {
  const { mockDispatch } = renderCartProduct();
  mockFetch();
  await user.click(screen.getByRole("button", { name: /check/i }));
  expect(mockDispatch).toHaveBeenCalledExactlyOnceWith({
    type: "set",
    id: "1",
    quantity: 0,
  });
});
