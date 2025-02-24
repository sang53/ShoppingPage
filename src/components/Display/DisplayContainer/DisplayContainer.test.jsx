import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import DisplayContainer from "./DisplayContainer";
import { LocationDisplay } from "../../../test/utils/utils";

const testCategories = [
  {
    id: 1,
    image: "#",
    title: "Example Category",
    link: "/categories/1",
  },
  {
    id: 10,
    image: "#",
    title: "Example Category1",
    link: "/categories/10",
  },
];

const testProducts = testCategories.map((category) => {
  return { ...category, link: `/products/${category.id}`, price: 32.94 };
});

function renderDisplayContainer(value) {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <DisplayContainer displayItems={value} />
      <LocationDisplay />
    </MemoryRouter>
  );
}

test("shows loading screen on empty display", () => {
  const { container } = renderDisplayContainer([]);
  expect(() => screen.getAllByRole("link")).toThrowError();
  expect(container.querySelector("div")).toHaveTextContent(/loading/i);
});

describe("categories", () => {
  test("displays valid categories", () => {
    renderDisplayContainer(testCategories);
    expect(
      screen.getByRole("link", { name: /example category /i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /example category1/i })
    ).toBeInTheDocument();
  });
  test("category link", async () => {
    renderDisplayContainer(testCategories);
    await user.click(screen.getByRole("link", { name: /example category /i }));
    expect(screen.getByTestId("location-display")).toHaveTextContent(
      `/categories/${testCategories[0].id}`
    );
    await user.click(screen.getByRole("link", { name: /example category1/i }));
    expect(screen.getByTestId("location-display")).toHaveTextContent(
      `/categories/${testCategories[1].id}`
    );
  });
  test("categories display as expected", () => {
    const { container } = renderDisplayContainer(testCategories);
    expect(container).toMatchSnapshot();
  });
});

describe("products", () => {
  test("displays valid products", () => {
    renderDisplayContainer(testProducts);
    expect(
      screen.getByRole("link", { name: /example category /i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /example category1/i })
    ).toBeInTheDocument();
  });
  test("products link", async () => {
    renderDisplayContainer(testProducts);
    await user.click(screen.getByRole("link", { name: /example category /i }));
    expect(screen.getByTestId("location-display")).toHaveTextContent(
      `/products/${testProducts[0].id}`
    );
    await user.click(screen.getByRole("link", { name: /example category1 /i }));
    expect(screen.getByTestId("location-display")).toHaveTextContent(
      `/products/${testProducts[1].id}`
    );
  });
  test("products display as expected", () => {
    const { container } = renderDisplayContainer(testProducts);
    expect(container).toMatchSnapshot();
  });
});
