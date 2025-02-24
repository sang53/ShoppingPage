import { useReducer } from "react";
import { CartItems, CartReducer } from "../CartContext";
import PropTypes from "prop-types";
import { cartReducer } from "../cartReducer/cartReducer";

export default function CartContextWrapper({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, {});
  return (
    <CartItems.Provider value={cart}>
      <CartReducer.Provider value={dispatch}>{children}</CartReducer.Provider>
    </CartItems.Provider>
  );
}

CartContextWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
