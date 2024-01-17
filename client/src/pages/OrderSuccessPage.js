import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { selectLoggedInUser } from "../features/Auth/AuthSlice";
import { resetCartAsync } from "../features/Cart/CartSlice";
import { resetOrder } from "../features/Orders/ordersSlice";

const OrderSuccessPage = () => {
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
  }, [dispatch, user]);

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <div>
        <section className="bg-gradient-to-r from-rose-200 to-teal-200  -mt-12 ">
          <div className="flex flex-col items-center justify-center px-2 py-8 mx-auto md:h-screen lg:py-0">
            <div class="flex items-center justify-center h-screen">
              <div class="p-1 rounded shadow-lg bg-gradient-to-r from-purple-500 via-green-500 to-blue-500">
                <div class="flex flex-col items-center p-10 lg:px-18 lg:py-20   space-y-2 bg-gradient-to-r from-rose-100 to-teal-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-green-600 w-28 h-28"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h1 class="text-4xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                    Thank You !
                  </h1>
                  <p className="text-sm lg:text-lg">
                    Thank you for your order! Check your email or Click on order
                    id:
                    <Link to="/orders" replace={true}>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500 text-2xl">
                        #{params?.id}
                      </span>
                    </Link>{" "}
                    to track your order .
                  </p>
                  <Link to="/" replace={true}>
                  <button class="inline-flex items-center px-4 py-3 text-white bg-indigo-600 border border-indigo-600  rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 h-3 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                      />
                    </svg>
                    <span class="text-sm font-medium">Home</span>
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OrderSuccessPage;
