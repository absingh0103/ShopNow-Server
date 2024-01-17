import React, { useEffect } from "react";

import {
  Route,
  Routes,
 
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Home from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import EmptyCartPage from "./pages/EmptyCartPage";
import CheckoutPage from "./pages/CheckoutPage";
import NavBarPage from "./pages/NavBarPage";
import FooterPage from "./pages/FooterPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Protected from "./features/Auth/componenets/Protected";
import Error404page from "./pages/Error404page";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import Logout from "./features/Auth/componenets/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedAdmin from "./features/Auth/componenets/ProtectedAdmin";
import AdminHomePage from "./pages/AdminHomePage";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import AdminProductEditFormPage from "./pages/AdminProductEditFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedInUser,
  checkUserAsync,
  selectUserChecked,
} from "./features/Auth/AuthSlice";
import { fetchCartItemsByUserIdAsync } from "./features/Cart/CartSlice";
import {
  fetchLoggedInUserAsync,
} from "./features/User/userSlice";
import StripeCheckout from "./pages/StripeCheckout";



function App() {
  // Fetch Items By user id is dispatche at top level APP Level As with User Login it will get the no of products in Cart and update the  cart Badge
  // ! selectLoggedInUser  Conatins TOKEN Not User id or role
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked=useSelector(selectUserChecked)
  

  useEffect(() => {
    dispatch(checkUserAsync());
  }, [dispatch]);

  
  useEffect(() => {
    if (user) {
      //! IMPORTANT: Now We dont Need to pass User ID (user.id) as in Backend It will take loggedIn User Id Automatically from req.user and Then Add to Api Call.Hence From Frontend we just need to hit on paticular Api Path without user Id
      dispatch(fetchCartItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
      

    }
  }, [dispatch,user]);
  // We can Also Add Navbar in One by one page rather than writing Like this
  return (
    <>
      <NavBarPage />

      {userChecked && (
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/empty-cart" element={<EmptyCartPage />} />
          <Route
            path="/checkout"
            element={
              <Protected>
                <CheckoutPage />
              </Protected>
            }
          />

          <Route
            path="/cart"
            element={
              <Protected>
                <CartPage />
              </Protected>
            }
          />
          <Route
            path="/orders"
            element={
              <Protected>
                <UserOrdersPage />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <UserProfilePage />
              </Protected>
            }
          />
          <Route
            path="/stripe-checkout"
            element={
              <Protected>
                <StripeCheckout />
              </Protected>
            }
          />
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <AdminHomePage />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/product-details/:id"
            element={
              <ProtectedAdmin>
                <AdminProductDetailsPage />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/product-form"
            element={
              <ProtectedAdmin>
                <AdminProductEditFormPage />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/product-form/edit/:id"
            element={
              <ProtectedAdmin>
                <AdminProductEditFormPage />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/order"
            element={
              <ProtectedAdmin>
                <AdminOrdersPage />
              </ProtectedAdmin>
            }
          />
          {/* Admin Routes end*/}

          <Route path="/product-details/:id" element={<ProductDetailsPage />} />

          <Route path="/order-success/:id" element={<OrderSuccessPage />} />

          <Route path="*" element={<Error404page />} />
        </Routes>
      )}

      <FooterPage />
    </>
  );
}

export default App;
