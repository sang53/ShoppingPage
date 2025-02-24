export default (() => {
  const baseURL = "https://fakestoreapi.com/";

  async function getProduct() {
    return await handleFetch(baseURL + "products/");
  }

  async function handleFetch(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Status Code: " + response.status);
    return await response.json();
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
