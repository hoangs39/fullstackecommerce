import { API_URL } from "../GlobalVar";
import { headers } from "../service/authService";
const getSellers = async () => {
  try {
    const response = await fetch(API_URL + "/api/admin/sellers", {
      method: "GET",
      headers,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

const changeStatus = async (sellerId, newStatus) => {
  try {
    const response = await fetch(
      API_URL + `/api/admin/changestatus/${sellerId}`,
      {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({ newStatus }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update seller status");
    }

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error("Error updating seller status:", error);
  }
};



const createCategory = async (parentId, categoryName) => {
  try {
    const response = await fetch(API_URL + "/api/admin/category/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: categoryName,
        parent: parentId,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};
const addCategoryAttribute = async (
  categoryId,
  attributeName,
  required,
  type
) => {
  try {
    // console.log(API_URL + `/api/admin/attribute/${categoryId}`);
    // console.log(JSON.stringify({ name: attributeName, required, type }))
    const response = await fetch(
      API_URL + `/api/admin/attribute/${categoryId}`,
      {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ name: attributeName, required, type }),
      }
    );
      console.log("ok")
    if (!response.ok) {
      throw new Error("Failed to add attribute");
    }

    const data = await response.json();
  } catch (error) {
    console.error("Error add attribute:", error);
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(
      API_URL + `/api/admin/category/${categoryId}`,
      {
        method: "DELETE",
        headers: headers(),
        // body: JSON.stringify({ name: attributeName, required, type }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete");
    }

    const data = await response.json();
  } catch (error) {
    console.error("Error delete:", error);
  }
};
export {
  getSellers,
  changeStatus,
  createCategory,
  addCategoryAttribute,
  deleteCategory,
};
