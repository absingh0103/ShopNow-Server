import React, { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
  UserIcon,
  UserCircleIcon,
  
} from "@heroicons/react/24/outline";
import { selectCartItems } from "../Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCompleteUserInfo } from "../User/userSlice"; 
import { fetchSearchedProductsAsync } from "../product-list/productSlice";


const navigation = [
  { name: "ShopNow", link: "/", user: true },
  { name: "Orders", link: "/orders", user: true },
  { name: "Admin", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/order", admin: true },
];
const Guestnavigation = [
  { name: "ShopNow", link: "/", guest: true },
  { name: "SignIn", link: "/login", guest: true },
];

const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign in", link: "/login" },
];
const userAuthNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = ({ children }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
 const user = useSelector(selectCompleteUserInfo);
  const [input, setInput] = useState("");
  // for List of searched items

  const handleSearch = (value) => {
    
    setInput(value);
    dispatch(fetchSearchedProductsAsync(value));
  }; 
 

  
  return (
    <>
      <div className="min-h-full relative">
        {/* Chane ackground to gray or white Gradient */}
        <Disclosure
          as="nav"
          className="bg-gradient-to-tl from-red-300 via-red-400 to-yellow-300"
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4  lg:px-8 ">
                <div className="flex h-16 lg:h-20 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 ">
                      <a href="/">
                        <img
                          className="h-10 w-12 lg:h-10 lg:w-15 rounded-full focus:ring-2 hover:ring-red-200 hover:ring-offset-2 hover:ring-offset-red-300"
                          src="./Logo1.jpg"
                          alt="ShopNow"
                        />
                      </a>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {user
                          ? navigation.map((item) =>
                              item[user?.role] ? (
                                <Link
                                  key={item.name}
                                  to={item.link}
                                  className=" text-black rounded-md px-3 py-2 text-base font-semibold  hover:bg-gray-900 active:bg-gray-900 active:text-white focus:bg-gray-900 focus:text-white focus:outline-none focus:ring focus:ring-gray-300 hover:text-white"
                                >
                                  {item.name}
                                </Link>
                              ) : null
                            )
                          : Guestnavigation.map((item) => (
                              <Link
                                key={item.name}
                                to={item.link}
                                className=" text-black rounded-md px-3 py-2 text-base font-semibold  hover:bg-gray-900 active:bg-gray-900 active:text-white focus:bg-gray-900 focus:text-white focus:outline-none focus:ring focus:ring-gray-300 hover:text-white"
                              >
                                {item.name}
                              </Link>
                            ))}
                      </div>
                    </div>
                  </div>
                  {/* Search bar */}

                  {/* TODO: Implemet Search using select and reference from amazon */}
                  
                  <div className="">
                    <form className="flex w-full ">
                      <div class="flex">
                        <label
                          for="search-dropdown"
                          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                          Search
                        </label>
                        <button
                          id="dropdown-button"
                          data-dropdown-toggle="dropdown"
                          class="flex-shrink-0 z-10 inline-flex items-center px-1  lg:py-2 lg:px-4 text-xs font-medium lg:text-sm lg:font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                          type="button"
                        >
                          All categories
                        </button>
                        <div class="relative w-auto">
                          <input
                            type="search"
                            id="search-dropdown"
                            className=" -mr-8 md:mr-12 lg:mr-40 flex px-1 lg:p-2.5  w-full z-20 text-xs font-medium lg:text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-1 border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-orange-500"
                            placeholder="Search Mockups, Logos, Design Templates..."
                            required
                            value={input}
                            onChange={(e) => handleSearch(e.target.value)}
                            onClick={(e) => handleSearch(e.target.value)}
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 pt-1 lg:p-2.5 flex text-xs  lg:text-sm font-medium h-full text-white bg-orange-500 rounded-r-lg border border-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-400 dark:hover:bg-orange-700 dark:focus:ring-orange-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-6 lg:w-6 lg:h-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span class="sr-only">Search</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* Search Bar end*/}

                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <div>
                        <Link to="/cart">
                          <button
                            type="button"
                            className="relative rounded-full bg- px-1 py-2 text-black hover:text-blue-500 focus:outline-none "
                          >
                            <span className="absolute -inset-1.5" />

                            <ShoppingCartIcon
                              className="h-7 w-10 "
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                      </div>
                      {cartItems.length > 0 ? (
                        <span className="inline-flex items-center rounded-md mb-4 -ml-2 bg-white px-2 py-1 text-xs font-medium text-rose-600 ring-1 ring-inset ring-red-600/10">
                          {cartItems.length}
                          <span class="relative flex h-2 w-2 ml-1">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                          </span>
                        </span>
                      ) : null}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center hover:text-cyan-700 rounded-full text-sm ">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            {user ? (
                              <UserCircleIcon className="h-10 w-9 animate-pulse text-blue-600" />
                            ) : (
                              <UserIcon className="h-7 w-8 " />
                            )}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {user ? userAuthNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            )) : userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            )) }
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-orange-500 p-2 text-white hover:bg-orange-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 focus:ring-offset-red-300">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {user
                    ? navigation.map((item) =>
                        item[user?.role] ? (
                          <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-900 hover:text-white">
                            <Link key={item.name} to={item.link}>
                              {item.name}
                            </Link>
                          </Disclosure.Button>
                        ) : null
                      )
                    : Guestnavigation.map((item) => (
                        <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-900 hover:text-white">
                          <Link key={item.name} to={item.link}>
                            {item.name}
                          </Link>
                        </Disclosure.Button>
                      ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0 cursor-pointer">
                      {user ? (
                        <UserCircleIcon className="h-10 w-9 animate-pulse text-blue-600" />
                      ) : (
                        <Link to="/login">
                          <UserIcon className="h-7 w-8 hover:text-blue-600" />
                        </Link>
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user?.name}
                      </div>
                      {user ? (
                        <div className="text-sm font-medium leading-none text-blue-400">
                          {user.email}
                        </div>
                      ) : (
                        <div className="text-sm font-medium leading-none text-blue-400">
                          Guest User
                        </div>
                      )}
                    </div>
                    <div className="relative ml-auto">
                      <Link to="/cart">
                        <button
                          type="button"
                          className="relative rounded-full bg- px-1 py-2 text-black hover:text-blue-500 focus:outline-none "
                        >
                          <span className="absolute -inset-1.5" />

                          <ShoppingCartIcon
                            className="h-6 w-10 "
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                    </div>
                    {cartItems.length > 0 ? (
                      <span className="inline-flex items-center rounded-md mb-4 -ml-2 bg-white px-2 py-1 text-xs font-medium text-rose-600 ring-1 ring-inset ring-red-600/10">
                        {cartItems.length}
                        <span class="relative flex h-2 w-2 ml-1">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {user ? userAuthNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        className="block rounded-md px-3 py-2 text-base cursor-pointer font-medium text-black hover:bg-gray-700 hover:text-white"
                      >
                        <Link
                          to={item.link}
                          className="block rounded-md px-3 py-2 text-base cursor-pointer font-medium text-black hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      </Disclosure.Button>
                    )) : userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        className="block rounded-md px-3 py-2 text-base cursor-pointer font-medium text-black hover:bg-gray-700 hover:text-white"
                      >
                        <Link
                          to={item.link}
                          className="block rounded-md px-3 py-2 text-base cursor-pointer font-medium text-black hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* navbar dash */}
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};
export default NavBar;
