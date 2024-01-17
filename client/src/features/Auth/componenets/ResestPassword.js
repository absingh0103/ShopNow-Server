import React from "react";
import { Link } from "react-router-dom";
// Here We Use React-hook-Form to create and Manipulate Form
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  selectError,
  selectPasswordReset,
  resetPasswordAsync,
  selectStatus,
} from "../AuthSlice";
import AuthLoadingPage from "../../Loader/AuthLoadingPage";

const ResestPassword = () => {
  const dispatch = useDispatch();
  
  const passwordReset = useSelector(selectPasswordReset);
  const error = useSelector(selectError);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // to get Token And Email from reset-password Link
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
const resetStatus=useSelector(selectStatus)
  return (
    <>
      {email && token ? (
        <div className="relative">
          {resetStatus === "loading" ? <AuthLoadingPage /> : null}
          <section className="bg-gradient-to-r from-rose-200 to-teal-200 -mt-12 ">
            <div className="flex flex-col items-center justify-center px-2 py-8 mx-auto md:h-screen lg:py-0">
              <Link
                to="/"
                className="flex items-center mb-6 text-3xl font-bold font-mono text-gray-900 "
              >
                <img
                  className="w-10 h-8 mr-2"
                  src="./AuthIcon.png"
                  alt="logo"
                />
                ShopNow
              </Link>
              <div className="w-full bg-gradient-to-r from-rose-100 to-teal-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Reset Password
                  </h1>
                  <p className="text-sm  font-medium text-gray-600 ">
                    Enter New Password
                  </p>
                  <form
                    className="space-y-4 md:space-y-6"
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      dispatch(
                        resetPasswordAsync({
                          email,
                          token,
                          password: data.password,
                        })
                      );
                     
                      // Will Do Implemention when We Connect Email System
                    })}
                  >
                    <div>
                      <label
                        for="password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        New Password
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
                      {error && !passwordReset && (
                        <span className="text-red-600  ml-1">
                          {error || error.message}
                        </span>
                      )}

                      {passwordReset && (
                        <span className="text-green-600">
                          Password reset successfully
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 bg-primary-600 hover:hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      reset password
                    </button>
                    <p className="text-sm -ml-5 text-center font-light text-gray-500 ">
                      return to &rarr;
                      <Link
                        to="/login"
                        className="font-medium ml-1 text-center text-primary-600 hover:underline "
                      >
                        Sign in
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <p className="m-auto text-center font-extrabold text-4xl mb-10 ">
          Invalid URL...
        </p>
      )}
    </>
  );
};

export default ResestPassword;
