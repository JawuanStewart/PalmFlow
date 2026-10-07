"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/products",
    icon: Package,
  },
  {
    name: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-20 shrink-0 bg-gray-900 p-3 text-white sm:w-56 sm:p-4 lg:w-64">
      {/* Logo */}
      <Link href="/" className="mb-8 block">
        <h1 className="text-center text-xl font-bold sm:text-left sm:text-2xl">
          <span className="sm:hidden">PF</span>
          <span className="hidden sm:inline">PalmFlow</span>
        </h1>

        <p className="mt-1 hidden text-sm text-gray-400 sm:block">
          Commerce Management
        </p>
      </Link>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.name}
              className={`group flex w-full items-center justify-center gap-3 rounded-lg px-3 py-3 transition-all duration-200 sm:justify-start sm:px-4 ${
                isActive
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={20} className="shrink-0" />

              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
