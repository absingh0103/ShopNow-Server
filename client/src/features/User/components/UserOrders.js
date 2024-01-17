import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import {
  selectCompleteUserInfo,
  selectCompleteUserOrder,
  selectUserStatus,
} from "../userSlice";
import { ProgressBar } from "react-loader-spinner";


const UserOrders = () => {
  
  const userOrders = useSelector(selectCompleteUserOrder);
  const user = useSelector(selectCompleteUserInfo);
  const status = useSelector(selectUserStatus);
  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-500";

      case "dispatched":
        return "text-lime-600 ";

      case "delivered":
        return "text-green-400 ";

      case "cancelled":
        return "text-red-600 ";
      default:
        return "text-yellow-400 ";
    }
  };

  return (
    <>
      <div>
        {user &&
          userOrders.length > 0 &&
          userOrders.map((order) => (
            <div
              key={order.id}
              className="bg-gradient-to-r from-rose-200 to-teal-200 pb-1"
            >
              <div className="mx-auto max-w-7xl px-4 pb-3 pt-5 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-100 to-teal-100 rounded-t-2xl ">
                <h1 className="text-4xl font-extrabold font-mono tracking-tight mb-8 text-gray-900 ">
                  Order{" "}
                  <span className="text-blue-500  text-2xl lg:text-3xl ">
                    #{order.id}
                  </span>
                </h1>
                <h3 className="text-xl font-bold font-mono tracking-tight -mt-5 mb-8 text-rose-500 ">
                  Order Status:{" "}
                  <span className={`${statusColor(order.status)}`}>
                    {order.status}
                  </span>
                </h3>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.cartItems.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-36 w-36 flex-shrink-0 p-1 overflow-hidden rounded-md border border-gray-200 lg:h-40 lg:w-40">
                          <img
                            src={product.product.thumbnail}
                            alt={product.product.title}
                            className="h-full w-full object-cover rounded-md object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-semibold text-gray-900">
                              <h3></h3>
                              <p className="ml-4 font-mono">
                                ${product.product.discountPrice}
                              </p>
                            </div>
                            <p className=" text-base font-serif text-gray-900">
                              {product.product.title}
                            </p>
                            <p className=" text-sm font-mono text-gray-700">
                              {product.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                for="Qunatity"
                                className="inline mb-2 text-sm font-mono font-medium leading-6"
                              >
                                Qty: {product.quantity}
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mx-auto max-w-7xl  mb-5 px-4 sm:px-1 lg:px-8 bg-gradient-to-r from-teal-200 to-rose-200 rounded-b-2xl">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-3xl font-mono font-semibold text-gray-900">
                    <p>Total Payment</p>
                    <p>${order.totalAmount}.00</p>
                  </div>
                  <div className="flex justify-between text-xl font-mono font-semibold text-gray-900">
                    <p>Total Items </p>
                    {order.totalItems === 1 ? (
                      <p>{order.totalItems} item</p>
                    ) : (
                      <p>{order.totalItems} items</p>
                    )}
                  </div>
                  <div className="flex justify-between  font-mono text-lg font-medium text-gray-900">
                    <p>Paymet Method </p>
                    <p>{order.paymentMethod} </p>
                  </div>
                 
                  {/* to display Address Details*/}
                  <div className="flex justify-between text-lg font-mono font-medium text-blue-500">
                    <p>Shipping Address: </p>
                  </div>
                  <div className="flex justify-between mt-1 px-5 gap-x-6 py-2 border-solid border-2 border-gray-300 rounded-xl">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-lg font-mono font-semibold leading-6 text-sky-700">
                          Name:{order.selectedAddress.name}
                        </p>
                        <p className="mt-1 truncate text-base font-normal leading-5 text-sky-600">
                          Email : {order.selectedAddress.email}
                        </p>
                        <p className="mt-1 truncate text-base font-normal leading-5 text-sky-600">
                          Address : {order.selectedAddress.street}
                        </p>
                        <p className="mt-1 truncate text-base font-normal leading-5 text-sky-600">
                          Country : {order.selectedAddress.country}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-base leading-6 text-sky-600 font-normal">
                        Phone : {order.selectedAddress.phone}
                      </p>
                      <p className="text-base leading-6 text-sky-600 font-normal">
                        PinCode : {order.selectedAddress.pinCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {status === "loading" ? (
          <ProgressBar
            height="100"
            width=""
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="	rgb(250, 128, 114)"
          />
        ) : null}
      </div>
    </>
  );
};

export default UserOrders;
