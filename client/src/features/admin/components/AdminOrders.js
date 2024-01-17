// to Manage and display all the users orders
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from "../../../app/Constant";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  PencilIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import {
  fetchAllOrdersAsync,
  selectTotalOrders,
  selectOrder,
  updateOrderAsync,
} from "../../Orders/ordersSlice";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const orders = useSelector(selectOrder);
  const totalOrders = useSelector(selectTotalOrders);
  const handleShow = (order) => {};
  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleUpadte = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };
  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-400 text-gray-700";

      case "dispatched":
        return "bg-lime-600 text-white";

      case "delivered":
        return "bg-green-400 text-white";

      case "cancelled":
        return "bg-red-600 text-white";
      default:
        return "bg-yellow-400 text-white";
    }
  };

  const handlePage = (page) => {
    setPage(page);
  };

  // Handle Sort Product Click
  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };

  // Action Dispatched
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort, editableOrderId]);

  return (
    <div className="-mt-12 bg-gradient-to-r from-rose-200 to-teal-200  ">
      <div className="overflow-x-auto mx-auto max-w-7xl">
        <div className=" flex items-center justify-center from-rose-200 to-teal-200 font-sans overflow-x-scroll">
          <div className="w-full ">
            <div className="bg-gradient-to-r from-rose-100 to-teal-100 shadow-md rounded my-6">
              <table className=" w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-black uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      /*  from Here we pass a object which contains sortOption={sort: "id",order: sort?.order === "asc" ? "desc" : "asc",} 
                      
                      Sort order logic is by default it is in asc and on click of order Number if changes to asc and desc
                      */
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order Number
                      {sort._sort === "id" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline ml-1 mb-1" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline ml-1 mb-1" />
                        ))}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      /*  from Here we pass a object which contains sortOption={sort: "id",order: sort?.order === "asc" ? "desc" : "asc",} 
                      
                      Sort order logic is by default it is in asc and on click of order Number if changes to asc and desc
                      */
                      onClick={(e) =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Total Amount
                      {sort._sort === "totalAmount" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline ml-1 mb-1" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline ml-1 mb-1" />
                        ))}
                    </th>
                    <th
                      className="py-3 px-6 text-center"
                      onClick={(e) =>
                        handleSort({
                          sort: "createdAt",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order At
                      {sort._sort === "createdAt" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline ml-1 mb-1" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline ml-1 mb-1" />
                        ))}
                    </th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                    <th
                      className="py-3 px-6 text-center"
                      onClick={(e) =>
                        handleSort({
                          sort: "updatedAt",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Last Update
                      {sort._sort === "updatedAt" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline ml-1 mb-1" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline ml-1 mb-1" />
                        ))}
                    </th>
                  </tr>
                </thead>

                {/* Table */}

                <tbody className="text-gray-800 text-sm ">
                  {orders.map((order) => (
                    <tr className="border-b border-gray-300  hover:bg-orange-200 ">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-semibold text-blue-400">
                            {order.id}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-0 text-left">
                        {order.cartItems.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 mt-1 rounded-full"
                                src={item.product.thumbnail}
                                alt={item.product.title}
                              />
                            </div>
                            <span className="text-black font-sans font-medium">
                              {item.product.title} - Q ({item.quantity}) - $
                              {item.product.discountPrice}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center text-black font-sans font-medium justify-center">
                          $ {order.totalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center text-black font-sans font-medium text-xs justify-center">
                          {new Date(order.createdAt).toLocaleString()}
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
                        <span className=" text-purple-600 py-1 px-3 rounded-full text-xs">
                          <div>
                            {" "}
                            <strong>{order.selectedAddress.name}</strong>
                          </div>
                          <div> {order.selectedAddress.email}</div>
                          <div> {order.selectedAddress.phone}</div>
                          <div> {order.selectedAddress.city}</div>
                          <div> {order.selectedAddress.state}</div>
                          <div> {order.selectedAddress.pinCode}</div>
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editableOrderId ? (
                          <select
                            className="rounded-md bg-orange-200 font-mono"
                            onChange={(e) => handleUpadte(e, order)}
                          >
                            <option value="pending">pending</option>
                            <option value="dispatched">dispatched</option>
                            <option value="delivered">delivered</option>
                            <option value="cancelled">cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${statusColor(
                              order.status
                            )} py-2 px-3 rounded-full `}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center ">
                          <div className="w-6 mr-4 cursor-pointer transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon onClick={(e) => handleShow(order)} />
                          </div>
                          <div className="w-6 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon onClick={(e) => handleEdit(order)} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center text-black font-sans font-medium text-xs justify-center">
                          {new Date(order.updatedAt).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <PaginationComponenet
          handlePage={handlePage}
          page={page}
          totalItems={totalOrders}
          setPage={setPage}
        ></PaginationComponenet>
      </div>
    </div>
  );
};

const PaginationComponenet = ({ handlePage, page, setPage, totalItems }) => {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-gradient-to-r from-rose-100 to-teal-100 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex cursor-pointer items-center rounded-md border border-orange-300 bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-600"
        >
          Previous
        </div>
        <div
          onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
          className="relative ml-3 inline-flex cursor-pointer items-center rounded-md border border-orange-300 bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-600"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            {/* ForMula To Show Page No. */}
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to
            {/* Out of How Many Pages */}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>

            {/* Create An Array of Size of Particular length  */}
            {/* For Example if There are 55 items then 55/10=6(length of array)
which Means Each page Contains 6 items  */}
            {Array.from({ length: totalPages }).map((pge, index) => (
              <div
                onClick={(e) => handlePage(index + 1)}
                aria-current="page"
                className={`relative z-10 inline-flex cursor-pointer items-center${
                  index + 1 === page
                    ? "text-black bg-orange-600 rounded-sm "
                    : "text-gray-400 bg-gradient-to-r from-rose-50 to-teal-100"
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
