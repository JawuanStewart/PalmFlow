# PalmFlow

> Your business, right in the palm of your hand.

> PalmFlow is a responsive e-commerce management dashboard built with Next.js, TypeScript, Redux Toolkit, Tailwind CSS, and Recharts. It provides centralized product, order, customer, inventory, and revenue management with persistent client-side state and interactive analytics.


## Features

### Dashboard
- Revenue overview
- Total orders
- Customer statistics
- Product inventory statistics
- Sales overview chart
- Recent orders
- Low-stock tracking
- Out-of-stock tracking
- Average order value

### Products
- View products
- Search products
- Filter by inventory status
- Add products
- Edit products
- Delete products
- Track inventory levels

### Orders
- View customer orders
- Search orders
- Filter by order status
- Update order status
- Delete orders
- Track order revenue

### Customers
- View customers
- Search customers
- Filter active/inactive customers
- Add customers
- Activate or deactivate customers
- Delete customers
- Track customer spending and order history

### Analytics
- Revenue analytics
- Order analytics
- Average order value
- Customer metrics
- Returning customer tracking
- Monthly revenue visualization
- Monthly order visualization

### Settings
- Store information
- Notification preferences
- Account settings
- Settings management interface

### Data Persistence
PalmFlow uses Redux for application state management and localStorage to persist product, order, and customer changes between browser sessions.

## Tech Stack

- Next.js
- React
- TypeScript
- Redux Toolkit
- React Redux
- Tailwind CSS
- Recharts
- Lucide React

## Project Structure

src/
├── app/
│   ├── analytics/
│   ├── customers/
│   ├── orders/
│   ├── products/
│   ├── settings/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── Components/
│   ├── AddCustomerModal/
│   ├── AddProductModal/
│   ├── CustomersTable/
│   ├── OrdersChart/
│   ├── OrdersTable/
│   ├── ProductsTable/
│   ├── RecentOrders/
│   ├── ReduxProvider/
│   ├── RevenueChart/
│   ├── SalesChart/
│   ├── Sidebar/
│   └── StatCard/
│
└── store/
    ├── customerSlice.ts
    ├── orderSlice.ts
    ├── productSlice.ts
    └── store.ts


## What I Learned

Building PalmFlow provided hands-on experience with:

* Building a multi-page application with Next.js
* Creating reusable React components
* Managing application state with Redux Toolkit
* Connecting multiple pages to shared application state
* Building interactive data visualizations with Recharts
* Creating responsive layouts with Tailwind CSS
* Building CRUD-style functionality
* Managing client-side data persistence
* Creating reusable modals and tables
* Designing responsive dashboard interfaces
* Organizing a scalable frontend project structure

## Future Improvements

Potential future versions of PalmFlow could include:

* User authentication
* Backend API integration
* PostgreSQL database
* Real-time order updates
* Payment processing
* Product image management
* Advanced analytics
* Role-based permissions
* Cloud data persistence
