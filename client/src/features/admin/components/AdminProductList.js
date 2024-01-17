import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchBrandsAsync,
  fetchCategeriesAsync,
  fetchProductsByFiltersAsync,
  selectAllBrands,
  selectAllCategories,
  selectAllProduct,
  selectTotalItems,
} from "../../product-list/productSlice";
import TextEffect1 from "./FeaturedProducts";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import { ITEMS_PER_PAGE } from "../../../app/Constant";
import { selectLoggedInUser } from "../../Auth/AuthSlice";

const sortOptions = [
  { name: "Most Popular", sort: "rating", order: "desc", current: false },
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  {
    name: "Price: Low to High",
    sort: "discountPrice",
    order: "asc",
    current: false,
  },
  {
    name: "Price: High to Low",
    sort: "discountPrice",
    order: "desc",
    current: false,
  },
];
const subCategories = [
  { name: "GTA V", link: "/admin/product-details/65298c848b828516f07d2dce" },
  {
    name: "MacBook Pro",
    link: "/admin/product-details/65298c848b828516f07d2d6f",
  },
  { name: "iphone X", link: "/admin/product-details/65298c848b828516f07d2d6b" },
  { name: "Watch", link: "/admin/product-details/65298c848b828516f07d2da8" },
  { name: "Handbag", link: "/admin/product-details/65298c848b828516f07d2db1" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminProductList = () => {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // to get All Products
  const products = useSelector(selectAllProduct);
  const totalItems = useSelector(selectTotalItems);
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  // Filter Object
  // We Need to Create Api For these
  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
  ];

  // Passing Filter Object

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const user = useSelector(selectLoggedInUser);

  // to handle Filter Click
  const handleFilter = (e, section, option) => {
  

    const newFilter = { ...filter };

    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      // to delete from filter from array
      const index = newFilter[section.id].findIndex(
        (element) => element === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
    // Here we need to pass filter as variable=newFilter as setFilter do not Update Filter object Immediately. it works Asynchronously
  };

  // Handle Sort Product Click
  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };
  // To handle Pagination
  const handlePage = (page) => {
    setPage(page);
  };

  // Action Dispatched for All/filtered Products
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(
      fetchProductsByFiltersAsync({ filter, sort, pagination, admin: true })
    );
  }, [dispatch, filter, sort, page]);

  // to reset page=1 whenever we select any Filter of choose any sort
  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  // to fetch all brands and categories on page Load
  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategeriesAsync());
  }, []);

  return (
    <div>
      {user && (
        <div>
          <div className="bg-gradient-to-r from-rose-100 to-teal-100 shadow mb-10">
            <div>
              {/* Mobile filter dialog */}
              <MobileFilterComponenet
                handleFilter={handleFilter}
                mobileFiltersOpen={mobileFiltersOpen}
                setMobileFiltersOpen={setMobileFiltersOpen}
                filters={filters}
              ></MobileFilterComponenet>
              {/* Mobile Filter Ends */}

              <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  ">
                <div className="flex items-baseline justify-between border-b  border-gray-300 pb-6 pt-14">
                  <h1 className="text-3xl lg:text-5xl cursor-pointer font-bold font-mono tracking-tight text-rose-600 ">
                    ShopNow
                    <img
                      src="../AuthIcon.png"
                      alt=""
                      className="w-10 h-8 ml-3 inline animate-bounce"
                    />
                  </h1>

                  <div className="flex items-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                          Sort
                          <ChevronDownIcon
                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1 cursor-pointer">
                            {sortOptions.map((option) => (
                              <Menu.Item key={option.name}>
                                {({ active }) => (
                                  <p
                                    onClick={(e) => handleSort(e, option)}
                                    className={classNames(
                                      option.current
                                        ? "font-medium text-gray-900"
                                        : "text-gray-500",
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    {option.name}
                                  </p>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    <button
                      type="button"
                      className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                    >
                      <span className="sr-only">View grid</span>
                      <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                      onClick={() => setMobileFiltersOpen(true)}
                    >
                      <span className="sr-only">Filters</span>
                      <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <section
                  aria-labelledby="products-heading"
                  className="pb-24 pt-6"
                >
                  <h2 id="products-heading" className="sr-only">
                    Products
                  </h2>

                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Desktop Filters */}
                    <DesktopFilterComponenet
                      handleFilter={handleFilter}
                      filters={filters}
                    ></DesktopFilterComponenet>
                    {/* Desktop Filter Ends Here */}
                    <div className="lg:col-span-3">
                      <div>
                        <Link
                          to="/admin/product-form"
                          type="submit"
                          className="rounded-md bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 px-3 py-2.5 text-center mr-2 mb-2 lg:ml-3 mt-1  text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                        >
                          Add New Product
                        </Link>
                      </div>
                      {/* Product grid start */}
                      <ProductGridComponenet
                        products={products}
                      ></ProductGridComponenet>
                    </div>
                    {/* Product Grid Componenet Ends */}
                  </div>
                </section>
                {/* Pagination componenet start*/}
                <PaginationComponenet
                  page={page}
                  setPage={setPage}
                  handlePage={handlePage}
                  totalItems={totalItems}
                ></PaginationComponenet>
                {/* Pagination componenet ends Here */}
              </main>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Coomponenets of Page

const MobileFilterComponenet = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) => {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-gradient-to-r from-rose-100 to-teal-100 py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-teal-200 p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t  border-gray-200 bg-gradient-to-r from-rose-100 to-teal-100">
                <h3 className="sr-only">Categories</h3>

                <ul
                  role="list"
                  className="px-2 py-3 bg-gradient-to-r from-rose-100 to-teal-100 font-medium text-gray-900"
                >
                  <p className="text-rose-500 font-bold font-mono text-xl animate-pulse  ">
                    Fetaured Products
                  </p>
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <Link
                        to={category.link}
                        className="block text-sm text-orange-500 px-2 py-1"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 bg-gradient-to-r from-rose-100 to-teal-100 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-gradient-to-r from-rose-100 to-teal-100 px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const DesktopFilterComponenet = ({ handleFilter, filters }) => {
  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>
      <ul
        role="list"
        className="space-y-4 border-b  border-gray-200 pb-6 text-sm font-medium text-gray-900"
      >
        <TextEffect1 />
        {subCategories.map((category) => (
          <li key={category.name}>
            <Link
              to={category.link}
              className="block text-sm text-orange-500 px-2 py-1"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>

      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b bg-rose-100 rounded-md border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-rose-100 rounded-md py-3 text-sm text-gray-600 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6 ">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => handleFilter(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
};

const ProductGridComponenet = ({ products }) => {
  return (
    <div className="lg:col-span-3">
      {/* Producct List Component Start */}
      {
        <div className="bg-gradient-to-r from-rose-50 to-teal-50 rounded-md pb-3">
          <div className="mx-auto max-w-2xl px-4 py-1  sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {products && 
                products.map((product) => (
                  <div>
                    <Link to={`/admin/product-details/${product.id}`}>
                      <div
                        key={product.id}
                        className="group relative border-solid border-2 border-gray-300 rounded-xl p-1"
                      >
                        <div className="bg-gray-300 rounded-xl">
                          <div className=" min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-70 lg:h-80">
                            <img
                              src={product.thumbnail}
                              alt={product.category}
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full "
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <a href={product.thumbnail}>
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                {product.title}
                              </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              <StarIcon className="w-6 h-6 text-orange-600 inline" />
                              <span className="align-bottom ml-1">
                                {product.rating}
                              </span>
                            </p>
                            {product.deleted && (
                              <p className="mt-1 text-base font-medium line-through text-red-500 align-bottom ">
                                {" "}
                                deleted product
                              </p>
                            )}
                            {product.stock <= 0 && (
                              <p className="mt-1 text-base font-medium  text-red-500 align-bottom ">
                                {" "}
                                Out of Stock
                              </p>
                            )}
                          </div>
                          <div>
                            {" "}
                            <p className="text-sm font-medium text-gray-900">
                              ${product.discountPrice}
                            </p>
                            <p className="text-sm font-medium text-gray-500 line-through">
                              ${product.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    {/* Button To edit Product By Admin */}
                    <div>
                      <Link to={`/admin/product-form/edit/${product.id}`}>
                        <button className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-gray-100 hover:bg-gradient-to-br focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-md text-sm px-3 py-2.5 text-center mt-2 ">
                          Edit product
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

const PaginationComponenet = ({ handlePage, page, setPage, totalItems }) => {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="flex items-center -mb-10 justify-between border-t border-gray-200 bg-gradient-to-r from-rose-100 to-teal-100 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex cursor-pointer items-center bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-md text-sm px-4 py-2 text-center mr-2  "
        >
          Previous
        </div>
        <div
          onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
          className="relative ml-3 inline-flex cursor-pointer items-center bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-6 py-2 text-center "
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
                    ? "text-black bg-rose-500 rounded-sm "
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

export default AdminProductList;
