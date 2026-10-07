"use client";

import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteProduct, Product } from "@/store/productSlice";
import { AppDispatch } from "@/store/store";

type ProductsTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
};

export default function ProductsTable({
  products,
  onEdit,
}: ProductsTableProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleDelete = (product: Product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (confirmed) {
      dispatch(deleteProduct(product.id));
      setOpenMenu(null);
    }
  };

  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="px-6 py-4 font-medium">
                Product
              </th>

              <th className="px-6 py-4 font-medium">
                Category
              </th>

              <th className="px-6 py-4 font-medium">
                Price
              </th>

              <th className="px-6 py-4 font-medium">
                Stock
              </th>

              <th className="px-6 py-4 font-medium">
                Status
              </th>

              <th className="px-6 py-4 font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const status =
                product.stock === 0
                  ? "Out of Stock"
                  : product.stock < 10
                  ? "Low Stock"
                  : "In Stock";

              return (
                <tr
                  key={product.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        {product.id}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.stock}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        status === "In Stock"
                          ? "bg-green-100 text-green-700"
                          : status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="relative px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === product.id
                            ? null
                            : product.id
                        )
                      }
                      className="rounded-lg p-2 hover:bg-gray-100"
                    >
                      <MoreVertical
                        size={18}
                        className="text-gray-500"
                      />
                    </button>

                    {openMenu === product.id && (
                      <div className="absolute right-6 top-12 z-20 w-40 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg">
                        <button
                          onClick={() => {
                            onEdit(product);
                            setOpenMenu(null);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Pencil size={16} />
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(product)
                          }
                          className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

