import { test } from "vitest";
import DisplayObj from "../DisplayObj/DisplayObj";
import { mockProducts } from "../../../test/utils/mockProducts";
import { render } from "@testing-library/react";
import DisplayItem from "./DisplayItem";
import { expect } from "vitest";
import { MemoryRouter } from "react-router";

function renderProductItem(category = false) {
  const product = new DisplayObj(mockProducts[0], category);
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <DisplayItem obj={product} />
    </MemoryRouter>
  );
}

test("product item snapshot", () => {
  const { container } = renderProductItem();
  expect(container).toMatchSnapshot();
});

test("category item snapshot", () => {
  const { container } = renderProductItem(true);
  expect(container).toMatchSnapshot();
});
