//* here user or (req.user) comes from the user created on signup
//* if Not understand Check PassPortjs Login and signup Auth Code where user is created

const Order = require("../model/Orders");
const Users = require("../model/Users");
const Product = require("../model/Product");
const { SendMail, orderInvoice } = require("../services/common");

// Order Api

// Create Order
exports.createOrder = async (req, resp) => {
  // we get the order From user
  const order = new Order(req.body);

  //to Update Stock whenver a new order is placed
  for (let item of order.cartItems) {
    const product = await Product.findOne({ _id: item.product.id });
    // to decrement Value we use -ve of increment
    product.$inc("stock", -1 * item.quantity);
    await product.save();
  }

  try {
    // Here Cart Store Reference Or Object_id of Product and User with quantity
    const data = await order.save();
    // To send Mail of invoice
    const user = await Users.findById(order.user);
    SendMail({
      to: user.email,
      subject: "Order received",
      html: orderInvoice(order),
    });
    resp.status(200).json(data);
  } catch (err) {
    resp.status(400).json(err);
  }
};

//   req.query when passed as {/orders/?user=" + userId}  and req.params when passed as {/orders/user}

// Fetch User Order by user Id
exports.fetchUserOrders = async (req, resp) => {
  const { id } = req.user;
  try {
    const order = await Order.find({ user: id });
    resp.status(200).json(order);
  } catch (err) {
    resp.status(400).json(err);
  }
};
// TODO: ->>>Make This Api Later

// Delete From Cart or Cancle Order
// Same As delete From Cart
exports.cancleOrder = async (req, resp) => {
  const { id } = req.params;
  try {
    const cancleOrder = await Order.findByIdAndDelete(id);
    resp.status(200).json(cancleOrder);
  } catch (err) {
    resp.status(400).json(err);
  }
};

// Update Order ->>to update Order Address
exports.updateOrder = async (req, resp) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const updatedOrder = await order.populate("product");
    resp.status(200).json(updatedOrder);
  } catch (err) {
    resp.status(400).json(err);
  }
};

// For Admin Panel
exports.fetchAllOrders = async (req, resp) => {
  // sort={"_sort":"price","order":"asc,desc"}
  // pagination={_page:1,limit:10} (?_page=1&_limit=10)

  // {deleted:{$not equal = true}}
  // to get Only Non deleted Product
  let query = Order.find({ deleted: { $ne: true } });

  let totalOrderQuery = Order.find({ deleted: { $ne: true } });

  // TODO: get Sorting From Discounted Price
  //   for sort
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }
  // to find total pages
  const totalDocs = await totalOrderQuery.count().exec();
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
