import { headers } from "../service/authService";
import { API_URL } from "../GlobalVar";
export const isApproved = async () => {
  try {
    const response = await fetch(API_URL + `/api/seller/status/`, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to update seller status");
    }
    const data = await response.json();
    console.log("this is status " + data.sellerStatus);
    return data.sellerStatus;
  } catch (error) {
    console.error("Error updating seller status:", error);
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await fetch(API_URL + `/api/seller/createProduct/`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to create Product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating seller status:", error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(API_URL + `/api/seller/delete/` + id, {
      method: "DELETE",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to create Product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating seller status:", error);
  }
};
export const updateProduct = async (newProductData, id) => {

  try {
    const response = await fetch(API_URL + `/api/seller/update/` + id, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(newProductData),
    });

    if (!response.ok) {
      throw new Error("Failed to create Product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating seller status:", error);
  }
};
export const getProduct = async () => {
  try {
    const response = await fetch(API_URL + `/api/seller/products/`, {
      method: "GET",
      headers: headers(),
    });
    if (!response.ok) {
      throw new Error("Failed to get Product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting seller product:", error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(API_URL + `/api/seller/products/` + id, {
      method: "GET",
      headers: headers(),
    });
    if (!response.ok) {
      throw new Error("Failed to get Product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting seller product:", error);
  }
};

export const getOrder = async () => {
  try {
    const response = await fetch(API_URL + `/api/seller/orders/`, {
      method: "GET",
      headers: headers(),
    });
    if (!response.ok) {
      throw new Error("Failed to get Orders");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting seller orders:", error);
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await fetch(API_URL + `/api/seller/order/` + id, {
      method: "GET",
      headers: headers(),
    });
    if (!response.ok) {
      throw new Error("Failed to get Order");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting seller orders:", error);
  }
};

export const getCustomer = async (customerId) => {
  console.log(customerId);

  try {
    const response = await fetch(
      API_URL + `/api/seller/customer/` + customerId,
      {
        method: "GET",
        headers: headers(),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get Customer");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting seller orders:", error);
  }
};
export const updateOrder = async (newData, id) => {

  try {
    const response = await fetch(API_URL + `/api/seller/order/updateStatus/` + id, {
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

export const getProdutStatistic = async () => {
  try {
    const response = await fetch(API_URL + `/api/seller/statistics`, {
      method: "GET",
      headers: headers(),
    });
    if (!response.ok) {
      throw new Error("Failed to get Statistics");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting Statistics", error);
  }
};
