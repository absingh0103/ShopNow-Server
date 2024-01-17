//! IMPORTANT: Now We dont Need to pass User ID (user.id) as in Backend It will take loggedIn UserId Automatically from req.user and Then Add to Api Call. Hence From Frontend we just need to hit on paticular Api Path without userId

// To add Product (Item in Cart) in
const addToCart = async (item) => {
  const response = await fetch("/cart", {
    method: "POST",
    body: JSON.stringify(item),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return { data };
};

// to fetch Cart Items by userId
const fetchCartItemsByUserId = async () => {

  const response = await fetch("/cart");
  // userId automatically added in backend
  const data = await response.json();
  
  return { data };
};

// to Update Cart Details like quantity etc...

const updateCart = async (update) => {
  // here We replace whole data with updated quantity data
  const response = await fetch("/cart/" + update.id, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return { data };
};

// to remove Items From Cart
const deleteFromCart = async (itemId) => {
  const response = await fetch("/cart/" + itemId, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return { data: { id: itemId } };
};

// to Remove Cart Details Once Order is placed and stored in Order Array
// userId From Backend fetch automatically
const resetCart = async () => {
  // get all the items From User cart on basic of UserId and then Delelet all
  const response = await fetchCartItemsByUserId();
  const items = response.data;
  // deleting each item From cart
  for (let item of items) {
    await deleteFromCart(item.id);
  }
  return { status: "Cart Empty" };
};

export { addToCart, fetchCartItemsByUserId, updateCart, deleteFromCart, resetCart };
