import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OrderStatus = "Completed" | "Processing" | "Shipped" | "Pending";

export type Order = {
  id: string;
  customer: string;
  product: string;
  date: string;
  amount: number;
  status: OrderStatus;
};

const initialState: Order[] = [
  {
    id: "#PF-1001",
    customer: "John Smith",
    product: "Wireless Headphones",
    date: "Oct 5, 2026",
    amount: 129.99,
    status: "Completed",
  },
  {
    id: "#PF-1002",
    customer: "Sarah Johnson",
    product: "Smart Watch",
    date: "Oct 4, 2026",
    amount: 249.99,
    status: "Processing",
  },
  {
    id: "#PF-1003",
    customer: "Mike Williams",
    product: "Running Shoes",
    date: "Oct 4, 2026",
    amount: 89.99,
    status: "Shipped",
  },
  {
    id: "#PF-1004",
    customer: "Emily Davis",
    product: "Leather Backpack",
    date: "Oct 3, 2026",
    amount: 74.99,
    status: "Completed",
  },
  {
    id: "#PF-1005",
    customer: "Chris Brown",
    product: "Bluetooth Speaker",
    date: "Oct 3, 2026",
    amount: 59.99,
    status: "Pending",
  },
  {
    id: "#PF-1006",
    customer: "Jessica Wilson",
    product: "Classic Hoodie",
    date: "Oct 2, 2026",
    amount: 54.99,
    status: "Completed",
  },
  {
    id: "#PF-1007",
    customer: "Daniel Miller",
    product: "Smart Watch",
    date: "Oct 1, 2026",
    amount: 249.99,
    status: "Shipped",
  },

  // September
  {
    id: "#PF-1008",
    customer: "John Smith",
    product: "Wireless Headphones",
    date: "Sep 24, 2026",
    amount: 129.99,
    status: "Completed",
  },
  {
    id: "#PF-1009",
    customer: "Sarah Johnson",
    product: "Leather Backpack",
    date: "Sep 18, 2026",
    amount: 74.99,
    status: "Completed",
  },
  {
    id: "#PF-1010",
    customer: "Emily Davis",
    product: "Smart Watch",
    date: "Sep 12, 2026",
    amount: 249.99,
    status: "Shipped",
  },

  // August
  {
    id: "#PF-1011",
    customer: "Mike Williams",
    product: "Running Shoes",
    date: "Aug 28, 2026",
    amount: 89.99,
    status: "Completed",
  },
  {
    id: "#PF-1012",
    customer: "Jessica Wilson",
    product: "Classic Hoodie",
    date: "Aug 21, 2026",
    amount: 54.99,
    status: "Completed",
  },
  {
    id: "#PF-1013",
    customer: "Daniel Miller",
    product: "Bluetooth Speaker",
    date: "Aug 15, 2026",
    amount: 59.99,
    status: "Shipped",
  },

  // July
  {
    id: "#PF-1014",
    customer: "John Smith",
    product: "Smart Watch",
    date: "Jul 25, 2026",
    amount: 249.99,
    status: "Completed",
  },
  {
    id: "#PF-1015",
    customer: "Emily Davis",
    product: "Wireless Headphones",
    date: "Jul 17, 2026",
    amount: 129.99,
    status: "Completed",
  },
  {
    id: "#PF-1016",
    customer: "Chris Brown",
    product: "Classic Hoodie",
    date: "Jul 9, 2026",
    amount: 54.99,
    status: "Pending",
  },

  // June
  {
    id: "#PF-1017",
    customer: "Sarah Johnson",
    product: "Running Shoes",
    date: "Jun 26, 2026",
    amount: 89.99,
    status: "Completed",
  },
  {
    id: "#PF-1018",
    customer: "Mike Williams",
    product: "Bluetooth Speaker",
    date: "Jun 14, 2026",
    amount: 59.99,
    status: "Shipped",
  },

  // May
  {
    id: "#PF-1019",
    customer: "Jessica Wilson",
    product: "Leather Backpack",
    date: "May 22, 2026",
    amount: 74.99,
    status: "Completed",
  },
  {
    id: "#PF-1020",
    customer: "Daniel Miller",
    product: "Smart Watch",
    date: "May 11, 2026",
    amount: 249.99,
    status: "Completed",
  },

  // April
  {
    id: "#PF-1021",
    customer: "John Smith",
    product: "Wireless Headphones",
    date: "Apr 23, 2026",
    amount: 129.99,
    status: "Completed",
  },
  {
    id: "#PF-1022",
    customer: "Emily Davis",
    product: "Running Shoes",
    date: "Apr 8, 2026",
    amount: 89.99,
    status: "Shipped",
  },

  // March
  {
    id: "#PF-1023",
    customer: "Sarah Johnson",
    product: "Classic Hoodie",
    date: "Mar 19, 2026",
    amount: 54.99,
    status: "Completed",
  },
  {
    id: "#PF-1024",
    customer: "Chris Brown",
    product: "Bluetooth Speaker",
    date: "Mar 7, 2026",
    amount: 59.99,
    status: "Completed",
  },

  // February
  {
    id: "#PF-1025",
    customer: "Mike Williams",
    product: "Leather Backpack",
    date: "Feb 24, 2026",
    amount: 74.99,
    status: "Completed",
  },
  {
    id: "#PF-1026",
    customer: "Jessica Wilson",
    product: "Smart Watch",
    date: "Feb 13, 2026",
    amount: 249.99,
    status: "Shipped",
  },

  // January
  {
    id: "#PF-1027",
    customer: "Daniel Miller",
    product: "Wireless Headphones",
    date: "Jan 28, 2026",
    amount: 129.99,
    status: "Completed",
  },
  {
    id: "#PF-1028",
    customer: "John Smith",
    product: "Running Shoes",
    date: "Jan 16, 2026",
    amount: 89.99,
    status: "Completed",
  },
];

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    updateOrderStatus: (
      state,
      action: PayloadAction<{
        orderId: string;
        status: OrderStatus;
      }>,
    ) => {
      const order = state.find((order) => order.id === action.payload.orderId);

      if (order) {
        order.status = action.payload.status;
      }
    },

    addOrder: (state, action: PayloadAction<Order>) => {
      state.unshift(action.payload);
    },

    deleteOrder: (state, action: PayloadAction<string>) => {
      return state.filter((order) => order.id !== action.payload);
    },

    hydrateOrders: (state, action: PayloadAction<Order[]>) => {
      return action.payload;
    },
  },
});

export const { updateOrderStatus, addOrder, deleteOrder, hydrateOrders } =
  orderSlice.actions;

export default orderSlice.reducer;