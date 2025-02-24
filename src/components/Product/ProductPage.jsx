import classes from "./ProductPage.module.css";
import { use, useRef } from "react";
import { useParams } from "react-router";
import { Products } from "../../contexts/Data/DataContext";
import { CartReducer } from "../../contexts/CartContext/CartContext";
import Helper from "../../Helper/Helpers";

export default function ProductPage() {
  const { id } = useParams();
  const productData = use(Products);
  const cartDispatch = use(CartReducer);
  const inputRef = useRef(null);
  const totalRef = useRef(null);

  if (!productData.length) return <h1>Loading...</h1>;

  const product = productData.find((obj) => obj.id === +id);
  if (!product) return <h1>Error: Product Not Found (id: {id})</h1>;

  return (
    <div className={"flex-column-center pad-1rem gap-1rem " + classes.main}>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <div className={classes.desc}>
        {product.description
          .split(".")
          .slice(0, -1)
          .map((sent, idx) => {
            return <p key={idx}>{sent + "."}</p>;
          })}
      </div>
      <div>{Helper.padDecimal(product.price)}</div>
      <div>
        Rating: {product.rating.rate} / 5 ({product.rating.count} Votes)
      </div>
      <div>
        <label htmlFor="total">Total: </label>
        <input
          id="total"
          className="total"
          type="text"
          readOnly
          ref={totalRef}
          value={Helper.getTotal(1, product.price)}
        />
      </div>
      <div>
        <label htmlFor="add-cart">Add To Cart: </label>
        <input
          id="add-cart"
          type="number"
          min="1"
          defaultValue="1"
          ref={inputRef}
          onChange={(e) => {
            if (e.target.value <= 0)
              totalRef.current.value = Helper.getTotal(1, product.price);
            else
              totalRef.current.value = Helper.getTotal(
                e.target.value,
                product.price
              );
          }}
          onBlur={(e) => {
            if (e.target.value <= 0) inputRef.current.value = 1;
          }}
        />
        <button
          onClick={() => {
            cartDispatch({
              type: "add",
              id,
              quantity: inputRef.current.value,
            });
            inputRef.current.value = 1;
            totalRef.current.value = Helper.getTotal(1, product.price);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
