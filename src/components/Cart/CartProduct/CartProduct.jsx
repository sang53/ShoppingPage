import classes from "./CartProduct.module.css";
import { use, useRef } from "react";
import { CartReducer } from "../../../contexts/CartContext/CartContext";
import { Products } from "../../../contexts/Data/DataContext";
import PropTypes from "prop-types";
import { Link } from "react-router";
import Helper, { checkout } from "../../../Helper/Helpers";

export default function CartProduct({ id, quantity }) {
  const product = use(Products).find((obj) => obj.id === id);
  const cartDispatch = use(CartReducer);
  const totalRef = useRef(null);

  if (!product) return <h1>Error: Product not found</h1>;

  function handleCart(event) {
    if (event.target.value < 0) return;
    if (event.target.value === "") {
      event.target.value = quantity;
      totalRef.current.value = Helper.getTotal(quantity, product.price);
    } else
      cartDispatch({
        type: "set",
        id,
        quantity: event.target.value,
      });
  }

  return (
    <div className={"gap-1rem pad-1rem " + classes.cartItem}>
      <img src={product.image} alt={product.title} />
      <div className={classes.info}>
        <h1>
          <Link to={`products/${id}`}>{product.title}</Link>
        </h1>
        <div>
          <i>{Helper.padDecimal(product.price)}</i>
        </div>
        <div>
          <label htmlFor={`quantity-${product.id}`} className="bold">
            Quantity:
          </label>
          <input
            id={`quantity-${product.id}`}
            type="number"
            min="0"
            onBlur={handleCart}
            onChange={(e) => {
              if (e.target.value === "")
                totalRef.current.value = Helper.getTotal(
                  quantity,
                  product.price
                );
              else if (e.target.value < 0) totalRef.current.value = "N/A";
              else
                totalRef.current.value = Helper.getTotal(
                  e.target.value,
                  product.price
                );
            }}
            defaultValue={quantity}
          />
        </div>
        <div>
          <label htmlFor="total" className="bold">
            Total:
          </label>
          <input
            id="total"
            className="total"
            type="text"
            readOnly
            ref={totalRef}
            value={Helper.getTotal(quantity, product.price)}
          />
        </div>
        <button
          onClick={(e) => {
            checkout(e.target, { [id]: quantity }, cartDispatch);
          }}
        >
          Checkout
        </button>
        <button onClick={() => cartDispatch({ type: "set", id, quantity: 0 })}>
          Remove
        </button>
      </div>
    </div>
  );
}

CartProduct.propTypes = {
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};
