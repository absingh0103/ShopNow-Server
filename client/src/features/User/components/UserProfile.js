import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectCompleteUserInfo, updateUserAsync } from "../userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCompleteUserInfo);
  const [selectedAddressEditIndex, setSelectedAddressEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // to Remove Existing Address
  const handleRemove = (index) => {
  
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
    toast.info("Address removed", {
      position: "top-center",
      theme: "colored",
      pauseOnHover: false,
      autoClose: 1500,
    });
  };

  // to Edit Addresss
  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
   
    // Splice the Previous Address and Put a New Address
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedAddressEditIndex(-1);
    toast.info("Address updated", {
      position: "top-center",
      theme: "colored",
      pauseOnHover: false,
      autoClose: 1500,
    });
  };
  // to Open and Close Form Which is going to be edited on click of Edit btn
  const handleEditForm = (index) => {
    setSelectedAddressEditIndex(index);
    const address = user.addresses[index];

    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("country", address.country);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
  };
  // Add New Address
  const handleAddAddress = (address) => {
    const newUser = { ...user, addresses: [...user.addresses, address] };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };

  return (
    <>
      {user && (
        <div className="bg-gradient-to-r from-rose-200 to-teal-200  pt-2 pb-3">
          <div className="mx-auto max-w-7xl px-4 pt-5 pb-5  sm:px-6 lg:px-8 bg-gradient-to-r from-rose-100 to-teal-100 rounded-2xl ">
            <h1 className="text-4xl font-bold font-mono tracking-tight mb-8 text-rose-500 ">
              Name:<span className="text-blue-500 ">{user.name}</span>
            </h1>
            <h3 className="text-lg lg:text-xl font-bold font-mono tracking-tight -mt-5  text-red-500 ">
              email address: {user.email}
            </h3>
            {user.role === "admin" && (
              <h3 className="text-lg lg:text-xl font-bold font-mono tracking-tight   text-red-500 ">
                User : {user.role}
              </h3>
            )}
            <div className="border-t border-gray-200  px-4 py-4 sm:px-6 ">
              <button
                onClick={(e) => {
                  setShowAddAddressForm(true);
                  setSelectedAddressEditIndex(-1);
                }}
                type="submit"
                className="rounded-md bg-green-600 -ml-6 -mb-2  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Add new address
              </button>
              {/* Add New Address Form */}
              {showAddAddressForm ? (
                <form
                  className="bg-gradient-to-r from-rose-100 to-teal-100 rounded-lg px-8 py-10"
                  noValidate
                  onSubmit={handleSubmit((address) => {
                    handleAddAddress(address);
                    reset();
                  })}
                >
                  <div className="space-y-12">
                    <div>
                      <div className="border-b border-gray-900/10 pb-12">
                        <h1 className="text-2xl font-bold leading-7 text-black">
                          Personal Information
                        </h1>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Use a permanent address where you can receive mail.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Full name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("name", {
                                  required: "Name is required",
                                })}
                                id="name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {errors.name && (
                              <span className="text-red-600">
                                {errors.name.message}
                              </span>
                            )}
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                {...register("email", {
                                  required: "email is required",
                                })}
                                type="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {errors.email && (
                              <span className="text-red-600">
                                {errors.email.message}
                              </span>
                            )}
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Mobile No.
                            </label>
                            <div className="mt-2">
                              <input
                                id="phone"
                                {...register("phone", {
                                  required: "Mobile Number is required",
                                })}
                                type="tel"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {errors.phone && (
                              <span className="text-red-600">
                                {errors.phone.message}
                              </span>
                            )}
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Country
                            </label>
                            <div className="mt-2">
                              <select
                                id="country"
                                {...register("country", {
                                  required: "Country is required",
                                })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                              >
                                <option>India</option>
                                <option>United States</option>
                                <option>Canada</option>
                                <option>United Kingdom</option>
                                <option>Russia</option>
                              </select>
                            </div>
                            {errors.country && (
                              <span className="text-red-600">
                                {errors.country.message}
                              </span>
                            )}
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="street"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Street address
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("street", {
                                  required: "Street address is required",
                                })}
                                id="street"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {errors.street && (
                              <span className="text-red-600">
                                {errors.street.message}
                              </span>
                            )}
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("city", {
                                  required: "City  is required",
                                })}
                                id="city"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {errors.city && (
                              <span className="text-red-600">
                                {errors.city.message}
                              </span>
                            )}
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="state"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              State / Province
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("state", {
                                  required: "State  is required",
                                })}
                                id="state"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {errors.state && (
                              <span className="text-red-600">
                                {errors.state.message}
                              </span>
                            )}
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="pinCode"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("pinCode", {
                                  required: "Pin-Code  is required",
                                })}
                                id="pinCode"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {errors.pinCode && (
                              <span className="text-red-600">
                                {errors.pinCode.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="button"
                          className="text-sm font-semibold leading-6 text-gray-900 hover:border-solid border-b p-1"
                          onClick={(e) => setShowAddAddressForm(false)}
                        >
                          cancle
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Add Address
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : null}
            </div>
            <div className="flex justify-between  font-mono text-lg font-bold text-blue-500">
              <p>Shipping Address: </p>
            </div>
            {user.addresses.map((address, index) => (
              <div>
                {/* Edit Existing Address Form */}
                {selectedAddressEditIndex === index ? (
                  <form
                    className="bg-gradient-to-r from-rose-100 to-teal-100 rounded-lg px-8 py-10"
                    noValidate
                    onSubmit={handleSubmit((addressUpdate) => {
                      handleEdit(addressUpdate, index);
                      reset();
                    })}
                  >
                    <div className="space-y-12">
                      <div>
                        <div className="border-b border-gray-900/10 pb-12">
                          <h1 className="text-2xl font-bold leading-7 text-black">
                            Personal Information
                          </h1>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Use a permanent address where you can receive mail.
                          </p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Full name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("name", {
                                    required: "Name is required",
                                  })}
                                  id="name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {errors.name && (
                                <span className="text-red-600">
                                  {errors.name.message}
                                </span>
                              )}
                            </div>

                            <div className="sm:col-span-4">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  {...register("email", {
                                    required: "email is required",
                                  })}
                                  type="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {errors.email && (
                                <span className="text-red-600">
                                  {errors.email.message}
                                </span>
                              )}
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Mobile No.
                              </label>
                              <div className="mt-2">
                                <input
                                  id="phone"
                                  {...register("phone", {
                                    required: "Mobile Number is required",
                                  })}
                                  type="tel"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {errors.phone && (
                                <span className="text-red-600">
                                  {errors.phone.message}
                                </span>
                              )}
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Country
                              </label>
                              <div className="mt-2">
                                <select
                                  id="country"
                                  {...register("country", {
                                    required: "Country is required",
                                  })}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option>India</option>
                                  <option>United States</option>
                                  <option>Canada</option>
                                  <option>United Kingdom</option>
                                  <option>Russia</option>
                                </select>
                              </div>
                              {errors.country && (
                                <span className="text-red-600">
                                  {errors.country.message}
                                </span>
                              )}
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="street"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("street", {
                                    required: "Street address is required",
                                  })}
                                  id="street"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {errors.street && (
                                <span className="text-red-600">
                                  {errors.street.message}
                                </span>
                              )}
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("city", {
                                    required: "City  is required",
                                  })}
                                  id="city"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {errors.city && (
                                <span className="text-red-600">
                                  {errors.city.message}
                                </span>
                              )}
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="state"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("state", {
                                    required: "State  is required",
                                  })}
                                  id="state"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {errors.state && (
                                <span className="text-red-600">
                                  {errors.state.message}
                                </span>
                              )}
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="pinCode"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("pinCode", {
                                    required: "Pin-Code  is required",
                                  })}
                                  id="pinCode"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {errors.pinCode && (
                                <span className="text-red-600">
                                  {errors.pinCode.message}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900 hover:border-solid border-b p-1"
                            onClick={(e) => setSelectedAddressEditIndex(-1)}
                          >
                            cancle
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Save Address
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : null}
                <div className="flex justify-between mt-2 px-5 gap-x-6  py-4 border-solid border-2 border-gray-200 rounded-xl">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-lg font-semibold font-mono leading-6 text-sky-600">
                        Name:{address.name}
                      </p>
                      <p className="mt-1 truncate text-base  font-normal leading-5 text-sky-500">
                        email : {address.email}
                      </p>
                      <p className="mt-1 truncate text-base font-normal leading-5 text-sky-500">
                        street : {address.street}
                      </p>
                      <p className="mt-1 truncate text-base font-normal leading-5 text-sky-500">
                        country : {address.country}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-base leading-6 text-sky-500 font-normal">
                      Phone : {address.phone}
                    </p>
                    <p className="text-base leading-6 text-sky-500 font-normal">
                      pin-Code : {address.pinCode}
                    </p>
                    <p className="text-base leading-6 text-sky-500 font-normal">
                      state : {address.state}
                    </p>
                  </div>
                  <div className="shrink-0  flex flex-col items-end ">
                    <button
                      type="button"
                      className="font-medium  text-blue-500 hover:text-blue-700 "
                      onClick={(e) => handleEditForm(index)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="font-medium  text-rose-500 hover:text-rose-700"
                      onClick={(e) => handleRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default UserProfile;
