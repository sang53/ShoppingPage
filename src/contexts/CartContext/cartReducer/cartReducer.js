export function cartReducer(state, action) {
  if (action.type === "reset") return {};

  const nid = parseInt(action.id);
  const nquantity = parseInt(action.quantity);

  if (isNaN(nid) || isNaN(nquantity) || nquantity < 0)
    throw new Error(
      `Invalid Product or Quantity\nid: ${nid}\nquantity: ${nquantity}`
    );

  switch (action.type) {
    case "add":
      return addItem(state, nid, nquantity);
    case "set":
      return setQuantity(state, nid, nquantity);
    default:
      throw new Error(`Invalid Cart Action: ${action.type}`);
  }
}

function addItem(items, id, quantity) {
  if (items[id]) return { ...items, [id]: items[id] + quantity };
  else return { ...items, [id]: quantity };
}

function setQuantity(items, id, quantity) {
  if (!items[id]) throw new Error("Product Not in Cart\nid: " + id);

  if (quantity === 0) {
    const { [id]: _, ...newItems } = items;
    return newItems;
  } else return { ...items, [id]: quantity };
}
