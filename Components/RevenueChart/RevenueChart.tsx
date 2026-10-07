"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Order } from "@/store/orderSlice";

type RevenueChartProps = {
  orders: Order[];
};

export default function RevenueChart({ orders }: RevenueChartProps) {
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

  const revenueData = months.map((month) => {
    const monthOrders = orders.filter((order) => {
      const orderDate = new Date(order.date);

      return (
        orderDate.toLocaleString("en-US", {
          month: "short",
        }) === month
      );
    });

    const revenue = monthOrders.reduce(
      (total, order) => total + order.amount,
      0,
    );

    return {
      month,
      revenue,
    };
  });

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Revenue</h2>

        <p className="text-sm text-gray-500">Revenue generated from orders</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#111827"
              fill="#e5e7eb"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
