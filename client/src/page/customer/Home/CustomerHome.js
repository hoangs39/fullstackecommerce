import React, { useEffect, useState } from "react";
import { getProduct } from "../../../api/product";

import ProductList from "./ProductList";
import Cart from "./Cart";
import Header from "../Header";
import { getCart, placeOrder, updateCart } from "../../../api/customer";
import { getRole, isLoggedIn } from "../../../service/authService";
import LoaderSpinner from "../../../components/LoaderSpinner";
import {
  getCategories,
  // organizeCategoriesIntoTree,
} from "../../../api/category";
import OrderDashBoard from "../OrderManagement/OrderDashBoard";
import { Routes, Route, Outlet } from "react-router-dom";
import Productdetail from "../ProductDetail/ProductDetails";
import OrderDetails from "../OrderManagement/OrderDetailsCustomer";
import Auth from "../Auth/Auth";

export default function CustomerHome() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [added, setAdded] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [order, setOrder] = useState(1);
  const [decision, setDecision] = useState("");

  const addToCart = async (product) => {
    const existingItemIndex = cartItems?.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      if (getRole() === "customer") await updateCart(updatedCart);
      setCartItems(updatedCart);
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      if (getRole() === "customer") await updateCart(updatedCart);
      setCartItems(updatedCart);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    if (getRole() === "customer") await updateCart(updatedCart);
    setCartItems(updatedCart);
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    if (getRole() === "customer") await updateCart(updatedCart);
    setCartItems(updatedCart);
  };

  const placeOrderF = async (cart) => {
    if (getRole() !== "customer") {
      return;
    }
    const res = await placeOrder(cart);
    if (res) {
      localStorage.removeItem("cart");
      await updateCart([]);
      setCartItems([]);
    }
  };

  const fetchProduct = async () => {
    const data = await getProduct();
    const localCart = JSON.parse(localStorage.getItem("cart"));
    if (localCart) {
      if (isLoggedIn()) await updateCart(localCart);
      setCartItems(localCart);
    } else {
      if (isLoggedIn()) {
        const cart = await getCart();
        setCartItems(cart);
      }
    }
    if (data) {
      setProducts(data);
      setFilterProducts(data);
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    const allCategories = await getCategories();
    if (allCategories) {
      // const organizedCategories = organizeCategoriesIntoTree(allCategories);
      setCategories(allCategories);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    loadCategories();
    fetchFilteredProducts();
  }, []);

  useEffect(() => {
    fetchFilteredProducts();
  }, [searchName, order, decision, selectedCategories]);

  const handleSearchName = (name) => {
    setSearchName(name);
  };

  const handleFilter = (order, decision) => {
    setOrder(order);
    setDecision(decision);
  };

  const fetchFilteredProducts = async () => {
    // Make a copy of the original products array to avoid mutating the state directly
    let filteredProducts = [...products];

    if (selectedCategories.length > 0) {
      console.log(selectedCategories);
      filteredProducts = filteredProducts.filter((p) =>
        selectedCategories.includes(p.category.toString())
      );
    }
    // Filter by searchName
    if (searchName) {
      const searchNameLower = searchName.toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchNameLower)
      );
    }
    if (decision) {
      if (decision === "name") {
        filteredProducts.sort((a, b) => {
          if (order === 1) {
            return a[decision].localeCompare(b[decision]);
          } else if (order === -1) {
            return b[decision].localeCompare(a[decision]);
          }
        });
      } else if (decision === "price") {
        filteredProducts.sort((a, b) => {
          if (order === 1) {
            return a[decision] - b[decision];
          } else if (order === -1) {
            return b[decision] - a[decision];
          }
        });
      } else if (decision === "date") {
        filteredProducts.sort((a, b) => {
          if (order === 1) {
            return new Date(a[decision]) - new Date(b[decision]);
          } else if (order === -1) {
            return new Date(b[decision]) - new Date(a[decision]);
          }
        });
      }
    }

    // Update the filterProducts state with the filtered products
    setFilterProducts(filteredProducts);
  };

  const removeFilter = () => {
    setFilterProducts([]);
    setSelectedCategories([]);
    setOrder(1);
    setSearchName("");
    setDecision("");
  };

  if (loading) {
    return <LoaderSpinner />;
  }

  return (
    <div>
      <Header handleSearchName={handleSearchName} setShowCart={setShowCart} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Outlet />
              <ProductList
                removeFilter={removeFilter}
                order={order}
                decision={decision}
                products={filterProducts}
                addToCart={addToCart}
                categories={categories}
                handleFilter={handleFilter}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </>
          }
        />
        <Route
          path="/auth/"
          element={
            <>
              <Outlet></Outlet>
              <Auth />
            </>
          }
        />
        <Route
          path="/cus/order"
          element={
            <>
              <Outlet></Outlet>
              <OrderDashBoard cartItems={cartItems} />
            </>
          }
        />
        <Route
          path="/cus/order/:id"
          element={
            <>
              <Outlet></Outlet>
              <OrderDetails />
            </>
          }
        />
        <Route
          path="/productDetails/:id"
          element={
            <>
              <Outlet></Outlet>
              <Productdetail />
            </>
          }
        />
      </Routes>
      <Cart
        cartItems={cartItems}
        showCart={showCart}
        setShowCart={setShowCart}
        updateCartItem={updateCartItem}
        removeFromCart={removeFromCart}
        placeOrderF={placeOrderF}
        added={added}
      />
    </div>
  );
}
