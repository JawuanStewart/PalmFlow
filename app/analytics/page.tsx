"use client";

import { useSelector } from "react-redux";
import Sidebar from "@/Components/Sidebar/Sidebar";
import RevenueChart from "@/Components/RevenueChart/RevenueChart";
import OrdersChart from "@/Components/OrdersChart/OrdersChart";
import { RootState } from "@/store/store";

export default function AnalyticsPage() {
  const orders = useSelector((state: RootState) => state.orders);

  const customers = useSelector((state: RootState) => state.customers);

  const totalRevenue = orders.reduce((total, order) => total + order.amount, 0);

  const totalOrders = orders.length;

  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const returningCustomers = customers.filter(
    (customer) => customer.orders > 1,
  ).length;

  const returningCustomerRate =
    customers.length > 0 ? (returningCustomers / customers.length) * 100 : 0;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed",
  ).length;

  const completionRate =
    totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;

  return (
    <main className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Analytics
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Track your store performance and business growth.
          </p>
        </div>

        {/* Analytics Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-6">
          <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm text-gray-500">Average Order Value</p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              ${averageOrderValue.toFixed(2)}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Based on {totalOrders} orders
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm text-gray-500">Order Completion Rate</p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {completionRate.toFixed(1)}%
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {completedOrders} completed orders
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm text-gray-500">Returning Customers</p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {returningCustomerRate.toFixed(1)}%
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {returningCustomers} returning customers
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:mt-8 lg:grid-cols-2 lg:gap-6">
          <RevenueChart orders={orders} />
          <OrdersChart orders={orders} />
        </div>
      </section>
    </main>
  );
}
