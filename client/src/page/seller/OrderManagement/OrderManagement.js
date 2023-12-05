import React, { useState, useEffect } from "react";
import { getOrder } from "../../../api/seller";
import OrderTable from "./OrderTable";
import LoaderSpinner from "../../../components/LoaderSpinner";

const ProductManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading,setLoading] = useState(true);

  const fetchOrder = async () => {
    const data = await getOrder();
    if(data){
      setOrders(data);
      setLoading(false);
    }
    
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  if(loading){
    return <LoaderSpinner />
  }

  
  return <OrderTable orders={orders} />;
};

export default ProductManagement;
