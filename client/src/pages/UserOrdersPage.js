import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import EmptyOrders from "../features/Orders/EmptyOrders";
import UserOrders from "../features/User/components/UserOrders";
import { selectCompleteUserInfo } from "../features/User/userSlice";
import { selectCompleteUserOrder } from "../features/User/userSlice";
import { fetchUserOrdersAsync } from "../features/User/userSlice";
const UserOrdersPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOrdersAsync());
  }, [dispatch]);
  const userorders = useSelector(selectCompleteUserOrder);
  const user = useSelector(selectCompleteUserInfo);
  return (
    <>
      {user && userorders.length > 0 ? (
        <div>
          <div>
            <header className="bg-gradient-to-r from-rose-200 to-teal-200 shadow -mt-12 ">
              <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold font-serif tracking-tight text-rose-600">
                  My{" "}
                  <span className="text-4xl font-extrabold text-rose-700">
                    Orders
                  </span>
                  <img
                    src="./orders.png"
                    alt="order"
                    className="h-12 w-20 -ml-2 mb-2 animate-pulse  inline"
                  />
                </h1>
              </div>
            </header>
          </div>
          <UserOrders></UserOrders>
        </div>
      ) : (
        <EmptyOrders />
      )}
    </>
  );
};

export default UserOrdersPage;
