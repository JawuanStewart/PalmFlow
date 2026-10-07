"use client";

import { useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RootState } from "@/store/store";

export default function SalesChart() {
  const orders = useSelector(
    (state: RootState) => state.orders
  );

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

  const salesData = months.map((month) => {
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
      0
    );

    return {
      month,
      revenue,
    };
  });

  const totalRevenue = orders.reduce(
    (total, order) => total + order.amount,
    0
  );

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Sales Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Revenue generated from customer orders
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400">
            Total Revenue
          </p>

          <p className="text-xl font-bold text-gray-900">
            ${totalRevenue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      <div className="h-72 sm:h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={salesData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                `$${value}`
              }
            />

            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`,
                "Revenue",
              ]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#111827"
              fill="#e5e7eb"
              strokeWidth={2}
              activeDot={{
                r: 5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}