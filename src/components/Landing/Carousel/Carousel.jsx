import { use, useEffect, useMemo, useState } from "react";
import { Products } from "../../../contexts/Data/DataContext";
import { Link } from "react-router";
import PropTypes from "prop-types";
import classes from "./Carousel.module.css";
import NavWrapper from "../NavWrapper/NavWrapper";

function getRandomIds(max, num) {
  if (num > max) num = max;
  const randSet = new Set();
  while (randSet.size < num) {
    randSet.add(Math.floor(Math.random() * max));
  }
  return Array.from(randSet);
}

export default function Carousel({ displayNum = 11 }) {
  const [carouselIdxs, setCarouselIdxs] = useState([]);
  const products = use(Products);
  const startIdx = Math.floor(displayNum / 2);

  const carouselProducts = useMemo(() => {
    return carouselIdxs.map((productIdx, idx) => (
      <CarouselProduct
        key={productIdx}
        idx={idx}
        product={products[productIdx]}
      />
    ));
  }, [carouselIdxs, products]);

  useEffect(() => {
    if (!products) console.log("Error: Fetch not successful");
    if (products.length && !carouselIdxs.length)
      setCarouselIdxs(getRandomIds(products.length, displayNum));
  }, [products, displayNum, carouselIdxs]);

  if (carouselIdxs.length === 0) return <div>Loading...</div>;

  return (
    <div className={`flex gap-1rem relative ${classes.carousel}`} id="carousel">
      <NavWrapper startIdx={startIdx} displayNum={displayNum}>
        {carouselProducts}
      </NavWrapper>
    </div>
  );
}

function CarouselProduct({ product, idx }) {
  return (
    <Link
      to={`/products/${product.id}`}
      id={`carousel-${idx}`}
      className="product"
    >
      <div className="product-img">
        <img src={product.image} alt={product.title} />
      </div>
      <div>
        <div>{product.title}</div>
        <div>${product.price}</div>
      </div>
    </Link>
  );
}

Carousel.propTypes = {
  displayNum: PropTypes.number,
};

CarouselProduct.propTypes = {
  idx: PropTypes.number.isRequired,
  product: PropTypes.objectOf(PropTypes.string).isRequired,
};
