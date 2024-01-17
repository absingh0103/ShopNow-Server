import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Modals from "../../../pages/ModalPage";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  clearSelectedProduct,
  createNewProductAsync,
  fetchProductsByIdAsync,
  selectAllBrands,
  selectAllCategories,
  selectProductById,
  updateProductAsync,
} from "../../product-list/productSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProductEditForm = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  const selectedProduct = useSelector(selectProductById);
  const [openModal, setOpenModal] = useState(null);
  const params = useParams();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const colors = [
    {
      name: "White",
      class: "bg-white",
      selectedClass: "ring-gray-400",
      id: "white",
    },
    {
      name: "Gray",
      class: "bg-gray-200",
      selectedClass: "ring-gray-400",
      id: "gray",
    },
    {
      name: "Black",
      class: "bg-gray-900",
      selectedClass: "ring-gray-900",
      id: "black",
    },
  ];
  const sizes = [
    { name: "XXS", inStock: true, id: "xxs" },
    { name: "XS", inStock: true, id: "xs" },
    { name: "S", inStock: true, id: "s" },
    { name: "M", inStock: true, id: "m" },
    { name: "L", inStock: true, id: "l" },
    { name: "XL", inStock: true, id: "xl" },
    { name: "2XL", inStock: true, id: "2xl" },
    { name: "3XL", inStock: true, id: "3xl" },
  ];

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductsByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("details", selectedProduct.details);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("highlights1", selectedProduct.highlights[0]);
      setValue("highlights2", selectedProduct.highlights[1]);
      setValue("highlights3", selectedProduct.highlights[2]);
      setValue(
        "sizes",
        selectedProduct.sizes.map((size) => size.id)
      );
      setValue(
        "colors",
        selectedProduct.colors.map((color) => color.id)
      );
    }
  }, [selectedProduct, dispatch, params.id]);

  // to delete product we just set a new field as true
  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
    toast.info("Product deleted", {
      position: "top-center",
      theme: "colored",
      pauseOnHover: false,
      autoClose: 1500,
    });
  };

  return (
    <>
      <div>
        {selectedProduct && (
          <Modals
            title={`Delete ${selectedProduct.title} `}
            message="Are you sure you want to delete this product?"
            dangerOption="Delete"
            cancleOption="Cancel"
            cancleAction={(e) => setOpenModal(null)}
            dangerAction={handleDelete}
            showModal={openModal}
          ></Modals>
        )}
        <form
          noValidate
          onSubmit={handleSubmit((data) => {
            // here we Add Product

            const product = { ...data };
            product.images = [
              product.image1,
              product.image2,
              product.image3,
              product.thumbnail,
            ];
            product.highlights = [
              product.highlights1,
              product.highlights2,
              product.highlights3,
            ];
            if (product.colors) {
              product.colors = product.colors.map((color) =>
                colors.find((clr) => clr.id === color)
              );
            }
            if (product.sizes) {
              product.sizes = product.sizes.map((size) =>
                sizes.find((sz) => sz.id === size)
              );
            }
            delete product.highlights1;
            delete product.highlights2;
            delete product.highlights3;
            delete product.image1;
            delete product.image2;
            delete product.image3;
            product.rating = 0;
            // to conver into String
            product.price = +product.price;
            product.stock = +product.stock;
            product.rating = +product.rating;
            product.discountPercentage = +product.discountPercentage;
            if (params.id) {
              // here product do not contains id hence we need to pass id with it also
              // so that it will update only that product
              product.id = params.id;
              // to prevent From change in rating while update of product
              product.rating = selectedProduct.rating || 0;
              dispatch(updateProductAsync(product));
              toast.info("Product details updated", {
                position: "top-center",
                theme: "colored",
                pauseOnHover: false,
                autoClose: 1500,
              });
              reset();
            } else {
              dispatch(createNewProductAsync(product));
              toast.info("New product Added", {
                position: "top-center",
                theme: "colored",
                pauseOnHover: false,
                autoClose: 1500,
              });
              reset();
            }
          })}
        >
          <div className="space-y-12 p-6 bg-gradient-to-r from-rose-100 to-teal-100 -mt-12 lg:p-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-xl font-bold leading-7 text-gray-900">
                {params.id ? "Edit Product Details" : "Add Product Details"}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This Product will be displayed publicly so be careful.
              </p>
              {selectedProduct && selectedProduct.deleted && (
                <p className="text-rose-600 -mb-5 text-xl font-bold">
                  Product Deleted
                </p>
              )}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Product Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="text"
                        {...register("title", {
                          required: "Name is required",
                        })}
                        id="title"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.title && (
                    <span className="text-red-600">{errors.title.message}</span>
                  )}
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      {...register("description", {
                        required: "Description is required",
                      })}
                      rows={3}
                      className="block w-full bg-gradient-to-r from-rose-100 to-teal-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write Product description.
                  </p>
                  {errors.description && (
                    <span className="text-red-600">
                      {errors.description.message}
                    </span>
                  )}
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Brand
                  </label>
                  <div className="mt-2">
                    <select
                      {...register("brand", {
                        required: "Brand is required",
                      })}
                      className="block bg-rose-50 rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">--choose brand--</option>
                      {brands.map((brand) => (
                        <option value={brand.label}>{brand.label}</option>
                      ))}
                    </select>
                  </div>
                  {errors.brand && (
                    <span className="text-red-600">{errors.brand.message}</span>
                  )}
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    category
                  </label>
                  <div className="mt-2">
                    <select
                      {...register("category", {
                        required: "Category is required",
                      })}
                      className="block bg-rose-50 rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">--choose category--</option>
                      {categories.map((category) => (
                        <option value={category.label}>{category.label}</option>
                      ))}
                    </select>
                  </div>
                  {errors.category && (
                    <span className="text-red-600">
                      {errors.category.message}
                    </span>
                  )}
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="colors"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Colors
                  </label>
                  <div className="mt-2">
                    {colors.map((color) => (
                      <>
                        <input
                          type="checkbox"
                          {...register("colors", {})}
                          key={color.id}
                          value={color.id}
                        />{" "}
                        {color.name}
                      </>
                    ))}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="sizes"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Sizes
                  </label>
                  <div className="mt-2">
                    {sizes.map((size) => (
                      <>
                        <input
                          type="checkbox"
                          {...register("sizes", {})}
                          key={size.id}
                          value={size.id}
                        />{"  "}
                        {size.name}
                      </>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="number"
                        {...register("price", {
                          required: "Price is required. Range(1 - 10,000,00)",
                          min: 1,
                          max: 1000000,
                        })}
                        id="price"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.price && (
                    <span className="text-red-600">{errors.price.message}</span>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="discountPercentage"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Discount Percentage
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="number"
                        {...register("discountPercentage", {
                          required: "Discount Percentage is required",
                          min: 0,
                          max: 100,
                        })}
                        id="discountPercentage"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.discountPercentage && (
                    <span className="text-red-600">
                      {errors.discountPercentage.message}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Stock
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="number"
                        {...register("stock", {
                          required: "Stock is required (non-negative)",
                          min: 0,
                        })}
                        id="stock"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.stock && (
                    <span className="text-red-600">{errors.stock.message}</span>
                  )}
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Thumbnail
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="text"
                        {...register("thumbnail", {
                          required: "Thumbnail is required",
                        })}
                        id="thumbnail"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.thumbnail && (
                    <span className="text-red-600">
                      {errors.thumbnail.message}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="image1"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Image 1
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="text"
                        {...register("image1", {
                          required: "Image1 is required",
                        })}
                        id="image1"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.image1 && (
                    <span className="text-red-600">
                      {errors.image1.message}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="image2"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Image 2
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="text"
                        {...register("image2", {
                          required: "Image2 is required",
                        })}
                        id="image2"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.image2 && (
                    <span className="text-red-600">
                      {errors.image2.message}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="image3"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Image 3
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="text"
                        {...register("image3", {
                          required: "Image3 is required",
                        })}
                        id="image3"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.image3 && (
                    <span className="text-red-600">
                      {errors.image3.message}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="highlights1"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Highlights-1
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="text"
                        {...register("highlights1", {
                          required: "Highlights is required",
                        })}
                        id="highlights1"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.highlights1 && (
                    <span className="text-red-600">
                      {errors.highlights1.message}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="highlights2"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Highlights-2
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="text"
                        {...register("highlights2", {
                          required: "Highlights is required",
                        })}
                        id="highlights2"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.highlights2 && (
                    <span className="text-red-600">
                      {errors.highlights2.message}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="highlights3"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Highlights-3
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="text"
                        {...register("highlights3", {
                          required: "Highlights is required",
                        })}
                        id="highlights3"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="details"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Details
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="details"
                      {...register("details", {
                        required: "Details is required",
                      })}
                      rows={3}
                      className="block w-full bg-gradient-to-r from-rose-100 to-teal-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write Product details.
                  </p>
                  {errors.details && (
                    <span className="text-red-600">
                      {errors.details.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

          </div>

          <div className=" pb-3  bg-gradient-to-r from-rose-100 to-teal-100 flex items-center justify-end gap-x-6">
            <Link
              to="/admin"
              replace={true}
              className="text-sm  font-semibold leading-6 text-gray-900"
            >
              Cancel
            </Link>
            {/* To delete product we actually do not delete the product we just set a new value in that product as deleted product there might be data of that product required later */}
            {selectedProduct && !selectedProduct.deleted && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModal(true);
                }}
                className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white  hover:bg-gradient-to-br focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-md text-sm px-3 py-2.5 text-center  "
              >
                Delete
              </button>
            )}

            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white mr-4 hover:bg-gradient-to-br focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-md text-sm px-3 py-2.5 text-center  "
            >
              Save Product
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

// To delete product we actually do not delete the product we just set a new value in that product as deleted product there might be data of that product required later

export default AdminProductEditForm;
