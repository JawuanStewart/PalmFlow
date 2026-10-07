import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CustomerStatus = "Active" | "Inactive";

export type Customer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  status: CustomerStatus;
};

const initialState: Customer[] = [
  {
    id: "CUS-001",
    name: "John Smith",
    email: "john.smith@email.com",
    orders: 12,
    spent: 1248.87,
    status: "Active",
  },
  {
    id: "CUS-002",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    orders: 8,
    spent: 892.45,
    status: "Active",
  },
  {
    id: "CUS-003",
    name: "Mike Williams",
    email: "mike.williams@email.com",
    orders: 5,
    spent: 467.92,
    status: "Active",
  },
  {
    id: "CUS-004",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    orders: 15,
    spent: 1754.32,
    status: "Active",
  },
  {
    id: "CUS-005",
    name: "Chris Brown",
    email: "chris.brown@email.com",
    orders: 2,
    spent: 119.98,
    status: "Inactive",
  },
  {
    id: "CUS-006",
    name: "Jessica Wilson",
    email: "jessica.wilson@email.com",
    orders: 9,
    spent: 734.65,
    status: "Active",
  },
  {
    id: "CUS-007",
    name: "Daniel Miller",
    email: "daniel.miller@email.com",
    orders: 6,
    spent: 526.41,
    status: "Active",
  },
];

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.unshift(action.payload);
    },

    updateCustomerStatus: (
      state,
      action: PayloadAction<{
        customerId: string;
        status: CustomerStatus;
      }>,
    ) => {
      const customer = state.find(
        (customer) => customer.id === action.payload.customerId,
      );

      if (customer) {
        customer.status = action.payload.status;
      }
    },

    deleteCustomer: (state, action: PayloadAction<string>) => {
      return state.filter((customer) => customer.id !== action.payload);
    },

    hydrateCustomers: (state, action: PayloadAction<Customer[]>) => {
      return action.payload;
    },
  },
});

export const {
  addCustomer,
  updateCustomerStatus,
  deleteCustomer,
  hydrateCustomers,
} = customerSlice.actions;

export default customerSlice.reducer;
