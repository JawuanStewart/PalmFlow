"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Order, OrderStatus } from "@/store/orderSlice";

type OrdersTableProps = {
  orders: Order[];
  onStatusChange: (
    orderId: string,
    status: OrderStatus
  ) => void;
};

export default function OrdersTable({
  orders,
  onStatusChange,
}: OrdersTableProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(
    null
  );

  const statuses: OrderStatus[] = [
    "Pending",
    "Processing",
    "Shipped",
    "Completed",
  ];

  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="px-6 py-4 font-medium">Order</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {order.id}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {order.customer}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {order.product}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {order.date}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ${order.amount.toFixed(2)}
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

                <td className="relative px-6 py-4 text-right">
                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === order.id
                          ? null
                          : order.id
                      )
                    }
                    className="rounded-lg p-2 hover:bg-gray-100"
                  >
                    <MoreVertical
                      size={18}
                      className="text-gray-500"
                    />
                  </button>

                  {openMenu === order.id && (
                    <div className="absolute right-6 top-12 z-20 w-44 rounded-lg border border-gray-200 bg-white py-2 text-left shadow-lg">
                      <p className="px-4 py-2 text-xs font-medium uppercase text-gray-400">
                        Change Status
                      </p>

                      {statuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            onStatusChange(
                              order.id,
                              status
                            );
                            setOpenMenu(null);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                            status === order.status
                              ? "font-semibold text-gray-900"
                              : "text-gray-600"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}