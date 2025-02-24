import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import CartContextWrapper from "./CartContextWrapper";
import { ContextDisplay } from "../../../test/utils/utils";
import { CartItems } from "../CartContext";

function renderContextWrapper() {
  render(
    <CartContextWrapper>
      <ContextDisplay context={CartItems} />
    </CartContextWrapper>
  );
}

test("initial value of cart", () => {
  renderContextWrapper();
  expect(screen.getByTestId("context-display")).toHaveTextContent("{}");
});
