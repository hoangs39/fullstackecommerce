import React from "react";
import Header from "../../../components/Header";
import CategoryMana from "../CategoryManagement/CategoryMana";
import SellerApproval from "../SellerApproval/SellerApproval";
import { Routes,Route,Outlet } from "react-router";

export default function AdminHome() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Outlet />
              <CategoryMana/>
            </>
          }
        />
        <Route
          path="/admin/sellerapproval"
          element={
            <>
              <Outlet></Outlet>
              <SellerApproval />
            </>
          }
        />
      </Routes>
    </div>
  );
}
