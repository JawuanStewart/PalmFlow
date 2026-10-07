import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

const initialState: Product[] = [
  {
    id: "PF-001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    stock: 42,
  },
  {
    id: "PF-002",
    name: "Smart Watch",
    category: "Electronics",
    price: 249.99,
    stock: 18,
  },
  {
    id: "PF-003",
    name: "Running Shoes",
    category: "Footwear",
    price: 89.99,
    stock: 7,
  },
  {
    id: "PF-004",
    name: "Leather Backpack",
    category: "Accessories",
    price: 74.99,
    stock: 25,
  },
  {
    id: "PF-005",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 59.99,
    stock: 0,
  },
  {
    id: "PF-006",
    name: "Classic Hoodie",
    category: "Clothing",
    price: 54.99,
    stock: 31,
  },
];

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },

    deleteProduct: (state, action: PayloadAction<string>) => {
      return state.filter((product) => product.id !== action.payload);
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id,
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    hydrateProducts: (state, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
  },
});

export const { addProduct, deleteProduct, updateProduct, hydrateProducts } =
  productSlice.actions;

export default productSlice.reducer;
