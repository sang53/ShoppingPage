import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import MainPage from "./components/Landing/MainPage/MainPage";
import CategoryDisplay from "./components/Display/CategoryDisplay/CategoryDisplay";
import ProductDisplay from "./components/Display/ProductDisplay/ProductDisplay";
import ProductPage from "./components/Product/ProductPage";
import CartContainer from "./components/Cart/CartContainer/CartContainer";
import ErrorPage from "./components/ErrorPage/ErrorPage";

export default function RouteStructure() {
  return (
    <BrowserRouter basename="/ShoppingPage/">
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<MainPage />} />
          <Route path="categories" element={<CategoryDisplay />}>
            <Route path=":category" element={<CategoryDisplay />} />
          </Route>
          <Route path="products">
            <Route index element={<ProductDisplay />} />
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path="cart" element={<CartContainer />} />
          <Route path="/*" element={<ErrorPage message="Page Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
