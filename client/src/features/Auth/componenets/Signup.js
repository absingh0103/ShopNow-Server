// TODO:Add Name Field to Form

import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Here We Use React-hook-Form to create and Manipulate Form
// https://react-hook-form.com/docs/
import { useForm } from "react-hook-form";
import {
  selectLoggedInUser,
  createUserAsync,
  selectStatus,
} from "../AuthSlice";
import AuthLoadingPage from "../../Loader/AuthLoadingPage";

const Signup = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const signupStatus = useSelector(selectStatus);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="relative">
        {signupStatus === "loading" ? <AuthLoadingPage /> : null}
        <section className="bg-gradient-to-r from-rose-200 to-teal-200 -mt-12">
          <div className="flex flex-col items-center justify-center px-2 py-8 mx-auto md:h-screen lg:py-0">
            <Link
              to="/"
              className="flex items-center mb-6 text-3xl font-bold font-mono text-gray-900 "
            >
              <img className="w-10 h-8 mr-2" src="./AuthIcon.png" alt="logo" />
              ShopNow
            </Link>
            <div className="w-full bg-gradient-to-r from-rose-100 to-teal-100  rounded-lg shadow dark:border md:mt-0 sm:max-w-md  xl:p-0 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold  text-center leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  SignUp
                </h1>
                <form
                  noValidate
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit((data) => {
                    dispatch(
                      createUserAsync({
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        addresses: [],
                      })
                    );
                    reset();
                    
                  })}
                >
                  <div>
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      // repalce name with this Syntax
                      {...register("name", {
                        required: "name is required",
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message: "Name must be greter than 2 char",
                        },
                      })}
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Abhishek"
                      required=""
                    />
                    {errors.name && (
                      <span className="text-red-600">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      // repalce name with this Syntax
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
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                          message: `- At least 8 characters. Contains at least 1 uppercase letter, 1 lowercase letter, and 1 number, Can contain special characters`,
                        },
                      })}
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      required=""
                    />
                    {errors.password && (
                      <span className="text-red-600">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      for="Confirm_password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      {...register("Confirm_password", {
                        required: "Confirm password is required",
                        validate: (value, formValues) =>
                          value === formValues.password ||
                          "Password not matching",
                      })}
                      id="Confirm_password"
                      placeholder="same as above"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      required=""
                    />
                    {errors.Confirm_password && (
                      <span className="text-red-600">
                        {errors.Confirm_password.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 bg-primary-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Sign Up
                  </button>
                  <p className="text-sm font-light text-gray-500 ">
                    Already have an account?
                    <Link
                      to="/login"
                      className="font-medium text-primary-600 hover:underline  "
                    >
                      SignIn
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signup;
