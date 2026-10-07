"use client";

import { useState } from "react";
import Sidebar from "@/Components/Sidebar/Sidebar";

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("PalmFlow Store");

  const [email, setEmail] = useState("admin@palmflow.com");

  const [currency, setCurrency] = useState("USD");

  const [notifications, setNotifications] = useState(true);

  const [lowStockAlerts, setLowStockAlerts] = useState(true);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <main className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Settings
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage your store preferences and account settings.
          </p>
        </div>

        <div className="mt-6 max-w-4xl space-y-5 lg:mt-8 lg:space-y-6">
          {/* Store Information */}
          <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Store Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Update your store's basic information.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Store Name
                </label>

                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Store Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Currency
                </label>

                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-500"
                >
                  <option value="USD">USD - US Dollar</option>

                  <option value="EUR">EUR - Euro</option>

                  <option value="GBP">GBP - British Pound</option>

                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose which notifications you want to receive.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-medium text-gray-900">
                    Email Notifications
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Receive updates about orders and store activity.
                  </p>
                </div>

                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    notifications ? "bg-gray-900" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      notifications ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-medium text-gray-900">Low Stock Alerts</p>

                  <p className="mt-1 text-sm text-gray-500">
                    Get notified when products are running low.
                  </p>
                </div>

                <button
                  onClick={() => setLowStockAlerts(!lowStockAlerts)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    lowStockAlerts ? "bg-gray-900" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      lowStockAlerts ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Account */}
          <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Account</h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your PalmFlow account.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-gray-900">Administrator</p>

                <p className="text-sm text-gray-500">admin@palmflow.com</p>
              </div>

              <button className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto">
                Change Password
              </button>
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="w-full rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 sm:w-auto"
            >
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
