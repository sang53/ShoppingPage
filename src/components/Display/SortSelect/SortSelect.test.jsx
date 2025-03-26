import { render, screen } from "@testing-library/react";
import { test } from "vitest";
import SortSelect from "./SortSelect";
import { vi } from "vitest";
import { expect } from "vitest";

function renderSelect({ by = "cat", order = "asc" } = {}) {
  const mockSort = vi.fn();
  render(<SortSelect by={by} order={order} setSort={mockSort} />);
  return mockSort;
}

test("updates state on reverse order", async () => {
  const mockSort = renderSelect();
  await user.click(screen.getByRole("button"));
  expect(mockSort).toHaveBeenCalledExactlyOnceWith(["cat", "desc"]);
});

test("updates state on new sort type", async () => {
  const mockSort = renderSelect();
  await user.selectOptions(screen.getByRole("combobox"), "alpha");
  expect(mockSort).toHaveBeenCalledExactlyOnceWith(["alpha", "asc"]);
});
