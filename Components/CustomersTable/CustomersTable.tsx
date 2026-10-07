"use client";

import { useState } from "react";
import { MoreVertical, Eye, Power, Trash2 } from "lucide-react";
import { Customer, CustomerStatus } from "@/store/customerSlice";

type CustomersTableProps = {
  customers: Customer[];
  onStatusChange: (customerId: string, status: CustomerStatus) => void;
  onDelete: (customerId: string) => void;
};

export default function CustomersTable({
  customers,
  onStatusChange,
  onDelete,
}: CustomersTableProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleDelete = (customer: Customer) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${customer.name}"?`,
    );

    if (confirmed) {
      onDelete(customer.id);
      setOpenMenu(null);
    }
  };

  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Orders</th>
              <th className="px-6 py-4 font-medium">Total Spent</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-medium text-gray-700">
                      {customer.name.charAt(0)}
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">
                        {customer.name}
                      </p>

                      <p className="text-xs text-gray-400">{customer.id}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {customer.email}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {customer.orders}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ${customer.spent.toFixed(2)}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>

                <td className="relative px-6 py-4 text-right">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === customer.id ? null : customer.id)
                    }
                    className="rounded-lg p-2 hover:bg-gray-100"
                  >
                    <MoreVertical size={18} className="text-gray-500" />
                  </button>

                  {openMenu === customer.id && (
                    <div className="absolute right-6 top-12 z-20 w-48 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg">
                      <button
                        onClick={() => {
                          alert(
                            `${customer.name}\n\nEmail: ${customer.email}\nOrders: ${customer.orders}\nTotal Spent: $${customer.spent.toFixed(
                              2,
                            )}`,
                          );
                          setOpenMenu(null);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Eye size={16} />
                        View Customer
                      </button>

                      <button
                        onClick={() => {
                          onStatusChange(
                            customer.id,
                            customer.status === "Active"
                              ? "Inactive"
                              : "Active",
                          );
                          setOpenMenu(null);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Power size={16} />

                        {customer.status === "Active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>

                      <button
                        onClick={() => handleDelete(customer)}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {customers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
