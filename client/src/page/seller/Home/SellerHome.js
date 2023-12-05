import React, { useEffect, useState } from "react";
import { isApproved } from "../../../api/seller";
import ProductManagement from "../ProductManagement/ProductManagement";
import OrderManagement from "../OrderManagement/OrderManagement";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "../../../components/Header";
import ProductDetailsSeller from "../ProductManagement/ProductDetailsSeller";
import OrderDetailsSeller from "../OrderManagement/OrderDetailsSeller";
import SaleStatistic from "../SaleStatistic/SaleStatistic";
export default function SellerHome() {
  const [approve, setApprove] = useState(false);

  const check = async () => {
    const data = await isApproved();
    if (data === "Approved") {
      setApprove(true);
    }
  };
  useEffect(() => {
    check();
  }, []);
  return (
    <>
      <Header></Header>
      {approve ? (
        <div>
        
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Outlet />
                  <ProductManagement />
                </>
              }
            />
            <Route
              path="/seller/order"
              element={
                <>
                  <Outlet></Outlet>
                  <OrderManagement />
                </>
              }
            />
            <Route
              path="/seller/order/:id"
              element={
                <>
                  <Outlet></Outlet>
                  <OrderDetailsSeller />
                </>
              }
            />
            <Route
              path="/seller/product/:id"
              element={
                <>
                  <Outlet></Outlet>
                  <ProductDetailsSeller />
                </>
              }
            />
            <Route
              path="/seller/salestatistic/"
              element={
                <>
                  <Outlet></Outlet>
                  <SaleStatistic />
                </>
              }
            />
          </Routes>
        </div>
      ) : <h1 className="text-center mt-3">Seller Not Approve</h1>}
    </>
  );
}
