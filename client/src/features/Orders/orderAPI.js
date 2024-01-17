//! IMPORTANT: Now We dont Need to pass User ID (user.id) as in Backend It will take loggedIn UserId Automatically from req.user and Then Add to Api Call. Hence From Frontend we just need to hit on paticular Api Path without userId

//to create order

const createOrder = async (order) => {
  const response = await fetch("/orders", {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return { data };
};

// to Fetch All Orders To Dsiplay To Admin
// Same as Filter Api For Pagination of User Orders

const fetchAllOrders = async (sort, pagination) => {
  // TODO:Server will filter the deleted product before displaying to user using deleted:true value

  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  /* For Pageinatation */
  // pagination={_page:1,limit:10} (?_page=1&_limit=10)
  // It will Show first page with limit of products on 1st page =10

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  
  const response = await fetch("/orders?" + queryString);
  const data = await response.json();
  // Total items or response povided by json-server in  header so we also need to create this header when we Create Api
  const totalOrders = await response.headers.get("X-Total-Count");

  return { data: { orders: data, totalOrders: +totalOrders } };
};

// Update Order Status By admin 


const updateOrder = async (order) => {
  const response = await fetch("/orders/" + order.id, {
    method: "PATCH",
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return { data };
};

// TODO: WE will also create update order for user so that user can update their their order details like delivery address and also can cancle their order 








export { createOrder, fetchAllOrders, updateOrder };
