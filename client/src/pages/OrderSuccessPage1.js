import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { selectLoggedInUser } from "../features/Auth/AuthSlice";
import { resetCartAsync } from "../features/Cart/CartSlice";
import { resetOrder } from "../features/Orders/ordersSlice";

// todo:Change UI

const OrderSuccessPage1 = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const params = useParams();
// to Reset Cart And CurrentOrder
  useEffect(() => {
    // reset Cart 
    // Here Reset cart calling deleteFromCart internally 
    // do not pass UserId as it will take id itsef in Backend
    dispatch(resetCartAsync());
    // After Placing Order We need to reset CurrentOrder
    dispatch(resetOrder());
  }, [dispatch,user]);

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-full place-items-center -mt-12 bg-gray-300 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-5xl lg:text-7xl font-extrabold tracking-tight text-orange-400 ">
            Order Successfully
          </h1>

          <p className="mt-6  leading-7  text-xl font-medium text-gray-600">
            Order Number{" "}
            <Link to="/" replace={true}>
              <span className="text-blue-500 text-2xl">#{params?.id}</span>
            </Link>
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderSuccessPage1;
