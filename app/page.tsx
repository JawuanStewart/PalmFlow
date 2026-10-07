"use client";

import { useSelector } from "react-redux";
import Sidebar from "@/Components/Sidebar/Sidebar";
import StatCard from "@/Components/StatCard/StatCard";
import SalesChart from "@/Components/SalesChart/SalesChart";
import RecentOrders from "@/Components/RecentOrders/RecentOrders";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react";
import { RootState } from "@/store/store";

export default function Home() {
  const products = useSelector(
    (state: RootState) => state.products
  );

  const orders = useSelector(
    (state: RootState) => state.orders
  );

  const customers = useSelector(
    (state: RootState) => state.customers
  );

  // Product stats
  const totalProducts = products.length;

  const totalInventory = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  const lowStockProducts = products.filter(
    (product) =>
      product.stock > 0 && product.stock < 10
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  ).length;

  // Order stats
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (total, order) => total + order.amount,
    0
  );

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "Pending" ||
      order.status === "Processing"
  ).length;

  const averageOrderValue =
    totalOrders > 0
      ? totalRevenue / totalOrders
      : 0;

  // Customer stats
  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  return (
    <main className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
  <div className="mx-auto max-w-[1600px]">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Welcome back to PalmFlow.
          </p>
        </div>

        {/* Main Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-6">
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}`}
            change={`${completedOrders} completed orders`}
            icon={DollarSign}
          />

          <StatCard
            title="Total Orders"
            value={totalOrders.toString()}
            change={`${pendingOrders} currently pending`}
            icon={ShoppingCart}
          />

          <StatCard
            title="Customers"
            value={totalCustomers.toString()}
            change={`${activeCustomers} active customers`}
            icon={Users}
          />

          <StatCard
            title="Products"
            value={totalProducts.toString()}
            change={`${totalInventory} units in inventory`}
            icon={Package}
          />
        </div>

        {/* Sales Chart */}
        <div className="mt-6 lg:mt-8">
          <SalesChart />
        </div>

        {/* Recent Orders */}
        <div className="mt-6 lg:mt-8">
          <RecentOrders />
        </div>

        {/* Inventory / Order Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-6">
          <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm text-gray-500">
              Average Order Value
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              ${averageOrderValue.toFixed(2)}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Revenue divided by total orders
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm text-gray-500">
              Low Stock Products
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {lowStockProducts}
            </h2>

            <p className="mt-2 text-sm text-yellow-600">
              Products with less than 10 units
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm text-gray-500">
              Out of Stock
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {outOfStockProducts}
            </h2>

            <p className="mt-2 text-sm text-red-600">
              Products that need restocking
            </p>
          </div>
        </div>
        </div>
      </section>
    </main>
  );
}