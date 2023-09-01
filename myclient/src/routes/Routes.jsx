import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import PrivateRoutes from "./PrivateRoutes";
import MyCart from "../pages/My Cart/MyCart";
import Dashboard from "../pages/Dashboard/Dashboard";

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
        path: "/mycart",
        element: (
          <PrivateRoutes>
            <MyCart />,
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard />,
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
