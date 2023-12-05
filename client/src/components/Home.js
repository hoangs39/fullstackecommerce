import React from "react";
import PublicHome from "../page/customer/Home/CustomerHome";
import SellerHome from "../page/seller/Home/SellerHome";
import { getRole, isLoggedIn } from "../service/authService";
import AdminHome from "../page/admin/Home/AdminHome";
export default function () {
  return (
    <div>
      {!isLoggedIn() && <PublicHome />}
      {isLoggedIn() && getRole() === "customer" && <PublicHome />}

      {isLoggedIn() && getRole() === "seller" && <SellerHome />}

      {isLoggedIn() && getRole() === "admin" && <AdminHome />}
    </div>
  );
}
