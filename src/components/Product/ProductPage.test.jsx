import { render, screen } from "@testing-library/react";
import { CartReducer } from "../../contexts/CartContext/CartContext";
import { describe, expect, test, vi } from "vitest";
import { Products } from "../../contexts/Data/DataContext";
import { mockProducts } from "../../test/utils/mockProducts";
import { MemoryRouter, Routes, Route } from "react-router";
import ProductPage from "./ProductPage";

function renderProduct(id = 1, loading = false) {
  const mockDispatch = vi.fn();
  const renderReturns = render(
    <CartReducer.Provider value={mockDispatch}>
      <Products.Provider value={loading ? [] : mockProducts}>
        <MemoryRouter initialEntries={[`/products/${id}`]}>
          <Routes>
            <Route path="/products/:id" element={<ProductPage />} />
          </Routes>
        </MemoryRouter>
      </Products.Provider>
    </CartReducer.Provider>
  );
  return { ...renderReturns, mockDispatch };
}

test("loading page when data is empty", () => {
  renderProduct(1, true);
  expect(screen.getByRole("heading")).toHaveTextContent(/loading/i);
});

test("error page when product id not found", () => {
  renderProduct(100);
  expect(screen.getByRole("heading")).toHaveTextContent(
    /something went wrong/i
  );
});

test("product page elements displayed as expected", () => {
  const { container } = renderProduct();
  expect(container).toMatchSnapshot();
});

describe("quantity input and total display", () => {
  test("starting values of quantity & total", () => {
    renderProduct();
    expect(screen.getByLabelText(/add/i)).toHaveValue(1);
    expect(screen.getByLabelText(/total/i)).toHaveValue("$109.95");
  });
  test("change quantity to valid quantity", async () => {
    renderProduct();
    const quantityInput = screen.getByLabelText(/add/i);
    const totalInput = screen.getByLabelText(/total/i);

    // change quantity without unfocusing element
    await user.click(quantityInput);
    await user.keyboard("{Backspace}{3}");
    expect(quantityInput).toHaveValue(3);
    expect(totalInput).toHaveValue("$329.85");

    // unfocus quantity input element
    await user.click(totalInput);
    expect(quantityInput).toHaveValue(3);
    expect(totalInput).toHaveValue("$329.85");
  });
  test("change quantity to 0", async () => {
    renderProduct();
    const quantityInput = screen.getByLabelText(/add/i);
    const totalInput = screen.getByLabelText(/total/i);

    // change quantity without unfocusing element
    await user.click(quantityInput);
    await user.keyboard("{Backspace}{0}");
    expect(quantityInput).toHaveValue(0);
    expect(totalInput).toHaveValue("$109.95");

    // unfocus quantity input element
    await user.click(totalInput);
    expect(quantityInput).toHaveValue(1);
    expect(totalInput).toHaveValue("$109.95");
  });
  test("change quantity to negative number", async () => {
    renderProduct();
    const quantityInput = screen.getByLabelText(/add/i);
    const totalInput = screen.getByLabelText(/total/i);

    // change quantity without unfocusing element
    await user.click(quantityInput);
    await user.keyboard("{Backspace}{-}{3}");
    expect(quantityInput).toHaveValue(-3);
    expect(totalInput).toHaveValue("$109.95");

    // unfocus quantity input element
    await user.click(totalInput);
    expect(quantityInput).toHaveValue(1);
    expect(totalInput).toHaveValue("$109.95");
  });
  test("change quantity to empty string", async () => {
    renderProduct();
    const quantityInput = screen.getByLabelText(/add/i);
    const totalInput = screen.getByLabelText(/total/i);

    // change quantity without unfocusing element
    await user.click(quantityInput);
    await user.keyboard("{Backspace}");
    expect(quantityInput).toHaveValue(null);
    expect(totalInput).toHaveValue("$109.95");

    // unfocus quantity input element
    await user.click(totalInput);
    expect(quantityInput).toHaveValue(1);
    expect(totalInput).toHaveValue("$109.95");
  });
});

describe("add to cart function parameters", () => {
  test("add valid quantity to cart", async () => {
    const { mockDispatch } = renderProduct();
    const quantityInput = screen.getByLabelText(/add/i);
    const addButton = screen.getByRole("button");
    await user.click(quantityInput);
    await user.keyboard("{Backspace}{3}");
    await user.click(addButton);
    expect(mockDispatch).toHaveBeenCalledOnce();
    expect(mockDispatch.mock.calls[0][0]).toMatchInlineSnapshot(`
      {
        "id": "1",
        "quantity": "3",
        "type": "add",
      }
    `);
    expect(quantityInput).toHaveValue(1);
    expect(screen.getByLabelText(/total/i)).toHaveValue("$109.95");
  });
  test("try add 0 quantity to cart", async () => {
    const { mockDispatch } = renderProduct();
    const quantityInput = screen.getByLabelText(/add/i);
    const addButton = screen.getByRole("button");
    await user.click(quantityInput);
    await user.keyboard("{Backspace}{0}");
    await user.click(addButton);
    expect(mockDispatch).toHaveBeenCalledOnce();
    expect(mockDispatch.mock.calls[0][0]).toMatchInlineSnapshot(`
      {
        "id": "1",
        "quantity": "1",
        "type": "add",
      }
    `);
    expect(quantityInput).toHaveValue(1);
    expect(screen.getByLabelText(/total/i)).toHaveValue("$109.95");
  });
  test("try add negative quantity to cart", async () => {
    const { mockDispatch } = renderProduct();
    const quantityInput = screen.getByLabelText(/add/i);
    const addButton = screen.getByRole("button");
    await user.click(quantityInput);
    await user.keyboard("{Backspace}{-}{3}");
    await user.click(addButton);
    expect(mockDispatch).toHaveBeenCalledOnce();
    expect(mockDispatch.mock.calls[0][0]).toMatchInlineSnapshot(`
      {
        "id": "1",
        "quantity": "1",
        "type": "add",
      }
    `);
    expect(quantityInput).toHaveValue(1);
    expect(screen.getByLabelText(/total/i)).toHaveValue("$109.95");
  });
  test("try add empty quantity to cart", async () => {
    const { mockDispatch } = renderProduct();
    const quantityInput = screen.getByLabelText(/add/i);
    const addButton = screen.getByRole("button");
    await user.click(quantityInput);
    await user.keyboard("{Backspace}");
    await user.click(addButton);
    expect(mockDispatch).toHaveBeenCalledOnce();
    expect(mockDispatch.mock.calls[0][0]).toMatchInlineSnapshot(`
      {
        "id": "1",
        "quantity": "1",
        "type": "add",
      }
    `);
    expect(quantityInput).toHaveValue(1);
    expect(screen.getByLabelText(/total/i)).toHaveValue("$109.95");
  });
});
