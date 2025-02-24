import { mockProducts } from "../../test/utils/mockProducts";
import { ContextDisplay, mockFetch } from "../../test/utils/utils";
import { act, render, screen } from "@testing-library/react";
import DataContextWrapper from "./DataContextWrapper";
import { Products } from "./DataContext";
import { expect, test } from "vitest";

function renderDataContext(value = mockProducts.slice(0, 1)) {
  mockFetch({ value });
  render(
    <DataContextWrapper>
      <ContextDisplay context={Products} />
    </DataContextWrapper>
  );
}

test("fetches data and updates value", async () => {
  await act(async () => renderDataContext());
  expect(fetch).toHaveBeenCalledExactlyOnceWith(
    "https://fakestoreapi.com/products/"
  );
  expect(screen.getByTestId("context-display")).toHaveTextContent(
    JSON.stringify(mockProducts[0])
  );
});
