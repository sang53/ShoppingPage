import classes from "./CartContainer.module.css";
import { use } from "react";
import {
  CartItems,
  CartReducer,
} from "../../../contexts/CartContext/CartContext";
import CartProduct from "../CartProduct/CartProduct";
import { checkout } from "../../../Helper/Helpers";

export default function CartContainer() {
  const cart = use(CartItems);
  const output = Object.entries(cart).map(([id, quantity]) => {
    return <CartProduct key={id} id={+id} quantity={quantity} />;
  });
  const cartDispatch = use(CartReducer);
  return (
    <div className={classes.cartContainer}>
      <h1>Shopping Cart:</h1>
      {output.length ? output : <div>Your Cart is Empty!</div>}
      <div>
        <button
          onClick={() => {
            if (Object.keys(cart).length == 0) return;
            cartDispatch({ type: "reset" });
          }}
        >
          Remove All
        </button>
        <button
          onClick={(e) => {
            checkout(e.target, cart, cartDispatch);
          }}
        >
          Checkout All
        </button>
      </div>
    </div>
  );
}
