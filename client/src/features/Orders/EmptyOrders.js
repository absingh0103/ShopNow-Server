import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EmptyOrders = () => {
 
  return (
    <><div className="bg-gradient-to-r from-rose-100 to-teal-100 -mt-12">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gradient-to-r from-rose-100 to-teal-100 p-8 rounded-lg flex flex-col items-center text-center">
          <img
            src="../orders.png"
            alt="Empty Cart"
            className="mx-auto w-1/3 h-1/3 mb-4 "
          />
          <h2 className="text-2xl lg:text-4xl font-semibold font-mono mb-4">No Order Placed Yet!</h2>
          <p className="text-gray-600 font-mono">
            It's time to start shopping! Explore our amazing products and add them to your cart.
          </p>
          <Link
            to="/"
            className="mt-6 bg-rose-500 text-white  hover:bg-rose-600 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default EmptyOrders;
