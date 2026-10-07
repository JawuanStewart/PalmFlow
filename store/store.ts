import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import orderReducer from "./orderSlice";
import customerReducer from "./customerSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    orders: orderReducer,
    customers: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
