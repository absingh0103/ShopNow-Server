import React from "react";
import { Link, Navigate } from "react-router-dom";

// Here We Use React-hook-Form to create and Manipulate Form
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  loginUserAsync,
  selectError,
  selectLoggedInUser,
  selectStatus,
} from "../AuthSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLoadingPage from "../../Loader/AuthLoadingPage";




const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectLoggedInUser);
  const loginStatus = useSelector(selectStatus);
 
  const error = useSelector(selectError);
  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}

      <div className="relative">
        {loginStatus === "loading" ? <AuthLoadingPage /> : null}
        <section className="bg-gradient-to-r from-rose-200 to-teal-200  -mt-12 ">
          <div className="flex flex-col items-center justify-center px-2 py-8 mx-auto md:h-screen lg:py-0">
            <Link
              to="/"
              className="flex items-center mb-6 text-3xl font-bold font-mono text-gray-900 "
            >
              <img className="w-10 h-8 mr-2" src="./AuthIcon.png" alt="logo" />
              ShopNow
            </Link>
            <div className="w-full bg-gradient-to-r from-rose-100 to-teal-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    dispatch(
                      loginUserAsync({
                        email: data.email,
                        password: data.password,
                      })
                    );
                    reset();
                    
                  })}
                >
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "email is required",
                        pattern: {
                          value:
                            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                          message: "email not valid",
                        },
                      })}
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="name@company.com"
                      required=""
                    />
                    {errors.email && (
                      <span className="text-red-600">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      required=""
                    />{" "}
                    {errors.password && (
                      <span className="text-red-600">
                        {errors.password.message}
                      </span>
                    )}
                    {error && (
                      <span className="text-red-600  ml-1">
                        {error || error.message}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label for="remember" className="text-gray-500 ">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-primary-600 hover:underline "
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 bg-primary-600 hover:hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500 ">
                    Don't have an account yet?
                    <Link
                      to="/signup"
                      className="font-medium ml-1 text-primary-600 hover:underline "
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <ToastContainer />
        </section>
      </div>
    </>
  );
};

export default Login;
