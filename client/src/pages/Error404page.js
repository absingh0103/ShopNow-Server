// src/components/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

const Error404page = () => {
  return (
    <div class="bg-gradient-to-r from-rose-200 to-teal-200 -mt-12">
      <div class="w-auto  m-auto py-16 min-h-screen flex items-center justify-center">
        <div class="bg-gradient-to-r from-rose-100 to-teal-100 shadow overflow-hidden sm:rounded-lg pb-8">
          <div class="border-t border-gray-200 font-mono text-center pt-8">
            <h1 class="text-9xl  font-bold text-purple-500 ">
              404
              <img
                src="../error1.png"
                alt="error"
                className="h-32  w-28 ml-1 inline"
              />
            </h1>

            <h1 class="text-6xl font-medium py-8 text-rose-500">
              oops! Page not found
            </h1>
            <p class="text-2xl pb-8 px-12 font-medium">
              Oops! The page you are looking for does not exist. It might have
              been moved or deleted.
            </p>
            <Link
              to="/"
              replace={true}
              class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6"
            >
              HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404page;
