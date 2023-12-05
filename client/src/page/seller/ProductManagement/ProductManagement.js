import React, { useState, useEffect } from "react";
import { getProduct } from "../../../api/seller";
import ProductTable from "./ProductTable";
import AddProduct from "./AddProduct";
import Header from "../../../components/Header";
const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    const data = await getProduct();
    setProducts(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <h2>Product Management</h2>
      <AddProduct setProducts={setProducts} />
      <ProductTable products={products}></ProductTable>
    </div>
  );
};

export default ProductManagement;
