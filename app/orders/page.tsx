"use client";

import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "@/Components/Sidebar/Sidebar";
import OrdersTable from "@/Components/OrdersTable/OrdersTable";
import { OrderStatus, updateOrderStatus } from "@/store/orderSlice";
import { AppDispatch, RootState } from "@/store/store";

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>();

  const orders = useSelector((state: RootState) => state.orders);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    dispatch(
      updateOrderStatus({
        orderId,
        status,
      }),
    );
  };

  const filteredOrders = orders.filter((order) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(searchValue) ||
      order.customer.toLowerCase().includes(searchValue) ||
      order.product.toLowerCase().includes(searchValue);

    const matchesFilter =
      filter === "all" || order.status.toLowerCase() === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Orders
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage and track customer orders.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:mt-8">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm">
            <Search size={20} className="shrink-0 text-gray-400" />

            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm">
            <Filter size={18} className="shrink-0 text-gray-500" />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full cursor-pointer bg-white text-sm font-medium text-gray-700 outline-none sm:w-auto"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Result Count */}
        <div className="mb-3 mt-5">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-700">
              {filteredOrders.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-700">{orders.length}</span>{" "}
            orders
          </p>
        </div>

        {/* Orders Table */}
        <OrdersTable
          orders={filteredOrders}
          onStatusChange={handleStatusChange}
        />
      </section>
    </main>
  );
}
