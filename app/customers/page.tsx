"use client";

import { useState } from "react";
import { Filter, Search, UserPlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "@/Components/Sidebar/Sidebar";
import CustomersTable from "@/Components/CustomersTable/CustomersTable";
import AddCustomerModal from "@/Components/AddCustomerModal/AddCustomerModal";
import {
  CustomerStatus,
  deleteCustomer,
  updateCustomerStatus,
} from "@/store/customerSlice";
import { AppDispatch, RootState } from "@/store/store";

export default function CustomersPage() {
  const dispatch = useDispatch<AppDispatch>();

  const customers = useSelector((state: RootState) => state.customers);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = (customerId: string, status: CustomerStatus) => {
    dispatch(
      updateCustomerStatus({
        customerId,
        status,
      }),
    );
  };

  const handleDelete = (customerId: string) => {
    dispatch(deleteCustomer(customerId));
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      customer.name.toLowerCase().includes(searchValue) ||
      customer.email.toLowerCase().includes(searchValue) ||
      customer.id.toLowerCase().includes(searchValue);

    const matchesFilter =
      filter === "all" || customer.status.toLowerCase() === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Customers
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              View and manage your store customers.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 sm:w-auto"
          >
            <UserPlus size={18} />
            Add Customer
          </button>
        </div>

        {/* Search + Filter */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:mt-8">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm">
            <Search size={20} className="shrink-0 text-gray-400" />

            <input
              type="text"
              placeholder="Search customers..."
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
              <option value="all">All Customers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Result Count */}
        <div className="mb-3 mt-5">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-700">
              {filteredCustomers.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-700">
              {customers.length}
            </span>{" "}
            customers
          </p>
        </div>

        {/* Customers Table */}
        <CustomersTable
          customers={filteredCustomers}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />

        {/* Add Customer Modal */}
        <AddCustomerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </section>
    </main>
  );
}
