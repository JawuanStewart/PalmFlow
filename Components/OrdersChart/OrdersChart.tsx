"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Order } from "@/store/orderSlice";

type OrdersChartProps = {
  orders: Order[];
};

export default function OrdersChart({ orders }: OrdersChartProps) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const ordersData = months.map((month) => {
    const monthOrders = orders.filter((order) => {
      const orderDate = new Date(order.date);

      return (
        orderDate.toLocaleString("en-US", {
          month: "short",
        }) === month
      );
    });

    return {
      month,
      orders: monthOrders.length,
    };
  });

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Orders</h2>

        <p className="text-sm text-gray-500">Number of orders received</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ordersData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="orders" fill="#111827" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
