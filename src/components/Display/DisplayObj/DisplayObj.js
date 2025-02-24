import Helpers from "../../../Helper/Helpers";

export default class DisplayObj {
  constructor(product, category = false) {
    if (category) {
      this.id = product.category;
      this.title = DisplayObj.capitalise(product.category);
      this.image = product.image;
      this.link = `/categories/${product.category}`;
    } else {
      this.id = product.id;
      this.title = product.title;
      this.image = product.image;
      this.price = Helpers.padDecimal(product.price);
      this.link = `/products/${product.id}`;
    }
  }

  static capitalise(string) {
    return string
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  static getAllCategories(products) {
    const output = [];
    products.forEach((obj) => {
      if (
        !output.some(
          (displayObj) =>
            displayObj.title === DisplayObj.capitalise(obj.category)
        )
      )
        output.push(new DisplayObj(obj, true));
    });
    return output;
  }

  static getCategoryProducts(products, category) {
    return products
      .filter((obj) => obj.category === category)
      .map((obj) => new DisplayObj(obj));
  }
}
