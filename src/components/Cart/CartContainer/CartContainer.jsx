import classes from "./CartContainer.module.css";
import { use } from "react";
import {
  CartItems,
  CartReducer,
} from "../../../contexts/CartContext/CartContext";

import CartProduct from "../CartProduct/CartProduct";

export default function CartContainer() {
  const output = Object.entries(use(CartItems)).map(([id, quantity]) => {
    return <CartProduct key={id} id={+id} quantity={quantity} />;
  });
  const cartDispatch = use(CartReducer);
  return (
    <div className={classes.cartContainer}>
      <h1>Shopping Cart:</h1>
      {output.length ? output : <div>Your Cart is Empty!</div>}
      <div>
        <button onClick={() => cartDispatch({ type: "reset" })}>
          Remove All
        </button>
        <button>Checkout All</button>
      </div>
    </div>
  );
}
