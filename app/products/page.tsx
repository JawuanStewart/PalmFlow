"use client";

import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import Sidebar from "@/Components/Sidebar/Sidebar";
import ProductsTable from "@/Components/ProductsTable/ProductsTable";
import AddProductModal from "@/Components/AddProductModal/AddProductModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Product } from "@/store/productSlice";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const products = useSelector((state: RootState) => state.products);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    let matchesFilter = true;

    if (filter === "in-stock") {
      matchesFilter = product.stock >= 10;
    }

    if (filter === "low-stock") {
      matchesFilter = product.stock > 0 && product.stock < 10;
    }

    if (filter === "out-of-stock") {
      matchesFilter = product.stock === 0;
    }

    return matchesSearch && matchesFilter;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setIsModalOpen(false);
    setEditingProduct(product);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <main className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Products
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Manage your store products and inventory.
            </p>
          </div>

          <button
            onClick={handleAddProduct}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 sm:w-auto"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {/* Search + Filter */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:mt-8">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm">
            <Search size={20} className="shrink-0 text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
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
              <option value="all">All Products</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Result Count */}
        <div className="mb-3 mt-5">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-700">
              {filteredProducts.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-700">{products.length}</span>{" "}
            products
          </p>
        </div>

        {/* Products Table */}
        <ProductsTable products={filteredProducts} onEdit={handleEditProduct} />

        {/* Modal */}
        <AddProductModal
          isOpen={isModalOpen || editingProduct !== null}
          onClose={handleCloseModal}
          product={editingProduct}
        />
      </section>
    </main>
  );
}
