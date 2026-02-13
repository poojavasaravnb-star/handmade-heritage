import { createBrowserRouter } from "react-router-dom";

// Guards
import AuthGuard from "../guard/AuthGuard";
import Adminrouter from "../guard/Adminrouter";

// User Pages
import Home from "../Component/Home";
import About from "../Component/About";
import Contact from "../Component/Contact";
import Cart from "../Component/Cart";
import Shop from "../Component/Shop";
import Loginpage from "../Component/Loginpage";
import NotFound from "../Component/NotFound";
import Checkout from "../Component/Checkout";
import OrderSuccess from "./OrderSuccess";

// Admin Pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Users from "../pages/Admin/Users";
import Products from "../pages/Admin/Products";
import Categories from "../pages/Admin/AdminCategories";
import Orders from "../pages/Admin/Orders";
import AdminContactMessages from "../pages/Admin/AdminContact";
import ProductDetails from "./ProductDetails";

export const router = createBrowserRouter([
  // LOGIN
  {
    path: "/login-page",
    element: <Loginpage />,
  },

  // USER SIDE
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
    ],
  },

  // ORDER SUCCESS
  {
    path: "/order-success",
    element: <OrderSuccess />,
  },

  // ADMIN SIDE
  {
    path: "/admin",
    element: <Adminrouter />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <Users /> },
      { path: "products", element: <Products /> },
      { path: "categories", element: <Categories /> },
      { path: "orders", element: <Orders /> },
      { path: "contacts", element: <AdminContactMessages /> },
    ],
  },

  // 404
  {
    path: "*",
    element: <NotFound />,
  },
]);
