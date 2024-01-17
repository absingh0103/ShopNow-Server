import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  updateCartAsync,
  deleteFromCartAsync,
  selectCartStatus,
  selectCartLoaded,
} from "./CartSlice";
import { selectLoggedInUser } from "../Auth/AuthSlice";
import EmptyCart from "./EmptyCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modals from "../../pages/ModalPage";
import MainLoaderPage from "../Loader/MainLoaderPage";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectLoggedInUser);
  const status = useSelector(selectCartStatus);
  const cartLoaded=useSelector(selectCartLoaded)
  const [openModal, setOpenModal] = useState(null);

  const handleQuantity = (e, product) => {
    // (+) symbol convert String to number [+e.target.value]
    dispatch(updateCartAsync({ id: product.id, quantity: +e.target.value }));
  };

  // to Remove Items from Cart
  const handelRemove = (e, id) => {
    dispatch(deleteFromCartAsync(id));
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
    <>
      {totalItems > 0 ? (
        <div className=" bg-gradient-to-r from-rose-100 to-teal-100 -mt-12 pb-2">
          {status === "loading" ? <MainLoaderPage /> : null}
         
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-100 to-teal-100 ">
            <h1 className="text-3xl lg:text-5xl cursor-pointer font-bold font-mono tracking-tight text-rose-600  mb-8 pt-6 pb-3   ">
              Shopping Cart
              <img
                src="../AuthIcon.png"
                alt=""
                className="w-10 h-8 ml-2 lg:ml-4 inline animate-bounce"
              />
            </h1>
            {/* here we use product.product as here we refer each items of cart as product and in backend it is stored as [products:{}] */}
            <div className="flow-root ">
              <ul role="list" className="-my-6 divide-y divide-gray-300">
                {cartItems.map((product) => (
                  <li key={product.product.id} className="flex py-6">
                    <div className="h-36 w-36 flex-shrink-0 p-1 overflow-hidden rounded-md border border-gray-200 lg:h-52 lg:w-52">
                      <img
                        src={product.product.thumbnail}
                        alt={product.product.title}
                        className="h-full w-full object-cover rounded-md object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-mono  font-semibold text-gray-900">
                          <h3>{product.product.title}</h3>
                          <p className="ml-4">
                            ${product.product.discountPrice}
                          </p>
                        </div>
                        <p className="mt-1 text-sm font-mono  text-gray-500">
                          {product.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            for="Qunatity"
                            className="inline mb-2 text-sm font-medium font-mono  leading-6"
                          >
                            Qty
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, product)}
                            value={product.quantity}
                            className="ml-3 text-xs border-gray-200 font-mono  rounded-lg"
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
                            dangerAction={(e) =>
                              handelRemove(e, product.id)
                            }
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

          <div className="mx-auto max-w-7xl mt-8  px-4 sm:px-1 lg:px-8 bg-gradient-to-r from-teal-200 to-rose-200 rounded-3xl">
            <div className="border-t border-gray-200 font-mono  px-4 py-6 sm:px-6">
              <div className="flex justify-between text-2xl lg:text-4xl font-bold text-gray-900">
                <p>Subtotal</p>
                <p>${totalAmount}.00</p>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <p>Total Items in Cart</p>
                {totalItems > 1 ? (
                  <p>{totalItems} items</p>
                ) : (
                  <p>{totalItems} item</p>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium font-sans text-white shadow-sm hover:bg-green-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium font-sans text-green-400 hover:text-green-500"
                    >
                      &nbsp;Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <EmptyCart></EmptyCart>
      )}
    </>
  );
};

export default Cart;
