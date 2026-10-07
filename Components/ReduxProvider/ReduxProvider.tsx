"use client";

import { useEffect, useRef } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { hydrateProducts } from "@/store/productSlice";
import { hydrateOrders } from "@/store/orderSlice";
import { hydrateCustomers } from "@/store/customerSlice";

type ReduxProviderProps = {
  children: React.ReactNode;
};

function ReduxPersistence({ children }: ReduxProviderProps) {
  const dispatch = useDispatch();
  const hasHydrated = useRef(false);

  useEffect(() => {
    const savedProducts = localStorage.getItem("palmflow-products");

    const savedOrders = localStorage.getItem("palmflow-orders");

    const savedCustomers = localStorage.getItem("palmflow-customers");

    if (savedProducts) {
      dispatch(hydrateProducts(JSON.parse(savedProducts)));
    }

    if (savedOrders) {
      dispatch(hydrateOrders(JSON.parse(savedOrders)));
    }

    if (savedCustomers) {
      dispatch(hydrateCustomers(JSON.parse(savedCustomers)));
    }

    hasHydrated.current = true;
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      if (!hasHydrated.current) {
        return;
      }

      const state = store.getState();

      localStorage.setItem("palmflow-products", JSON.stringify(state.products));

      localStorage.setItem("palmflow-orders", JSON.stringify(state.orders));

      localStorage.setItem(
        "palmflow-customers",
        JSON.stringify(state.customers),
      );
    });

    return unsubscribe;
  }, []);

  return <>{children}</>;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <ReduxPersistence>{children}</ReduxPersistence>
    </Provider>
  );
}
