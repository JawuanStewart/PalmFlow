"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function RecentOrders() {
  const orders = useSelector((state: RootState) => state.orders);

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>

          <p className="mt-1 text-sm text-gray-500">
            Your latest customer orders
          </p>
        </div>

        <Link
          href="/orders"
          className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Orders */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-175">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wide text-gray-400">
              <th className="px-6 py-4 font-medium">Order</th>

              <th className="px-6 py-4 font-medium">Customer</th>

              <th className="px-6 py-4 font-medium">Product</th>

              <th className="px-6 py-4 font-medium">Amount</th>

              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 last:border-0 transition hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900">
                    {order.id}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">
                    {order.customer}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{order.product}</span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900">
                    ${order.amount.toFixed(2)}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Processing"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Shipped"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}

            {recentOrders.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  No recent orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
