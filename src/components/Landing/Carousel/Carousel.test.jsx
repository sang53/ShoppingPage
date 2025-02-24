import { beforeAll, describe, expect, it, test, vi } from "vitest";
import { LocationDisplay } from "../../../test/utils/utils";
import Carousel from "./Carousel";
import { Products } from "../../../contexts/Data/DataContext";
import { cleanup, render, screen } from "@testing-library/react";
import { mockProducts } from "../../../test/utils/mockProducts";
import { MemoryRouter } from "react-router";

function renderCarousel(
  value,
  { displayNum = undefined, location = false } = {}
) {
  return render(
    <Products.Provider value={value}>
      <MemoryRouter initialEntries={["/"]}>
        <Carousel displayNum={displayNum} />
        {location && <LocationDisplay />}
      </MemoryRouter>
    </Products.Provider>
  );
}

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe("loading state", () => {
  it("displays loading div when products are not fetched yet", () => {
    renderCarousel([]);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

describe("loads fetched products", () => {
  it("displays all carousel products", () => {
    renderCarousel(mockProducts);
    expect(screen.getAllByRole("link")).toHaveLength(11);
  });
  it("handles smaller number of products", () => {
    renderCarousel(mockProducts, { displayNum: 30 });
    expect(screen.getAllByRole("link")).toHaveLength(mockProducts.length);
  });
  it("scrolls to halfway through carousel on load", () => {
    renderCarousel(mockProducts);
    expect(Element.prototype.scrollIntoView.mock.contexts).toHaveLength(1);
    expect(Element.prototype.scrollIntoView.mock.contexts[0]).toHaveAttribute(
      "id",
      "carousel-5"
    );
  });
});

describe("carousel elements display correctly", () => {
  test("carousel product links to url", async () => {
    for (const product of mockProducts) {
      renderCarousel(mockProducts, {
        displayNum: mockProducts.length,
        location: true,
      });
      await user.click(screen.getByRole("img", { name: product.title.trim() }));
      expect(screen.getByTestId("location-display")).toHaveTextContent(
        `/products/${product.id}`
      );
      cleanup();
    }
  });
  test("carousel products display as expected", () => {
    const { container } = renderCarousel(mockProducts.slice(0, 1), {
      displayNum: 1,
    });
    expect(container).toMatchSnapshot();
  });
});
