import React from "react";
import { Link, Navigate } from "react-router-dom";
// Here We Use React-hook-Form to create and Manipulate Form
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  resetPasswordRequestAsync,
  selectError,
  selectLoggedInUser,
  selectMailSent,
  selectStatus,
} from "../AuthSlice";
import AuthLoadingPage from "../../Loader/AuthLoadingPage";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const MailSent = useSelector(selectMailSent);
  const error = useSelector(selectError);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectLoggedInUser);
const mailSentStatus=useSelector(selectStatus)
  return (
    <>
      <div className="relative">
        {mailSentStatus === "loading" ? <AuthLoadingPage/> : null}
        <section className="bg-gradient-to-r from-rose-200 to-teal-200 -mt-12 ">
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
                  Enter email to reset Password
                </h1>
                <p className="text-sm  font-medium text-gray-600 ">
                  Enter the email address associated with your Ecomm account.
                </p>
                <form
                  className="space-y-4 md:space-y-6"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    dispatch(resetPasswordRequestAsync(data.email));
                  
                  })}
                >
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Enter Your email
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
                    {error && !errors.email && !MailSent &&(
                      <span className="text-red-600  ml-1">
                        {"Email not associated with ShopNow account" || error.message}
                      </span>
                    )}
                    {MailSent &&(
                      <span className="text-green-600">
                        Mail Send. Check your Email
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 bg-primary-600 hover:hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Send
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
    </>
  );
};

export default ForgotPassword;
