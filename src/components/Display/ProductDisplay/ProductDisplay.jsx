import DisplayContainer from "../DisplayContainer/DisplayContainer";
import { use } from "react";
import { Products } from "../../../contexts/Data/DataContext";
import DisplayObj from "../DisplayObj/DisplayObj";

export default function ProductDisplay() {
  const displayItems = use(Products).map((obj) => new DisplayObj(obj));
  return (
    <>
      <h1>All Products</h1>
      <DisplayContainer displayItems={displayItems} />
    </>
  );
}
