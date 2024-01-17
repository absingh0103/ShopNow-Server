// Controller is Api Creation for Putting Data in db

//* here user or (req.user) comes from the user created on signup
//* if Not understand Check PassPortjs Login and signup Auth Code where user is created

const Product = require("../model/Product");

// Add Product APi
exports.createProducts = async (req, resp) => {
  // it will get data from frontend and store in backend
  const product = new Product(req.body);
  // Also save discount Price
  product.discountPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100)
  );

  try {
    const data = await product.save();
    resp.status(200).json(data);
  } catch (err) {
    resp.status(400).json(err);
  }
};

// fetchProducts By Filter Api

exports.fetchProductsByFilters = async (req, resp) => {
  // filter={"category":["smartphones","laptops":"another"]} etc...
  // sort={"_sort":"price","order":"asc,desc"}
  // pagination={_page:1,limit:10} (?_page=1&_limit=10)
  // {deleted:{$not equal = true}}
  // to get Only Non deleted Product
  let condition = {};
  if (!req.query.admin) {
    condition.deleted = { $ne: true };
  }
  // this condition is applied when user is admin then all products including deleted products will also get fetched

  let query = Product.find(condition);

  let totalProductsQuery = Product.find(condition);

  if (req.query.category) {
    
    if (req.query.category.includes("electronics")) {
      req.query.category += ",smartphones,laptops";
    }
    if (req.query.category.includes("fashion")) {
      req.query.category += ",sunglasses";
    }

   
    query = query.find({ category: { $in: req.query.category.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      category: { $in: req.query.category.split(",") },
    });
  }
  //   for Brands
  if (req.query.brand) {
    query = query.find({ brand: { $in: req.query.brand.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      brand: { $in: req.query.brand.split(",") },
    });
  }
  // TODO: get Sorting From Discounted Price
  //   for sort
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }
  // to find total pages
  const totalDocs = await totalProductsQuery.count().exec();
  
  // for pagiantion
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  // For sending headers we created a header
  try {
    const docs = await query.exec();
    resp.set("X-Total-Count", totalDocs);
    resp.status(200).json(docs);
  } catch (err) {
    resp.status(400).json(err);
  }
};

// fetch Products by ID Api
exports.fetchProductsById = async (req, resp) => {
  try {
    const { id } = req.params;
    const productDetails = await Product.findOne({ _id: id });
    resp.status(201).json(productDetails);
  } catch (err) {
    resp.status(400).json(err);
  }
};

// Search Filter
// Here WE use regex to implement partial search and $option:"i" is use to find both uppercase and lowercase data
// regex can be use only for search on small data size for large data size we need to use indexing as regex matches all the data each time which makes it slow
exports.fetchSearchedProducts = async (req, resp) => {
  try {
    const { input } = req.params;

    if (!input) {
      // If input is not provided or is empty
      return resp.status(200).json(null);
    }

    
    const searchedProduct = await Product.find({
      $or: [
        { title: { $regex: input, $options: "i" } },
        { brand: { $regex: input, $options: "i" } },
        { category: { $regex: input, $options: "i" } },
      ],
    });

    
    resp.status(200).json(searchedProduct);
  } catch (err) {
    
    resp.status(400).json(err);
  }
};


// update Product Api
exports.updateProduct = async (req, resp) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    product.discountPrice = Math.round(
      product.price * (1 - product.discountPercentage / 100)
    );
    const updateProduct = await product.save();
    resp.status(201).json(updateProduct);
  } catch (err) {
    resp.status(400).json(err);
  }
};

// Function to Update Data
// const updateData = async () => {
//   const updation = await Product.updateMany(
//     {
//       category: "videogames",
//     },
//     {
//       $set: {
//         colors: [],
//         sizes: [
//           // {
//           //   name: "XXS",
//           //   inStock: true,
//           //   id: "xxs",
//           // },
//           // {
//           //   name: "XS",
//           //   inStock: true,
//           //   id: "xs",
//           // },
//           // {
//           //   name: "S",
//           //   inStock: true,
//           //   id: "s",
//           // },
//           // {
//           //   name: "M",
//           //   inStock: true,
//           //   id: "m",
//           // },
//           // {
//           //   name: "L",
//           //   inStock: true,
//           //   id: "l",
//           // },
//           // {
//           //   name: "XL",
//           //   inStock: true,
//           //   id: "xl",
//           // },
//           // {
//           //   name: "2XL",
//           //   inStock: true,
//           //   id: "2xl",
//           // },
//           // {
//           //   name: "3XL",
//           //   inStock: true,
//           //   id: "3xl",
//           // },
//         ],
//       },
//     }
//   );
//   if (updation.acknowledged == true) {
//     console.log("Data Updated");
//   }
// };

// // updateData()

// const updateData = async (dataArray) => {
//   const updates = dataArray.map(async (item) => {
//     const { title, thumbnail, images } = item;

//     const updation = await Product.updateOne(
//       { title: title},
//       {
//         $set: {
//           thumbnail: thumbnail,
//           images: images,
//         },
//       }
//     );

//     return updation.modifiedCount; // returns 1 if the document was updated, 0 otherwise
//   });

//   const results = await Promise.all(updates);
//   const updatedCount = results.reduce((sum, count) => sum + count, 0);

//   if (updatedCount > 0) {
//     console.log(`${updatedCount} data(s) updated`);
//   } else {
//     console.log("No data updated");
//   }
// };

// const dataArray = [
  
//   {
//     "id": 99,
//     "title": "American Vintage Wood Pendant Light",
//     "description": "American Vintage Wood Pendant Light Farmhouse Antique Hanging Lamp Lampara Colgante",
//     "price": 46,
//     "discountPercentage": 8.84,
//     "rating": 4.32,
//     "stock": 138,
//     "brand": "Ifei Home",
//     "category": "lighting",
//     "thumbnail": "https://cdn.dummyjson.com/product-images/99/thumbnail.jpg",
//     "images": [
//       "https://cdn.dummyjson.com/product-images/99/1.jpg",
//       "https://cdn.dummyjson.com/product-images/99/2.jpg",
//       "https://cdn.dummyjson.com/product-images/99/3.jpg",
//       "https://cdn.dummyjson.com/product-images/99/4.jpg",
//       "https://cdn.dummyjson.com/product-images/99/thumbnail.jpg"
//     ]
//   },
//   {
//     "id": 100,
//     "title": "Crystal chandelier maria theresa for 12 light",
//     "description": "Crystal chandelier maria theresa for 12 light",
//     "price": 47,
//     "discountPercentage": 16,
//     "rating": 4.74,
//     "stock": 133,
//     "brand": "YIOSI",
//     "category": "lighting",
//     "thumbnail": "https://cdn.dummyjson.com/product-images/100/thumbnail.jpg",
//     "images": [
//       "https://cdn.dummyjson.com/product-images/100/1.jpg",
//       "https://cdn.dummyjson.com/product-images/100/2.jpg",
//       "https://cdn.dummyjson.com/product-images/100/3.jpg",
//       "https://cdn.dummyjson.com/product-images/100/thumbnail.jpg"
//     ]
//   }
// ]

// updateData(dataArray);


