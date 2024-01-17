// to fetch All Products
const fetchProducts = async () => {
  const response = await fetch("/products");
  const data = await response.json();
  // TODO:Server will filter the deleted product before displaying to user using deleted:true value
  
  return { data };
};

const fetchSearchedProducts = async (input) => {
    const response = await fetch("/products/search/" + input);
    const data = await response.json();
    
    return { data };
};

// to fetch Filtered Products
const fetchProductsByFilters = async (filter, sort, pagination, admin) => {
  // These Comments are Important as we need to create Api of similar type
  // here we get a filter Object Which Contains Details
  // filter={"category":["smartphones","laptops":"anyother"]} etc...

  // sort={"_sort":"price","_order":"asc,desc"}

  // create a query string to pass in url to get a filered data

  let queryString = "";
  for (let key in filter) {
    // Creates an array filters={"category":["samrtphones",laptops,...,]}
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      // to sort by last Element of Category Array
      //  & symbol is used to handle multiple query params
      queryString += `${key}=${categoryValues}&`;
    }
  }
  
  // For sort We create a seperate object
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  /* For Pageinatation */
  // pagination={_page:1,limit:10} (?_page=1&_limit=10)
  // It will Show first page with limit of products on 1st page =10

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  // to display deleted product to admin only
  if (admin) {
    queryString += "admin=true";
  }

  
  const response = await fetch("/products?" + queryString);
  const data = await response.json();
  // Total items or response povided by json-server in  header so we also need to create this header when we Create Api
  const totalItems = await response.headers.get("X-Total-Count");
  
  return { data: { products: data, totalItems: +totalItems } };
};

// To Fetch All brands For Sorting
const fetchCategories = async () => {
  const response = await fetch("/categories");
  const data = await response.json();
  
  return { data };
};
// to Fetch all Brands
const fetchBrands = async () => {
  const response = await fetch("/brands");
  const data = await response.json();
  
  return { data };
};

// Fetch Products By Id
const fetchProductsById = async (id) => {
  const response = await fetch("/products/" + id);
  const data = await response.json();
  
  return { data };
};

// For Admin
// Add New Product in DB
const createNewProduct = async (product) => {
  const response = await fetch("/products/", {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return { data };
};

const updateProduct = async (update) => {
  // here We replace whole data with updated quantity data
  const response = await fetch("/products/" + update.id, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return { data };
};

export {
  fetchProducts,
  fetchProductsByFilters,
  fetchCategories,
  fetchBrands,
  fetchProductsById,
  createNewProduct,
  updateProduct,
  fetchSearchedProducts,
};
