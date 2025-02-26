import DisplayContainer from "../DisplayContainer/DisplayContainer";
import { use } from "react";
import { Products } from "../../../contexts/Data/DataContext";
import DisplayObj from "../DisplayObj/DisplayObj";
import { useState } from "react";
import SortSelect from "../SortSelect/SortSelect";

export default function ProductDisplay() {
  const [sort, setSort] = useState(["cat", "asc"]);
  const displayItems = use(Products).map((obj) => new DisplayObj(obj));
  sortDisplayItems(displayItems, sort);

  return (
    <>
      <h1>All Products</h1>
      <SortSelect by={sort[0]} order={sort[1]} setSort={setSort} />
      <DisplayContainer displayItems={displayItems} />
    </>
  );
}

function sortDisplayItems(displayItems, [by, order]) {
  if (by !== "cat") displayItems.sort(getSortFx(by));
  if (order === "desc") displayItems.reverse();
}

function getSortFx(by) {
  function ByAlpha(a, b) {
    const maxLength =
      a.title.length > b.title.length ? a.title.length : b.title.length;
    for (let i = 0; i < maxLength; i++) {
      const aCode = a.title[i].toLowerCase().charCodeAt();
      const bCode = b.title[i].toLowerCase().charCodeAt();
      if (aCode !== bCode) return aCode - bCode;
    }
  }

  function ByPrice(a, b) {
    return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
  }

  if (by === "price") return ByPrice;
  return ByAlpha;
}
