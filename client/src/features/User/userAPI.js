//! here we do not need to pass UserId as it will added in Backend in any Api 

// To get all The Details of Login user
// This Is different From selectLoggedInUser which contains only Token Of LoggedIn User
//But userInfo conatins  All Details like Address,orders and all other info
const fetchLoggedInUser = async () => {
  try {
    const response = await fetch("/users/own");
    const data = await response.json();
    if (data) {
      return { data };
    } else {
      const error = await response.text();
      throw error;
    }
  } catch (error) {
    // to get the rejected condition called in slice we need to use (throw Keyword)
    // if we use promsie insted of async/await we use promise.reject()
    throw error;
  }
}
 
// To Get All The Orders Of LoggedIn User
// UserId provided in backend
const fetchUserOrders = async () => {
  const response = await fetch("/orders/user/own/");
  const data = await response.json();
  return { data }
}

// To Update user Address
const updateUser = async (update) => {
  // here We Add New Addresses With Old Stored Addresses
  const response = await fetch("/users/" + update.id, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return { data };
};


export { fetchLoggedInUser, fetchUserOrders, updateUser }