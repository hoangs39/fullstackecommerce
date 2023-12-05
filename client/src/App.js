// import "./App.css";
import NotFound from "./page/NotFound";
import Home from "./components/Home";
import Auth from "./page/customer/Auth/Auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SellerApproval from "./page/admin/SellerApproval/SellerApproval";
import { checkTokenExpiration } from "./service/authService";

import Productdetail from "./page/customer/ProductDetail/ProductDetails";
import ProductDetailsSeller from "./page/seller/ProductManagement/ProductDetailsSeller";
import OrderManagement from "./page/seller/OrderManagement/OrderManagement";
import OrderDashBoard from "./page/customer/OrderManagement/OrderDashBoard";
import OrderDetailsCustomer from "./page/customer/OrderManagement/OrderDetailsCustomer";
import OrderDetailsSeller from "./page/seller/OrderManagement/OrderDetailsSeller";
import SaleStatistic from "./page/seller/SaleStatistic/SaleStatistic";
function App() {
  checkTokenExpiration();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/cus/order",
          element: <OrderDashBoard />,
        },
        {
          path: "/productDetails/:id",
          element: <Productdetail />,
        },
        {
          path: "/cus/order/:id",
          element: <OrderDetailsCustomer />,
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/admin/sellerapproval",
          element: <SellerApproval />,
        },
        {
          path: "/seller/product/:id",
          element: <ProductDetailsSeller />,
        },
        {
          path: "/seller/order",
          element: <OrderManagement />,
        },
        {
          path: "/seller/order/:id",
          element: <OrderDetailsSeller />,
        },
        {
          path: "/seller/salestatistic",
          element: <SaleStatistic />,
        },
      ],
      errorElement: <NotFound />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
