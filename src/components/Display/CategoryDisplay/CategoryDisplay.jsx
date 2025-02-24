import { useParams } from "react-router";
import DisplayContainer from "../DisplayContainer/DisplayContainer";
import { Products } from "../../../contexts/Data/DataContext";
import { use } from "react";
import DisplayObj from "../DisplayObj/DisplayObj";

export default function CategoryDisplay() {
  const { category } = useParams();
  const displayItems = category
    ? DisplayObj.getCategoryProducts(use(Products), category)
    : DisplayObj.getAllCategories(use(Products));

  return (
    <>
      <h1>{category ? DisplayObj.capitalise(category) : "Categories"}</h1>
      <DisplayContainer displayItems={displayItems} />
    </>
  );
}
