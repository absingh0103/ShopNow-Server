import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modals from "./ModalPage";
import {
  selectCartItems,
  updateCartAsync,
  deleteFromCartAsync,
} from "../features/Cart/CartSlice";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/Orders/ordersSlice";
import { updateUserAsync } from "../features/User/userSlice";
import { useForm } from "react-hook-form";
import { selectCompleteUserInfo } from "../features/User/userSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCompleteUserInfo);
  const currentOrder = useSelector(selectCurrentOrder);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const cartItems = useSelector(selectCartItems);

  const handleReset = () => {
    reset();
  };
  // Select Address
  const handleAdderss = (e) => {
    // here we get index of Address Array
   
    setSelectedAddress(user.addresses[e.target.value]);
  };
  //  Select payment method
  const handlePayment = (e) => {
   
    setPaymentMethod(e.target.value);
  };

  return (
    <>
      {!cartItems.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && currentOrder.paymentMethod === "cash" && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      {currentOrder && currentOrder.paymentMethod === "card" && (
        <Navigate to={`/stripe-checkout/`} replace={true}></Navigate>
      )}
      <div className="bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="mx-auto max-w-7xl -mt-12 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-100 to-teal-100">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 ">
            <div className="lg:col-span-3 mt-6 mb-5">
              <form
                className="bg-gradient-to-r from-rose-100 to-teal-100 rounded-lg px-8 py-10"
                noValidate
                onSubmit={handleSubmit((address) => {
                  // here we replace the existing user data with existing user details + address
                  // ...user complete details of user
                  // addresses:[...old address + new address]
                  dispatch(
                    updateUserAsync({
                      ...user,
                      addresses: [...user.addresses, address],
                    })
                  );
                  reset();
                  
                })}
              >
                <div className="space-y-12">
                  <div>
                    <div className="border-b border-gray-900/10 pb-12">
                      <h1 className="text-2xl font-bold leading-7 text-black">
                        Personal Information
                      </h1>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("name", {
                                required: "Name is required",
                              })}
                              id="name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.name && (
                            <span className="text-red-600">
                              {errors.name.message}
                            </span>
                          )}
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", {
                                required: "email is required",
                              })}
                              type="email"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.email && (
                            <span className="text-red-600">
                              {errors.email.message}
                            </span>
                          )}
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Mobile No.
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register("phone", {
                                required: "Mobile Number is required",
                              })}
                              type="tel"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.phone && (
                            <span className="text-red-600">
                              {errors.phone.message}
                            </span>
                          )}
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Country
                          </label>
                          <div className="mt-2">
                            <select
                              id="country"
                              {...register("country", {
                                required: "Country is required",
                              })}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option>India</option>
                              <option>United States</option>
                              <option>Canada</option>
                              <option>United Kingdom</option>
                              <option>Russia</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("street", {
                                required: "Street address is required",
                              })}
                              id="street"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.street && (
                            <span className="text-red-600">
                              {errors.street.message}
                            </span>
                          )}
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("city", {
                                required: "City  is required",
                              })}
                              id="city"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.city && (
                            <span className="text-red-600">
                              {errors.city.message}
                            </span>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("state", {
                                required: "State  is required",
                              })}
                              id="state"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.state && (
                            <span className="text-red-600">
                              {errors.state.message}
                            </span>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="pinCode"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("pinCode", {
                                required: "Pin-Code  is required",
                              })}
                              id="pinCode"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.pinCode && (
                            <span className="text-red-600">
                              {errors.pinCode.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900 hover:border-solid border-b p-1"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Address
                      </button>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base font-mono font-bold leading-7 text-gray-900">
                        Address
                      </h2>
                      <p className="mt-1 text-sm font-mono leading-6 text-gray-600">
                        Choose from Existing addresses
                      </p>

                      {/* Address */}
                      <ul role="list" className="divide-y divide-gray-100">
                        {user.addresses.map((address, index) => (
                          <li
                            key={index}
                            className="flex justify-between px-5 gap-x-6 py-5 border-solid border-2 border-gray-200 rounded-xl"
                          >
                            <div className="flex min-w-0 gap-x-4">
                              <input
                                name="address"
                                type="radio"
                                onChange={(e) => handleAdderss(e)}
                                value={index}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-mono font-bold leading-6 text-gray-900">
                                  {address.name}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  {address.email}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  {address.street}
                                </p>
                              </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                              <p className="text-sm leading-6 text-gray-900">
                                Phone: {address.phone}
                              </p>
                              <p className="text-sm leading-6 text-gray-500">
                                {address.pinCode}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      {/* Address End */}

                      <div className="mt-10 space-y-10">
                        <fieldset>
                          <legend className="text-sm font-mono font-bold leading-6 text-gray-900">
                            Payment Methods
                          </legend>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Choose One
                          </p>
                          <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-x-3">
                              <input
                                id="cash"
                                name="payments"
                                type="radio"
                                value="cash"
                                onChange={handlePayment}
                                // to apply By Default Checked if Inital value is Cash then it will checked
                                checked={paymentMethod === "cash"}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label
                                htmlFor="cash"
                                className="block text-sm font-mono font-semibold leading-6 text-gray-900"
                              >
                                Cash on Delivery
                              </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                              <input
                                id="card"
                                name="payments"
                                type="radio"
                                value="card"
                                onChange={handlePayment}
                                checked={paymentMethod === "card"}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label
                                htmlFor="Card"
                                className="block text-sm font-mono font-semibold leading-6 text-gray-900"
                              >
                                Card
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Cart In Checkout Page */}
            <CheckoutPageCart
              user={user}
              selectedAddress={selectedAddress}
              paymentMethod={paymentMethod}
              currentOrder={currentOrder}
            ></CheckoutPageCart>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

// Cart Componenet

const CheckoutPageCart = ({
  user,
  selectedAddress,
  paymentMethod,
  currentOrder,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [openModal, setOpenModal] = useState(null);

  const handleQuantity = (e, product) => {
    // (+) symbol convert String to number [+e.target.value]
    dispatch(updateCartAsync({ id: product.id, quantity: +e.target.value }));
  };

  // to Remove Items from Cart
  const handelRemove = (e, id) => {
    dispatch(deleteFromCartAsync(id));
  };

  // handle Order
  const handleOrder = (e) => {
    
    if (selectedAddress && paymentMethod) {
      const order = {
        cartItems,
        user: user.id,
        selectedAddress,
        paymentMethod,
        totalAmount,
        totalItems,
        status: "pending",
      };

      dispatch(createOrderAsync(order));
    } else {
      toast.error("Please provide ADDRESS and PAYMENT method.", {
        position: "top-center",
        theme: "colored",
        pauseOnHover: true,
        autoClose: 2000,
      });
    }
    // Else Me React Pop up wla Put Kr do
    // to After Click on order Button
    // Redirect To Order Success Page
    // Clear Cart After Order
    // on Server Change The Stock No
  };

  // To calculate Price we use array.recucer() method
  const totalAmount = cartItems.reduce(
    (amount, item) => item.product.discountPrice * item.quantity + amount,
    0
  );
  // to calculate Total items In Cart
  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );
  return (
    <div className="lg:col-span-2 mb-4">
      <div>
        <div className="mx-auto max-w-7xl px-4 lg:mt-16 pb-5 sm:px-6 lg:px-8 rounded-lg bg-gradient-to-r from-rose-100 to-teal-100 ">
          <h1 className="text-4xl font-extrabold font-mono tracking-tight mb-8 pt-5 text-gray-900 ">
            Shopping Cart
          </h1>
          {/* here we use product.product as here we refer each items of cart as product and in backend it is stored as [products:{}] */}
          <div className="flow-root ">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartItems.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-36 w-36 flex-shrink-0 p-1 overflow-hidden rounded-md border border-gray-200 lg:h-44 lg:w-44">
                    <img
                      src={product.product.thumbnail}
                      alt={product.product.title}
                      className="h-full w-full object-cover rounded-md object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between font-mono text-base font-semibold text-gray-900">
                        <h3>{product.product.title}</h3>
                        <p className="ml-4">
                          ${product.product.discountPrice}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          for="Qunatity"
                          className="inline mb-2 text-sm font-mono font-medium leading-6"
                        >
                          Qty
                        </label>
                        <select
                          onChange={(e) => handleQuantity(e, product)}
                          value={product.quantity}
                          className="ml-3 text-xs font-mono border-gray-200 rounded-lg"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <Modals
                          title={`Delete ${product.product.title}`}
                          message="Are you sure you want to delete this cart item?"
                          dangerOption="Delete"
                          cancleOption="Cancle"
                          cancleAction={(e) => setOpenModal(null)}
                          dangerAction={(e) => handelRemove(e, product.id)}
                          // since Model is in loop hence {openModal === product.id} helps to poen model of only that product which got clicked
                          showModal={openModal === product.id}
                        ></Modals>
                        <button
                          type="button"
                          className="font-medium  text-red-500 hover:text-red-700"
                          onClick={(e) => setOpenModal(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-7xl mt-6  px-4 sm:px-1 lg:px-4 bg-gradient-to-r from-teal-200 to-rose-200 rounded-3xl">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between font-mono text-2xl lg:text-3xl font-bold text-gray-900">
              <p>Subtotal</p>
              <p>${totalAmount}.00</p>
            </div>
            <div className="flex justify-between text-lg lg:text-xl font-mono font-semibold text-gray-900">
              <p>Total Items in Cart</p>
              {totalItems > 1 ? (
                <p>{totalItems} items</p>
              ) : (
                <p>{totalItems} item</p>
              )}
            </div>
            <p className="mt-2 text-sm font-mono text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <div
                onClick={handleOrder}
                className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
              >
                Proceed to buy/order
              </div>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-green-400 hover:text-green-500"
                  >
                    &nbsp;Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
