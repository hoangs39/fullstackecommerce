import { API_URL } from "../GlobalVar";
import { headers } from "../service/authService";

export const getCart = async () => {
  try {
    const response = await fetch(API_URL + "/api/customer/cart", {
      method: "GET",
      headers: headers(),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateCart = async (cart) => {
  try {
    const response = await fetch(API_URL + "/api/customer/cart", {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(cart),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const placeOrder = async (cart) => {
  try {
    const response = await fetch(API_URL + "/api/customer/placeOrder", {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(cart),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getOrder = async () => {
  try {
    const response = await fetch(API_URL + "/api/customer/order", {
      method: "GET",
      headers: headers(),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await fetch(API_URL + "/api/customer/order/" +id, {
      method: "GET",
      headers: headers(),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateOrder = async (newData, id) => {

  try {
    const response = await fetch(API_URL + `/api/customer/order/updateStatus/` + id, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error("Failed to Update");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating status:", error);
  }
};
