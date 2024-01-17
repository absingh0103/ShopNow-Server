import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/productSlice';
import authReducer from "../features/Auth/AuthSlice"
import cartReducer from "../features/Cart/CartSlice"
import orderReducer from "../features/Orders/ordersSlice"
import userReducer from "../features/User/userSlice"
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart:cartReducer,
    order: orderReducer,
    user:userReducer,
  },
});
