import React from "react";
import { useSelector } from "react-redux";
import { selectSearchedProducts } from "../features/product-list/productSlice";
import { selectProductListStatus } from "../features/product-list/productSlice";


import { Link } from "react-router-dom";
import MainLoaderPage from "../features/Loader/MainLoaderPage";
const SearchProductPage = () => {
  const searchedProducts = useSelector(selectSearchedProducts);
  const searchedStatus = useSelector(selectProductListStatus);
  

  return (
    <>
      {searchedStatus === "loading" ? <MainLoaderPage /> : null}
      {searchedProducts.length > 0 ? (
        <div className="relative">
          <div className="-mt-12 pt-2  bg-gradient-to-r from-rose-100 to-teal-100  ">
            <div className="overflow-x-auto mx-auto max-w-7xl ">
              <ul class="grid grid-rows-3 grid-flow-col gap-4 bg-gradient-to-r from-rose-100 to-teal-100 p-4 ">
                {searchedProducts &&
                  searchedProducts.map((product) => (
                    <Link
                      className="border-gray-400 flex flex-row"
                      to={`/product-details/${product.id}`}
                    >
                      <li class="border-gray-400 flex flex-row mb-2">
                        <div class="select-none cursor-pointer bg-gradient-to-r from-rose-200 to-teal-200 rounded-md flex flex-1 items-center p-2  transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                          <div class="flex flex-col rounded-md w-14 h-10 bg-gradient-to-r from-rose-200 to-teal-200 justify-center items-center mr-4">
                            <img src={product.thumbnail} alt="?" />
                          </div>
                          <div class="flex-1 pl-3 mr-16">
                            <div class="font-medium">{product.title}</div>
                            <div class="text-gray-600 text-sm">
                              ${product.discountPrice}
                            </div>
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SearchProductPage;
