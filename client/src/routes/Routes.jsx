import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import PrivateRoutes from "./PrivateRoutes";
import MyCart from "../pages/My Cart/MyCart";
import Dashboard from "../layouts/Dashboard";
import AdminPanel from "../pages/Dashboard/Admin/AdminPanel/AdminPanel";
import AddProduct from "../pages/Dashboard/Admin/AddProduct/AddProduct";
import UpdateProduct from "../pages/Dashboard/Admin/UpdateProduct/UpdateProduct";
import ManageProducts from "../pages/Dashboard/Admin/ManageProducts/ManageProducts";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },

      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/mycart",
        element: (
          <PrivateRoutes>
            <MyCart />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "",
        element: <AdminPanel />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "manage-products",
        element: <ManageProducts />,
      },
      {
        path: "manage-products/update/product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
    ],
  },
]);

export default router;
