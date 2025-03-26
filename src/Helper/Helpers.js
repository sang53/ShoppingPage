export default (() => {
  const baseURL = "https://fakestoreapi.com/";

  async function getProduct() {
    return await handleFetch(baseURL + "products/");
  }

  async function handleFetch(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Status Code: " + response.status);
      return await response.json();
    } catch (error) {
      console.error(error.message);
    }
  }

  function getTotal(price, quantity) {
    return padDecimal(Math.round(price * quantity * 100) / 100);
  }

  function padDecimal(string) {
    string += "";
    const [dollar, cents] = string.split(".");
    if (!cents) return `$${string}.00`;
    return `$${dollar}.` + cents.padEnd(2, "0");
  }

  return { getProduct, getTotal, padDecimal };
})();

export async function checkout(button, cart, cartDispatch) {
  if (Object.keys(cart).length == 0) return console.log("Shopping Cart Empty");

  const buttonText = button.textContent;
  buttonLoad(button);
  console.log("Attempting: " + JSON.stringify(cart));

  const response = await fetch("https://fakestoreapi.com/carts/1", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  }).catch((err) => {
    console.error(err.message);
    return { status: 404 };
  });

  switch (response.status) {
    case 200:
      console.log("Success");
      if (Object.keys(cart).length == 1)
        cartDispatch({ type: "set", id: Object.keys(cart)[0], quantity: 0 });
      else cartDispatch({ type: "reset" });
      break;
    case 400:
      console.error("Error: Invalid Cart or Products");
      break;
    default:
      console.log(`Status Code: ${response.status}`);
  }

  buttonLoad(button, buttonText);
}

function buttonLoad(button, text) {
  button.disabled = text ? false : true;
  button.textContent = text ? text : "Checking Out...";
}
